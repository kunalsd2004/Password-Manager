#!/bin/bash

echo "🚀 Password Manager Setup Script"
echo "================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Create .env file for backend if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cat > backend/.env << EOF
DATABASE_URL=postgresql://postgres:password@localhost:5432/password_manager
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENCRYPTION_KEY=your-32-byte-encryption-key-change-this-in-production
EOF
    echo "✅ Backend .env file created"
else
    echo "✅ Backend .env file already exists"
fi

echo ""
echo "🔧 Building and starting the application..."
echo "This may take a few minutes on first run..."

# Build and start the application
docker-compose up --build -d

echo ""
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "🎉 Password Manager is now running!"
    echo ""
    echo "📱 Access the application:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8000"
    echo "   API Documentation: http://localhost:8000/docs"
    echo ""
    echo "🔐 Default database credentials:"
    echo "   Username: postgres"
    echo "   Password: password"
    echo "   Database: password_manager"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Open http://localhost:3000 in your browser"
    echo "   2. Register a new account"
    echo "   3. Start adding your passwords!"
    echo ""
    echo "🛑 To stop the application, run: docker-compose down"
    echo "🔄 To restart, run: docker-compose up -d"
else
    echo "❌ Failed to start services. Check the logs with: docker-compose logs"
    exit 1
fi

