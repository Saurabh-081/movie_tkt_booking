from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import os
from datetime import datetime, timedelta
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Use environment variable for secret
JWT_SECRET = os.getenv('JWT_SECRET', 'dev-secret-key-change-in-production')
JWT_EXPIRY = 24  # hours

# In-memory user store (for testing without MongoDB)
users_db = {}

@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json or {}
        email = data.get('email', '').strip().lower()
        password = data.get('password', '').strip()
        
        # Validate inputs
        if not email or not password:
            return jsonify({"msg": "Email and password required"}), 400
        
        if len(password) < 6:
            return jsonify({"msg": "Password must be at least 6 characters"}), 400
        
        if '@' not in email:
            return jsonify({"msg": "Invalid email format"}), 400
        
        if email in users_db:
            logger.warning(f"Registration attempt with existing email: {email}")
            return jsonify({"msg": "User already exists"}), 400
        
        # Hash password and store user
        hashed_password = generate_password_hash(password)
        users_db[email] = hashed_password
        logger.info(f"User registered successfully: {email}")
        
        return jsonify({"msg": "User registered successfully"}), 201
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({"msg": "Registration failed. Please try again."}), 500

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json or {}
        email = data.get('email', '').strip().lower()
        password = data.get('password', '').strip()
        
        if not email or not password:
            return jsonify({"msg": "Email and password required"}), 400
        
        # Check if user exists and password is correct
        if email not in users_db:
            logger.warning(f"Login failed: User not found - {email}")
            return jsonify({"msg": "Invalid email or password"}), 401
        
        if not check_password_hash(users_db[email], password):
            logger.warning(f"Login failed: Wrong password for - {email}")
            return jsonify({"msg": "Invalid email or password"}), 401
        
        # Generate JWT token with expiry
        expiry_time = datetime.utcnow() + timedelta(hours=JWT_EXPIRY)
        payload = {
            "sub": email,
            "email": email,
            "identity": email,
            "exp": expiry_time
        }
        token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
        logger.info(f"Login successful: {email}")
        return jsonify({"access_token": token}), 200
    except jwt.InvalidTokenError as e:
        logger.error(f"JWT error during login: {str(e)}")
        return jsonify({"msg": "Token generation failed"}), 500
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({"msg": "Login failed. Please try again."}), 500

@app.route("/forgot", methods=["POST"])
def forgot():
    try:
        data = request.json or {}
        email = data.get('email', '').strip().lower()
        
        if not email or '@' not in email:
            return jsonify({"msg": "Valid email is required"}), 400
        
        # For security, don't reveal if email exists
        if email not in users_db:
            logger.warning(f"Password reset requested for non-existent email: {email}")
            return jsonify({"msg": "If the email exists, a reset link was sent"}), 200
        
        # Generate reset token with expiry (1 hour)
        expiry_time = datetime.utcnow() + timedelta(hours=1)
        reset_token = jwt.encode({"email": email, "type": "reset", "exp": expiry_time}, JWT_SECRET, algorithm="HS256")
        reset_link = f"http://localhost:3000/reset?token={reset_token}"
        
        logger.info(f"Password reset requested for: {email}")
        return jsonify({"msg": "If the email exists, a reset link was sent", "reset_link": reset_link}), 200
    except Exception as e:
        logger.error(f"Forgot password error: {str(e)}")
        return jsonify({"msg": "Request failed. Please try again."}), 500

@app.route("/reset", methods=["POST"])
def reset():
    try:
        data = request.json or {}
        token = data.get('token', '').strip()
        password = data.get('password', '').strip()
        
        if not token or not password:
            return jsonify({"msg": "Token and password required"}), 400
        
        if len(password) < 6:
            return jsonify({"msg": "Password must be at least 6 characters"}), 400
        
        try:
            # Verify and decode the reset token
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            if payload.get("type") != "reset":
                return jsonify({"msg": "Invalid reset token"}), 401
            email = payload.get("email")
        except jwt.ExpiredSignatureError:
            logger.warning(f"Password reset with expired token")
            return jsonify({"msg": "Reset link has expired. Request a new one."}), 401
        except jwt.InvalidTokenError:
            logger.warning(f"Password reset with invalid token")
            return jsonify({"msg": "Invalid or expired token"}), 401
        
        if email not in users_db:
            logger.error(f"Password reset attempted for non-existent user: {email}")
            return jsonify({"msg": "User not found"}), 404
        
        # Hash password and update
        hashed_password = generate_password_hash(password)
        users_db[email] = hashed_password
        logger.info(f"Password reset successfully for: {email}")
        return jsonify({"msg": "Password reset successfully"}), 200
    except Exception as e:
        logger.error(f"Password reset error: {str(e)}")
        return jsonify({"msg": "Reset failed. Please try again."}), 500

if __name__ == "__main__":
    print("Starting app...")
    app.run(host='0.0.0.0', port=5000, debug=False)
