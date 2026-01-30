from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json or {}
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({"msg": "Email and password required"}), 400
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
        return jsonify({"access_token": "test_token"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"msg": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    print("Starting app...")
    app.run(host='0.0.0.0', port=5000, debug=False)
