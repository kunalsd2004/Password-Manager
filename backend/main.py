from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models import Base
from routers import user, vault

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Password Manager API",
    description="A secure password manager with AES-256-GCM encryption",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user.router, prefix="/api")
app.include_router(vault.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Password Manager API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

