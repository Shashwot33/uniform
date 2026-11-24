from celery import Celery
from ..config import get_settings

settings = get_settings()
app = Celery("uniform", broker=settings.redis_url, backend=settings.redis_url)
app.conf.beat_schedule = {"expire-tryons-hourly": {"task": "app.workers.tasks.expire_tryons", "schedule": 3600}}
