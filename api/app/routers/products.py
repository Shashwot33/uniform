from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from ..database import get_db
from ..models import Product
from ..schemas import ProductOut

router = APIRouter()


@router.get("", response_model=list[ProductOut])
def list_products(db: Session = Depends(get_db)):
    return db.scalars(select(Product).where(Product.active.is_(True)).options(selectinload(Product.variants), selectinload(Product.assets))).all()


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.scalar(select(Product).where(Product.id == product_id, Product.active.is_(True)).options(selectinload(Product.variants), selectinload(Product.assets)))
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

