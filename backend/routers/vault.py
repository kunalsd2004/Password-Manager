from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import User, VaultItem
from schemas import VaultItemCreate, VaultItemUpdate, VaultItemResponse
from auth import get_current_user
from crypto import crypto_manager

router = APIRouter(prefix="/vault", tags=["vault"])

@router.post("/", response_model=VaultItemResponse)
def create_vault_item(
    vault_item: VaultItemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new vault item"""
    # Encrypt the password before storing
    encrypted_password = crypto_manager.encrypt(vault_item.password)
    
    db_vault_item = VaultItem(
        user_id=current_user.id,
        title=vault_item.title,
        username=vault_item.username,
        password=encrypted_password,
        url=vault_item.url,
        notes=vault_item.notes
    )
    
    db.add(db_vault_item)
    db.commit()
    db.refresh(db_vault_item)
    
    # Decrypt password for response
    db_vault_item.password = vault_item.password
    return db_vault_item

@router.get("/", response_model=List[VaultItemResponse])
def get_vault_items(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all vault items for the current user"""
    vault_items = db.query(VaultItem).filter(VaultItem.user_id == current_user.id).all()
    
    # Decrypt passwords for response
    for item in vault_items:
        item.password = crypto_manager.decrypt(item.password)
    
    return vault_items

@router.get("/{vault_item_id}", response_model=VaultItemResponse)
def get_vault_item(
    vault_item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific vault item"""
    vault_item = db.query(VaultItem).filter(
        VaultItem.id == vault_item_id,
        VaultItem.user_id == current_user.id
    ).first()
    
    if not vault_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vault item not found"
        )
    
    # Decrypt password for response
    vault_item.password = crypto_manager.decrypt(vault_item.password)
    return vault_item

@router.put("/{vault_item_id}", response_model=VaultItemResponse)
def update_vault_item(
    vault_item_id: int,
    vault_item_update: VaultItemUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a vault item"""
    db_vault_item = db.query(VaultItem).filter(
        VaultItem.id == vault_item_id,
        VaultItem.user_id == current_user.id
    ).first()
    
    if not db_vault_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vault item not found"
        )
    
    # Update fields if provided
    update_data = vault_item_update.dict(exclude_unset=True)
    
    # Encrypt password if it's being updated
    if "password" in update_data:
        update_data["password"] = crypto_manager.encrypt(update_data["password"])
    
    for field, value in update_data.items():
        setattr(db_vault_item, field, value)
    
    db.commit()
    db.refresh(db_vault_item)
    
    # Decrypt password for response
    db_vault_item.password = crypto_manager.decrypt(db_vault_item.password)
    return db_vault_item

@router.delete("/{vault_item_id}")
def delete_vault_item(
    vault_item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a vault item"""
    vault_item = db.query(VaultItem).filter(
        VaultItem.id == vault_item_id,
        VaultItem.user_id == current_user.id
    ).first()
    
    if not vault_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vault item not found"
        )
    
    db.delete(vault_item)
    db.commit()
    
    return {"message": "Vault item deleted successfully"}

