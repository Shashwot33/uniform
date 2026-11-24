from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class VariantOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    size: str
    colour: str
    price_npr: int
    stock: int


class AssetOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    layer_front_url: str | None
    layer_back_url: str | None
    glb_url: str | None
    thumbnail_url: str | None


class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    category: str
    description: str
    variants: list[VariantOut]
    assets: list[AssetOut]


class TryOnOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    status: str
    result_url: str | None
    error: str | None
    expires_at: datetime


class OrderItemIn(BaseModel):
    variant_id: str
    quantity: int = 1


class OrderIn(BaseModel):
    items: list[OrderItemIn]
    shipping_address: str = Field(min_length=8, max_length=1000)
    payment_method: str = Field(pattern="^(cod|esewa|khalti)$")


class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    status: str
    payment_method: str
    payment_status: str
    total_npr: int

