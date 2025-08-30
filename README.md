# 🔐 Password Manager

A secure, modern password management application built with React, FastAPI, and PostgreSQL. Features AES-256-GCM encryption, password generation, strength analysis, and session management.

## ✨ Features

### 🔒 Security Features
- **AES-256-GCM Encryption** for password storage
- **Argon2id Password Hashing** for master passwords
- **JWT Authentication** with secure token management
- **Session Management** with auto-logout after inactivity
- **Password Strength Analyzer** with real-time feedback

### 🛠️ User Features
- **Password Generation Tool** with customizable options
- **Secure Vault Storage** for all credentials
- **Password Visibility Toggle** (show/hide)
- **Copy to Clipboard** functionality
- **Responsive Design** for all devices
- **Modern UI** with Tailwind CSS

### 📊 Dashboard & Analytics
- **Vault Overview** with password count
- **Security Statistics** and insights
- **Recent Passwords** quick access
- **Quick Actions** for common tasks

## 🏗️ Architecture

### System Layers
- **User Interface Layer** - React frontend with Tailwind CSS
- **Authentication Layer** - JWT-based authentication with session management
- **Processing Layer** - FastAPI backend with encryption/decryption
- **Database Layer** - PostgreSQL with encrypted data storage
- **Security Middleware** - Session timeout, clipboard clearing

### Tech Stack
- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **Security**: AES-256-GCM, Argon2id, JWT
- **Deployment**: Docker, Docker Compose

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kunalsd2004/Password-Manager.git
   cd Password-Manager
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Local Development Setup

1. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements-simple.txt
   uvicorn main-simple:app --reload
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 📁 Project Structure

```
Password-Manager/
├── backend/
│   ├── routers/
│   │   ├── user.py          # User authentication endpoints
│   │   └── vault.py         # Password vault CRUD endpoints
│   ├── models.py            # Database models
│   ├── schemas.py           # Pydantic schemas
│   ├── auth.py              # Authentication utilities
│   ├── crypto.py            # Encryption/decryption utilities
│   ├── database.py          # Database configuration
│   ├── config_simple.py     # Application settings
│   ├── main-simple.py       # FastAPI application
│   └── requirements-simple.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PasswordGenerator.jsx
│   │   │   ├── PasswordStrength.jsx
│   │   │   ├── SessionManager.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Vault.jsx
│   │   ├── services/
│   │   │   └── api.js       # API service layer
│   │   └── styles/
│   │       └── global.css
│   ├── package.json
│   └── tailwind.config.js
├── docker-compose.yml
├── README.md
└── setup scripts
```

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

### Vault Management
- `GET /api/vault/` - Get all vault items
- `POST /api/vault/` - Create new vault item
- `GET /api/vault/{id}` - Get specific vault item
- `PUT /api/vault/{id}` - Update vault item
- `DELETE /api/vault/{id}` - Delete vault item

## 🔐 Security Features

### Encryption
- **AES-256-GCM** for vault item encryption
- **PBKDF2** for key derivation
- **Argon2id** for password hashing

### Authentication
- **JWT tokens** with configurable expiration
- **Session management** with activity monitoring
- **Auto-logout** after 30 minutes of inactivity

### Password Security
- **Real-time strength analysis**
- **Customizable password generation**
- **Secure clipboard operations**

## 🎨 UI/UX Features

### Modern Design
- **Responsive layout** for desktop, tablet, and mobile
- **Dark/Light theme** support
- **Smooth animations** and transitions
- **Intuitive navigation**

### User Experience
- **Password visibility toggle**
- **One-click copy to clipboard**
- **Real-time password strength feedback**
- **Session timeout warnings**

## 🚀 Deployment

### Docker Deployment
```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs

# Stop services
docker-compose down
```

### Production Considerations
- Change default secret keys in `config_simple.py`
- Use environment variables for sensitive data
- Set up proper SSL/TLS certificates
- Configure database backups
- Implement rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [FastAPI](https://fastapi.tiangolo.com/)
- Frontend powered by [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [PostgreSQL](https://www.postgresql.org/)

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact: [Your Contact Information]

---

**🔐 Secure your digital life with our Password Manager!**
