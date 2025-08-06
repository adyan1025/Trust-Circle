from flask import Flask, jsonify
import psycopg
import os

app = Flask(__name__)

# Centralized DB config
DB_CONFIG = {
    "host": "2.tcp.ngrok.io",
    "port": 10813,
    "dbname": "groups",
    "user": "lucas",
    "password": "iamlucas"
}

# DB connection
def get_db_connection():
    try:
        conn = psycopg.connect(**DB_CONFIG)
        return conn
    except psycopg.OperationalError as e:
        print(f"Error connecting to the database: {e}")
        return None

# Route
@app.route('/')
def data():
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Could not connect to database"}), 500

    cursor = conn.cursor()
    cursor.execute('SELECT * FROM groups;')
    data = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(data)

# Main
if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5000)))
