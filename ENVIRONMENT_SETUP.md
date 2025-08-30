# 🔧 Environment Setup Guide

## 📋 Files You Need to Create Manually

When you pull this repository on a new laptop, you'll need to create these files manually:

### 1. Backend Environment File

Create `backend/.env` file:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/password_manager

# JWT Configuration
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Encryption Configuration
ENCRYPTION_KEY=your-32-byte-encryption-key-change-this-in-production
```

### 2. For Docker Deployment

If using Docker, the environment variables are already set in `docker-compose.yml`, so you don't need the `.env` file.

## 🚀 Quick Setup Steps

### Option 1: Using Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kunalsd2004/Password-Manager.git
   cd Password-Manager
   ```

2. **Start the application:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

### Option 2: Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kunalsd2004/Password-Manager.git
   cd Password-Manager
   ```

2. **Create environment file:**
   ```bash
   # Create backend/.env file with the content above
   ```

3. **Setup Backend:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements-simple.txt
   uvicorn main-simple:app --reload
   ```

4. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 🔐 Security Notes

- **Change the default keys** in production
- **Use strong passwords** for the database
- **Keep .env files secure** and never commit them to Git

## 📁 What's Already Included

✅ All source code  
✅ Configuration files  
✅ Docker setup  
✅ Documentation  
✅ Project structure  

## ❌ What's NOT Included

❌ Environment variables (.env files)  
❌ Database data  
❌ Node modules (run `npm install`)  
❌ Python virtual environment (create manually)  
❌ Local development dependencies
