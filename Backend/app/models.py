from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from .database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)  # Document name
    content = Column(Text, nullable=True)       # Optional document content
    created_at = Column(DateTime, server_default=func.now(), nullable=False)  # Auto-generated timestamp
    size = Column(Integer, default=0, nullable=False)  # Default size as 0
