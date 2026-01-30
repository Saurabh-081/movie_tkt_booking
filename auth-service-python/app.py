from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import os
from datetime import datetime, timedelta
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure SQLite Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Use environment variable for secret
JWT_SECRET = os.getenv('JWT_SECRET', 'dev-secret-key-change-in-production')
JWT_EXPIRY = 24  # hours

# ============ DATABASE MODEL ============
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

# Create database tables
with app.app_context():
    try:
        db.create_all()
        logger.info("Database tables created/verified successfully")
    except Exception as e:
        logger.error(f"Error creating database tables: {str(e)}")

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
        
        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            logger.warning(f"Registration attempt with existing email: {email}")
            return jsonify({"msg": "User already exists"}), 400
        
        # Hash password and create new user
        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password_hash=hashed_password)
        
        try:
            db.session.add(new_user)
            db.session.commit()
            logger.info(f"User registered successfully: {email}")
            return jsonify({"msg": "User registered successfully", "user": new_user.to_dict()}), 201
        except Exception as e:
            db.session.rollback()
            logger.error(f"Database error during registration: {str(e)}")
            return jsonify({"msg": "Registration failed. Please try again."}), 500
            
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
        
        # Fetch user from database
        user = User.query.filter_by(email=email).first()
        
        if not user:
            logger.warning(f"Login failed: User not found - {email}")
            return jsonify({"msg": "Invalid email or password"}), 401
        
        if not check_password_hash(user.password_hash, password):
            logger.warning(f"Login failed: Wrong password for - {email}")
            return jsonify({"msg": "Invalid email or password"}), 401
        
        # Generate JWT token with expiry
        expiry_time = datetime.utcnow() + timedelta(hours=JWT_EXPIRY)
        payload = {
            "sub": email,
            "email": email,
            "identity": email,
            "user_id": user.id,
            "exp": expiry_time
        }
        token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
        logger.info(f"Login successful: {email}")
        return jsonify({"access_token": token, "user": user.to_dict()}), 200
        
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
        
        # Check if user exists (but don't reveal it for security)
        user = User.query.filter_by(email=email).first()
        
        if not user:
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
        
        # Fetch user from database
        user = User.query.filter_by(email=email).first()
        
        if not user:
            logger.error(f"Password reset attempted for non-existent user: {email}")
            return jsonify({"msg": "User not found"}), 404
        
        try:
            # Hash password and update in database
            hashed_password = generate_password_hash(password)
            user.password_hash = hashed_password
            user.updated_at = datetime.utcnow()
            db.session.commit()
            logger.info(f"Password reset successfully for: {email}")
            return jsonify({"msg": "Password reset successfully"}), 200
        except Exception as e:
            db.session.rollback()
            logger.error(f"Database error during password reset: {str(e)}")
            return jsonify({"msg": "Reset failed. Please try again."}), 500
            
    except Exception as e:
        logger.error(f"Password reset error: {str(e)}")
        return jsonify({"msg": "Reset failed. Please try again."}), 500

if __name__ == '__main__':
    # Create database tables and start the app
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
