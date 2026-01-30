from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["movie_auth_db"]
users_collection = db["users"]

# Save User
def create_user(email, password):
    hashed_password = generate_password_hash(password)
    user = {
        "email": email,
        "password": hashed_password
    }
    users_collection.insert_one(user)

# Validate User Login
def validate_user(email, password):
    user = users_collection.find_one({"email": email})
    if user and check_password_hash(user["password"], password):
        return True
    return False