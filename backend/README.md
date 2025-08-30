# Password Manager Backend

A secure FastAPI backend for the Password Manager application with AES-256-GCM encryption.

## Features

- User registration and authentication with JWT tokens
- Password hashing using Argon2id
- AES-256-GCM encryption for vault items
- PostgreSQL database integration
- RESTful API endpoints

## Setup

### Prerequisites

- Python 3.11+
- PostgreSQL database

### Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables (create a `.env` file):
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/password_manager
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENCRYPTION_KEY=your-32-byte-encryption-key-change-this-in-production
```

3. Run the application:
```bash
uvicorn main:app --reload
```

### Using Docker

```bash
docker-compose up --build
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get JWT token

### Vault Management
- `GET /api/vault/` - Get all vault items
- `POST /api/vault/` - Create a new vault item
- `GET /api/vault/{id}` - Get a specific vault item
- `PUT /api/vault/{id}` - Update a vault item
- `DELETE /api/vault/{id}` - Delete a vault item

## Security Features

- JWT-based authentication
- Argon2id password hashing
- AES-256-GCM encryption for sensitive data
- CORS protection
- Input validation with Pydantic

## Database Schema

### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- hashed_password
- created_at
- updated_at

### Vault Items Table
- id (Primary Key)
- user_id (Foreign Key)
- title
- username
- password (Encrypted)
- url
- notes
- created_at
- updated_at

