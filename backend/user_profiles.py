from hdbcli import dbapi

# Connect to SAP HANA Cloud
cc = dbapi.connect(
    address="f2276c2f-a411-47a5-a9aa-1a60ff2469de.hana.trial-us10.hanacloud.ondemand.com",
    port=443,
    user="DBADMIN",
    password="Password12345"
)

# Create a new user in the table
def create_user(first, last, email, phone, balance, start_date, ssn, password):
    cur = cc.cursor()
    cur.execute("""
        INSERT INTO USER_PROFILES (
            first_name, last_name, email, phone_number, wallet_balance,
            start_date, ssn, password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (first, last, email, phone, balance, start_date, ssn, password))
    cc.commit()
    cur.close()

# Get all users
def get_all_users():
    cur = cc.cursor()
    cur.execute('SELECT * FROM USER_PROFILES')
    rows = cur.fetchall()
    cur.close()
    return rows

# Get user by email
def get_user_by_email(email):
    cur = cc.cursor()
    cur.execute('SELECT * FROM "user_profiles" WHERE email = ?', (email,))
    user = cur.fetchone()
    cur.close()
    return user

# Update wallet balance
def update_wallet(email, new_balance):
    cur = cc.cursor()
    cur.execute("""
        UPDATE "user_profiles" SET wallet_balance = ? WHERE email = ?
    """, (new_balance, email))
    cc.commit()
    cur.close()

# Delete user by email
def delete_user(email):
    cur = cc.cursor()
    cur.execute('DELETE FROM "user_profiles" WHERE email = ?', (email,))
    cc.commit()
    cur.close()

# Test block
if __name__ == "__main__":
    # delete_user("mustafa.bookwala@sap.com")
    # create_user("Mustafa", "Bookwala", "mustafa.bookwala@sap.com", "215-921-1575", 0, "2025-08-06", "1234567890", "iammustafa")
    # create_user("Adyan", "Chowdhury", "adyan.chowdhury@sap.com", "267-921-1972", 0, "2025-08-06", "0987654321", "iamadyan")
    # create_user("Lucas", "Loepke", "lucas.loepke@sap.com", "445-881-1332", 0, "2025-08-06", "1111111111", "iamlucas")
    # create_user("Nyle", "Coleman", "nyle.coleman@sap.com", "994-327-2033", 0, "2025-08-06", "9999999999", "iamnyle")
    
    users = get_all_users()
    for user in users:
        print(user)
