from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database Configuration
    database_url: str = "postgresql://postgres:password@localhost:5432/password_manager"
    
    # JWT Configuration
    secret_key: str = "your-super-secret-key-change-this-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Encryption Configuration
    encryption_key: str = "your-32-byte-encryption-key-change-this-in-production"
    
    class Config:
        env_file = ".env"

settings = Settings()

