import psycopg2

DB_CONFIG = {
    "host": "localhost",
    "port": 5432,
    "dbname": "fedex_dca",
    "user": "postgres",
    "password": "Almighty#92"
}

def run_sql_file(filename):
    conn = psycopg2.connect(**DB_CONFIG)
    conn.autocommit = True
    cursor = conn.cursor()

    with open(filename, "r", encoding="utf-8") as f:
        sql = f.read()

    try:
        cursor.execute(sql)
        print("✅ Database initialized successfully")
    except Exception as e:
        print("❌ Error:", e)
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    run_sql_file("db_init.sql")
