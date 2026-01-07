import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        port=5432,
        dbname="fedex_dca",
        user="postgres",
        password="Almighty#92",
        cursor_factory=RealDictCursor
    )
