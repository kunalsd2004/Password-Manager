@echo off
echo 🚀 Password Manager Setup Script
echo ================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are installed

REM Create .env file for backend if it doesn't exist
if not exist "backend\.env" (
    echo 📝 Creating backend .env file...
    (
        echo DATABASE_URL=postgresql://postgres:password@localhost:5432/password_manager
        echo SECRET_KEY=your-super-secret-key-change-this-in-production
        echo ALGORITHM=HS256
        echo ACCESS_TOKEN_EXPIRE_MINUTES=30
        echo ENCRYPTION_KEY=your-32-byte-encryption-key-change-this-in-production
    ) > backend\.env
    echo ✅ Backend .env file created
) else (
    echo ✅ Backend .env file already exists
)

echo.
echo 🔧 Building and starting the application...
echo This may take a few minutes on first run...

REM Build and start the application
docker-compose up --build -d

echo.
echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Check if services are running
docker-compose ps | findstr "Up" >nul
if %errorlevel% equ 0 (
    echo.
    echo 🎉 Password Manager is now running!
    echo.
    echo 📱 Access the application:
    echo    Frontend: http://localhost:3000
    echo    Backend API: http://localhost:8000
    echo    API Documentation: http://localhost:8000/docs
    echo.
    echo 🔐 Default database credentials:
    echo    Username: postgres
    echo    Password: password
    echo    Database: password_manager
    echo.
    echo 📋 Next steps:
    echo    1. Open http://localhost:3000 in your browser
    echo    2. Register a new account
    echo    3. Start adding your passwords!
    echo.
    echo 🛑 To stop the application, run: docker-compose down
    echo 🔄 To restart, run: docker-compose up -d
) else (
    echo ❌ Failed to start services. Check the logs with: docker-compose logs
    pause
    exit /b 1
)

pause

