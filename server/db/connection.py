import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        database="fedex_dca",
        user="postgres",
        port=5433,
        password="1234",
        cursor_factory=RealDictCursor
    )
