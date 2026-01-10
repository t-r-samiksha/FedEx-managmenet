import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    import os
    return psycopg2.connect(
        dsn=os.getenv("DATABASE_URL"),
        cursor_factory=RealDictCursor
    )
