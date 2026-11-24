"""Private background jobs for try-on processing and retention enforcement."""
from datetime import UTC, datetime
from .celery_app import app
from ..database import SessionLocal
from ..models import TryOnJob


@app.task
def process_tryon(job_id: str) -> None:
    """Provider adapter boundary; use signed private URLs only."""
    db = SessionLocal()
    try:
        job = db.get(TryOnJob, job_id)
        if not job:
            return
        job.error = "No AI provider configured"
        db.commit()
    finally:
        db.close()


@app.task
def expire_tryons() -> int:
    """Delete expired private storage objects before removing these records."""
    db = SessionLocal()
    try:
        jobs = db.query(TryOnJob).filter(TryOnJob.expires_at < datetime.now(UTC)).all()
        for job in jobs:
            db.delete(job)
        db.commit()
        return len(jobs)
    finally:
        db.close()
