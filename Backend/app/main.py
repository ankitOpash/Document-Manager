from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from loguru import logger
import os

from .database import get_db
from .models import Document
from .schemas import DocumentCreate, DocumentResponse ,DocumentUpdate
# from .config import settings

# Configure logging
logger.add("logs/api.log", rotation="500 MB")

app = FastAPI(title="Document Management System API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="https?://.*",  # Match any HTTP or HTTPS origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/api/documents", response_model=List[DocumentResponse])
async def list_documents(
    search: Optional[str] = Query(None),
    sort_by: Optional[str] = Query(None, enum=["name", "created_at"]),
    db: Session = Depends(get_db)
):
    """
    List all documents with optional search and sorting.
    """
    try:
        query = db.query(Document)
        
        if search:
            query = query.filter(Document.name.ilike(f"%{search}%"))
        
        if sort_by:
            if sort_by == "name":
                query = query.order_by(Document.name)
            elif sort_by == "created_at":
                query = query.order_by(Document.created_at.desc())
        
        documents = query.all()
        logger.info(f"Retrieved {len(documents)} documents")
        return documents
    except Exception as e:
        logger.error(f"Error retrieving documents: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/documentbyid/{document_id}", response_model=DocumentResponse)
async def get_document(document_id: int, db: Session = Depends(get_db)):
    """
    Get a single document by ID.
    """
    try:
        document = db.query(Document).filter(Document.id == document_id).first()
        if not document:
            logger.warning(f"Document {document_id} not found")
            raise HTTPException(status_code=404, detail="Document not found")
        return document
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving document {document_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/create-document", response_model=DocumentResponse)
async def create_document(document: DocumentCreate, db: Session = Depends(get_db)):
    """
    Create a new document.
    """
    try:
        new_document = Document(
            name=document.name,
            content=document.content,
            created_at=datetime.utcnow(),
            size=len(document.content.encode('utf-8'))
        )
        db.add(new_document)
        db.commit()
        db.refresh(new_document)
        logger.info(f"Created new document: {new_document.name}")
        return new_document
    except Exception as e:
        logger.error(f"Error creating document: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    


@app.delete("/api/deletedoc/{document_id}")
async def delete_document(document_id: int, db: Session = Depends(get_db)):
    """
    Delete a document by ID.
    """
    try:
        document = db.query(Document).filter(Document.id == document_id).first()
        if not document:
            logger.warning(f"Document {document_id} not found for deletion")
            raise HTTPException(status_code=404, detail="Document not found")
        
        db.delete(document)
        db.commit()
        logger.info(f"Deleted document {document_id}")
        return {"message": "Document deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting document {document_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    
@app.put("/api/updatedoc/{document_id}", response_model=DocumentResponse)
async def update_document(
    document_id: int, updates: DocumentUpdate, db: Session = Depends(get_db)
):
    """
    Update a document's name and/or content by ID.
    """
    try:
        document = db.query(Document).filter(Document.id == document_id).first()
        if not document:
            logger.warning(f"Document {document_id} not found for update")
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Update fields only if they are provided in the request
        if updates.name is not None:
            document.name = updates.name
        
        if updates.content is not None:
            document.content = updates.content
            document.size = len(updates.content.encode("utf-8"))  # Update size based on new content

        db.commit()
        db.refresh(document)
        logger.info(f"Updated document {document_id}")
        return document
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating document {document_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")    
