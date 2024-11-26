from pydantic import BaseModel, constr
from datetime import datetime
from typing import Optional

class DocumentBase(BaseModel):
    name: constr(min_length=1, max_length=255)
    content: str

class DocumentCreate(DocumentBase):
    pass

class DocumentResponse(DocumentBase):
    id: int
    created_at: datetime
    size: int

    class Config:
        from_attributes = True

class DocumentUpdate(BaseModel):
    name: Optional[str] = None  # Make name optional for partial updates
    content: Optional[str] = None  # Make content optional for partial updates

    class Config:
        orm_mode = True
