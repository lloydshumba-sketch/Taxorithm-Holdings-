from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "status": "online",
        "message": "Taxorithm Holdings backend is running successfully."
    })

@app.route("/api/health")
def health():
    return jsonify({
        "status": "healthy"
    })

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json() or {}

    name = data.get("name", "")
    email = data.get("email", "")
    message = data.get("message", "")

    return jsonify({
        "success": True,
        "message": "Enquiry received successfully.",
        "data": {
            "name": name,
            "email": email,
            "message": message
        }
    })
