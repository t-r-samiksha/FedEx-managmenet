from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
DATABASE_URL = "postgresql+psycopg2://postgres:Almighty%2392@localhost:5432/fedex_dca"


engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
