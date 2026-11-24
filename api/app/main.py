from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from .config import get_settings
from .database import Base, SessionLocal, engine
from .routers import orders, products, tryon
from .services.seed import seed_catalog

settings = get_settings()
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="Uniform Try-On API", version="0.1.0")
app.state.limiter = limiter
app.add_middleware(CORSMiddleware, allow_origins=[settings.web_origin], allow_methods=["*"], allow_headers=["*"])


@app.on_event("startup")
def startup() -> None:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_catalog(db)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(tryon.router, prefix="/tryon", tags=["try-on"])
app.include_router(orders.router, prefix="/orders", tags=["orders"])

