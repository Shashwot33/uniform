from sqlalchemy.orm import Session
from ..models import Product, Variant

SAMPLE_PRODUCTS = [
    ("summer-dress", "Summer Check Dress", "dress", "Breathable check dress for warm school days.", "Sky blue", 1850),
    ("pinafore", "Navy Pinafore", "dress", "Durable all-season pinafore with adjustable fit.", "Navy", 2150),
    ("school-shirt", "School Shirt", "shirt", "Easy-care cotton blend school shirt.", "White", 950),
    ("school-trousers", "School Trousers", "trousers", "Reinforced everyday school trousers.", "Navy", 1350),
]


def seed_catalog(db: Session) -> None:
    if db.query(Product).first():
        return
    for product_id, name, category, description, colour, price in SAMPLE_PRODUCTS:
        product = Product(id=product_id, name=name, category=category, description=description)
        product.variants = [Variant(id=f"{product_id}-{size}", size=size, colour=colour, price_npr=price, stock=20) for size in ("24", "26", "28", "30", "32")]
        db.add(product)
    db.commit()
