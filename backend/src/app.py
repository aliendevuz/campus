from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from src.api.v1.endpoints import auth
from src.api.v1.endpoints import hello
from src.core.config import settings
from src.core.database import create_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG,
    lifespan=lifespan
)

origins = []
if settings.DEBUG:
    origins = ["*"]
else:
    origins = [str(origin) for origin in settings.BACKEND_CORS_ORIGINS]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(hello.router, prefix="/api/v1/hello", tags=["Hello"])
# app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])


@app.get("/health")
def health():
    return {"status": "ok"}
