from flask import Flask, request, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor
import time
import sys
import base64

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="mysecretpassword",
    host="postgres_container",
    port="5432"
)

cur = conn.cursor(cursor_factory=RealDictCursor)

# Flask app
app = Flask(__name__)

# Define route to handle POST requests
@app.route('/get_pdf', methods=['GET','POST'])
def query_pdf_files():
    try:
        # Query the database
        cur.execute("SELECT * FROM pdf_files")
        pdf_files = cur.fetchall()
        for row in pdf_files:
            row['pdf'] = base64.b64encode(bytes(row['pdf'])).decode('utf-8')
        return jsonify(pdf_files), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def hello():
    return "<p>Hello World! I have been feeling depressed </p>" 

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="5000")
