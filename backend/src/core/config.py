from typing import Any, List
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str
    APP_MODE: str = "development"
    DEBUG: bool = True
    
    # CORS uchun yangi qator
    # .env faylida ["http://localhost:3000", "https://example.com"] ko'rinishida bo'ladi
    BACKEND_CORS_ORIGINS: List[str] = []

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> List[str]:
        if v is None:
            return []
        if isinstance(v, str):
            return [i.strip() for i in v.split(",") if i.strip()]
        if isinstance(v, list):
            return v
        return []
    
    HOST: str = "127.0.0.1"
    PORT: int = 8000

    SECRET_KEY: str
    
    # JWT sozlamalari
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Cookie sozlamalari
    COOKIE_SECURE: bool = False  # Production'da True bo'lish kerak (HTTPS uchun)
    COOKIE_HTTPONLY: bool = True  # XSS attack'lardan saqlash
    COOKIE_SAMESITE: str = "lax"  # CSRF attack'lardan saqlash (lax yoki strict)
    COOKIE_DOMAIN: str = "127.0.0.1"  # localhost yoki domain
    
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: int
    DB_NAME: str
    SQLITE_URL: str

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def DATABASE_URL(self):
        if self.APP_MODE == "production":
            return f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        return self.SQLITE_URL

settings = Settings()
