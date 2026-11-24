# Uniform World — Institutional Uniform Platform

Next.js storefront and FastAPI service for schools, colleges and hospitals in Nepal.

## Local development

```sh
cp .env.example .env
docker compose up --build
```

The web app is at `http://localhost:3000`, API docs at `http://localhost:8000/docs`, and MinIO at `http://localhost:9001`.

## Launch controls

- Configure real PostgreSQL/Redis, private S3/R2 storage, HTTPS reverse proxy, provider credentials, and non-development secrets.
- Implement the configured try-on adapter using only short-lived signed URLs. Never make uploaded child photos public or use them for training.
- Deploy the expiry worker and physically delete input/result objects before deleting their records after 24 hours.
- Verify eSewa/Khalti callbacks server-side, rotate refresh tokens, and add Alembic revision files before accepting real payments.
- Optimize GLBs with `gltf-transform optimize --compress meshopt`; reject processed output above 3 MB.
