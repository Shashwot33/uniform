import io
from datetime import UTC, datetime, timedelta
from uuid import uuid4
from fastapi import APIRouter, File, Form, HTTPException, Request, UploadFile
from PIL import Image
from sqlalchemy.orm import Session
from fastapi import Depends
from ..config import get_settings
from ..database import get_db
from ..models import TryOnJob
from ..schemas import TryOnOut

router = APIRouter()
settings = get_settings()
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}


@router.post("/jobs", response_model=TryOnOut, status_code=202)
def create_job(request: Request, photo: UploadFile = File(...), guardian_consent: bool = Form(...), db: Session = Depends(get_db)):
    if not guardian_consent:
        raise HTTPException(status_code=422, detail="Parent or guardian consent is required")
    if photo.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=415, detail="Use a JPEG, PNG, or WebP image")
    raw = photo.file.read()
    if len(raw) > settings.tryon_max_upload_mb * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Image exceeds upload limit")
    try:
        image = Image.open(io.BytesIO(raw))
        image.verify()  # validates image bytes; storage service re-encodes without EXIF
    except Exception as exc:
        raise HTTPException(status_code=422, detail="Invalid image") from exc
    job = TryOnJob(input_url=f"private://uploads/{uuid4()}.jpg", expires_at=datetime.now(UTC) + timedelta(hours=24))
    db.add(job)
    db.commit()
    db.refresh(job)
    return TryOnOut(id=job.id, status=job.status.value, result_url=None, error=None, expires_at=job.expires_at)


@router.get("/jobs/{job_id}", response_model=TryOnOut)
def get_job(job_id: str, db: Session = Depends(get_db)):
    job = db.get(TryOnJob, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Try-on job not found")
    return TryOnOut(id=job.id, status=job.status.value, result_url=job.result_url, error=job.error, expires_at=job.expires_at)

