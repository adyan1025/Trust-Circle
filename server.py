from flask import Flask, jsonify
import psycopg2

app = Flask(__name__)

# Update these with your own values
DB_CONFIG = {
    "host": "10.171.2.112",
    "database": "groups",
    "user": "", # gotta populate
    "password": "" # gotta populate
}

@app.route('/add-test-group', methods=['GET', 'POST'])
def add_test_group():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO groups (
                group_name, group_members, monthly_deposit_amount, grace_period, min_credit_score, monthly_deposit_date, group_goal
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s
            )
        """, (
            "Python Flask Testers",
            ['flask@example.com', 'test@example.com'],
            75.00,
            7,
            620,
            '2025-08-15',
            1500.00
        ))

        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"status": "success", "message": "Test group added!"}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/get-groups', methods=['GET'])
def get_groups():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()

        cur.execute("""
            SELECT group_id, group_name, group_members, group_balance,
                   monthly_deposit_amount, grace_period, min_credit_score,
                   monthly_deposit_date, group_goal
            FROM groups
        """)
        rows = cur.fetchall()

        groups = []
        for row in rows:
            groups.append({
                "group_id": row[0],
                "group_name": row[1],
                "group_members": row[2],
                "group_balance": float(row[3]),
                "monthly_deposit_amount": float(row[4]),
                "grace_period": row[5],
                "min_credit_score": row[6],
                "monthly_deposit_date": row[7].isoformat() if row[7] else None,
                "group_goal": float(row[8]) if row[8] is not None else None
            })

        cur.close()
        conn.close()
        return jsonify(groups), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
