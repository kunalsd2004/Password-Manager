from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # Database Configuration - Use PostgreSQL if DATABASE_URL is set, otherwise SQLite
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./password_manager.db")
    
    # JWT Configuration
    secret_key: str = "your-super-secret-key-change-this-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Encryption Configuration
    encryption_key: str = "your-32-byte-encryption-key-change-this-in-production"
    
    class Config:
        env_file = ".env"

settings = Settings()

