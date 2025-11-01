```markdown
# 智东家居服务系统 (Zhidongjiaqu Service)

A comprehensive backend service system with database and Docker support for smart home management.

## 🚀 Features

### Backend Services
- RESTful API for device management
- User management system
- System settings configuration
- PostgreSQL database integration
- Docker containerization
- Health monitoring endpoints

### Frontend
- Multi-timezone digital clock interface
- Responsive web design
- Local storage support

## 📋 Prerequisites

- Node.js 18+ or Docker
- PostgreSQL 15+ (if running locally without Docker)
- npm or yarn

## 🛠️ Installation

### Option 1: Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/zf13883922290/zhidongjiaqu-servse.git
cd zhidongjiaqu-servse
```

2. Create environment file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start services with Docker Compose:
```bash
docker-compose up -d
```

4. Access the application:
- Frontend: http://localhost:3000
- API: http://localhost:3000/api
- Health Check: http://localhost:3000/api/health
- Database Admin (Adminer): http://localhost:8080

### Option 2: Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up PostgreSQL database:
```bash
# Create database
createdb zhidongjiaqu

# Run migrations
npm run migrate

# Seed database (optional)
npm run seed
```

3. Create and configure `.env` file:
```bash
cp .env.example .env
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Service health status

### Devices
- `GET /api/devices` - Get all devices
- `GET /api/devices/:id` - Get device by ID
- `POST /api/devices` - Create new device
- `PUT /api/devices/:id` - Update device
- `DELETE /api/devices/:id` - Delete device

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user

### Settings
- `GET /api/settings` - Get all settings
- `GET /api/settings/:key` - Get setting by key
- `PUT /api/settings/:key` - Update or create setting

## 🗄️ Database Schema

### Tables
- **users**: User accounts and authentication
- **devices**: Smart home devices management
- **settings**: System configuration

See `scripts/init.sql` for complete schema.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| NODE_ENV | Environment | development |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_NAME | Database name | zhidongjiaqu |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | - |

## 🔒 Security Notes

- Never commit `.env` files to version control
- Change default database passwords in production
- Use strong passwords for production environments
- Keep dependencies up to date

## 🐛 Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Check database credentials in `.env`
3. Verify network connectivity (especially in Docker)

### Docker Issues
1. Ensure Docker daemon is running
2. Check port availability (3000, 5432, 8080)
3. Review logs: `docker-compose logs -f`

### Application Errors
1. Check logs for error details
2. Verify all dependencies are installed
3. Ensure database migrations have run

## 📝 Development

### Project Structure
```
.
├── config/              # Configuration files
│   └── database.js     # Database connection
├── routes/             # API route handlers
│   ├── devices.js
│   ├── users.js
│   └── settings.js
├── scripts/            # Database scripts
│   ├── init.sql       # Schema initialization
│   ├── migrate.js     # Migration runner
│   └── seed.js        # Data seeding
├── server.js          # Main application entry
├── docker-compose.yml # Docker orchestration
├── Dockerfile         # Docker image definition
└── package.json       # Dependencies

Frontend files:
├── index.html         # Clock interface
├── script.js          # Frontend logic
└── styles.css         # Styling
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on GitHub.