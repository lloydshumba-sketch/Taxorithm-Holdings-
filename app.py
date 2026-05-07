import os
import smtplib
from email.message import EmailMessage
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MAIL_TO = os.environ.get("MAIL_TO", "info@taxorithm.us")
MAIL_FROM = os.environ.get("MAIL_FROM")
SMTP_HOST = os.environ.get("SMTP_HOST")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")


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

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    phone = data.get("phone", "").strip()
    service = data.get("service", "General enquiry").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({
            "success": False,
            "message": "Name, email and message are required."
        }), 400

    if not SMTP_HOST or not SMTP_USER or not SMTP_PASSWORD or not MAIL_FROM:
        return jsonify({
            "success": False,
            "message": "Email service is not configured on the server."
        }), 500

    email_subject = f"New Taxorithm Holdings enquiry - {service}"

    email_body = f"""
New enquiry received from the Taxorithm Holdings website.

Name: {name}
Email: {email}
Phone: {phone}
Service: {service}

Message:
{message}
"""

    msg = EmailMessage()
    msg["Subject"] = email_subject
    msg["From"] = MAIL_FROM
    msg["To"] = MAIL_TO
    msg["Reply-To"] = email
    msg.set_content(email_body)

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)

        return jsonify({
            "success": True,
            "message": "Enquiry sent successfully."
        })

    except Exception as error:
        print("Email sending error:", error)

        return jsonify({
            "success": False,
            "message": "The enquiry was received, but the email could not be sent."
        }), 500
