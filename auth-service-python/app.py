from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import json
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
JWT_SECRET = "your-secret-key-change-in-production"

# In-memory user store (for testing without MongoDB)
users_db = {}

@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json or {}
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({"msg": "Email and password required"}), 400
        
        if email in users_db:
            return jsonify({"msg": "User already exists"}), 400
        
        # Hash password and store user
        hashed_password = generate_password_hash(password)
        users_db[email] = hashed_password
        print(f"User registered: {email}")
        
        return jsonify({"msg": "User Registered Successfully"}), 201
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"msg": f"Error: {str(e)}"}), 500

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json or {}
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({"msg": "Email and password required"}), 400
        
        # Check if user exists and password is correct
        if email not in users_db:
            print(f"Login failed: User {email} not found")
            return jsonify({"msg": "Invalid email or password"}), 401
        
        if not check_password_hash(users_db[email], password):
            print(f"Login failed: Wrong password for {email}")
            return jsonify({"msg": "Invalid email or password"}), 401
        
        # Generate JWT token with email claim
        payload = {
            "sub": email,
            "email": email,
            "identity": email
        }
        token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
        print(f"Login successful for {email}")
        return jsonify({"access_token": token}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"msg": f"Error: {str(e)}"}), 500

@app.route("/forgot", methods=["POST"])
def forgot():
    try:
        data = request.json or {}
        email = data.get('email')
        if not email:
            return jsonify({"msg": "Email is required"}), 400
        
        if email not in users_db:
            # For security, don't reveal if email exists
            return jsonify({"msg": "If the email exists, a reset link was sent"}), 200
        
        # Generate reset token (in production, this should be temporary and secure)
        reset_token = jwt.encode({"email": email, "type": "reset"}, JWT_SECRET, algorithm="HS256")
        reset_link = f"http://localhost:3000/reset?token={reset_token}"
        
        print(f"Password reset requested for {email}")
        return jsonify({"msg": "If the email exists, a reset link was sent", "reset_link": reset_link}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"msg": f"Error: {str(e)}"}), 500

@app.route("/reset", methods=["POST"])
def reset():
    try:
        data = request.json or {}
        token = data.get('token')
        password = data.get('password')
        if not token or not password:
            return jsonify({"msg": "Token and password required"}), 400
        
        try:
            # Verify and decode the reset token
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            if payload.get("type") != "reset":
                return jsonify({"msg": "Invalid reset token"}), 401
            email = payload.get("email")
        except jwt.InvalidTokenError:
            return jsonify({"msg": "Invalid or expired token"}), 401
        
        if email not in users_db:
            return jsonify({"msg": "User not found"}), 404
        
        # Hash password and update
        hashed_password = generate_password_hash(password)
        users_db[email] = hashed_password
        print(f"Password reset for {email}")
        return jsonify({"msg": "Password reset successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"msg": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    print("Starting app...")
    app.run(host='0.0.0.0', port=5000, debug=False)
