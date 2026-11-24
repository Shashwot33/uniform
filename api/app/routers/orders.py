from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Order, OrderItem, Variant
from ..schemas import OrderIn, OrderOut

router = APIRouter()


@router.post("", response_model=OrderOut, status_code=201)
def create_order(payload: OrderIn, db: Session = Depends(get_db)):
    variants = {v.id: v for v in db.scalars(select(Variant).where(Variant.id.in_([i.variant_id for i in payload.items])))}
    if len(variants) != len({i.variant_id for i in payload.items}):
        raise HTTPException(status_code=422, detail="One or more variants are unavailable")
    if any(i.quantity < 1 or variants[i.variant_id].stock < i.quantity for i in payload.items):
        raise HTTPException(status_code=422, detail="Requested quantity is out of stock")
    order = Order(shipping_address=payload.shipping_address, payment_method=payload.payment_method, total_npr=sum(variants[i.variant_id].price_npr * i.quantity for i in payload.items))
    db.add(order)
    db.flush()
    for item in payload.items:
        variant = variants[item.variant_id]
        variant.stock -= item.quantity
        db.add(OrderItem(order_id=order.id, variant_id=variant.id, quantity=item.quantity, unit_price_npr=variant.price_npr))
    db.commit()
    db.refresh(order)
    return OrderOut(id=order.id, status=order.status.value, payment_method=order.payment_method, payment_status=order.payment_status, total_npr=order.total_npr)


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return OrderOut(id=order.id, status=order.status.value, payment_method=order.payment_method, payment_status=order.payment_status, total_npr=order.total_npr)
