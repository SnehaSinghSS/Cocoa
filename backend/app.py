from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app = Flask(__name__)

# In-memory user storage (use a database in production)
users = {}

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if email in users:
        return jsonify({"message": "User already exists"}), 400

    # Store hashed password
    hashed_password = generate_password_hash(password)
    users[email] = hashed_password
    return jsonify({"message": "User created successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if email not in users or not check_password_hash(users[email], password):
        return jsonify({"message": "Invalid credentials"}), 401

    # Dummy token (use JWT in production)
    token = "mock-token"
    return jsonify({"token": token}), 200

if __name__ == '__main__':
    app.run(debug=True)
