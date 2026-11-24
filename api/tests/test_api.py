import os
os.environ["DATABASE_URL"] = "sqlite:///./test_uniform.db"
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine

Base.metadata.create_all(bind=engine)
client = TestClient(app)


def test_health():
    assert client.get("/health").json() == {"status": "ok"}


def test_products_empty():
    response = client.get("/products")
    assert response.status_code == 200
    assert response.json() == []


def test_tryon_requires_consent():
    response = client.post("/tryon/jobs", data={"guardian_consent": "false"}, files={"photo": ("kid.jpg", b"not-a-photo", "image/jpeg")})
    assert response.status_code == 422
