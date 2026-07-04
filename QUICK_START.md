# شروع سریع - Quick Start

> ۵ دقیقه تا محیط توسعه آماده

## 🚀 شروع (5 Minutes)

### Step 1: Clone & Install (2 min)

```bash
git clone https://github.com/your-org/media-platform.git
cd media-platform
yarn install
```

### Step 2: Environment Setup (1 min)

```bash
cp .env.example .env.local
# Optional: Edit .env.local if needed
```

### Step 3: Start Infrastructure (2 min)

```bash
docker-compose up -d
docker-compose ps  # Verify all services running
```

### Step 4: Run Services

```bash
# Open terminal 1
yarn dev

# Open terminal 2
cd frontend-web && yarn dev

# Visit http://localhost:3000
```

✅ **Ready to code!**

---

## 📱 First API Call

```bash
# Test auth service
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "SecurePass123!",
    "displayName": "Test User"
  }'
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "token": "eyJhbG...",
    "user": { "email": "test@example.com" }
  }
}
```

---

## 📚 Documentation Map

```
README.md                                 ← Start here
├── docs/01_سند_معماری_سیستم.md        ← Architecture overview
├── docs/02_طراحی_دیتابیس.md            ← Database schema
├── docs/03_مشخصات_API.md                ← API reference
├── docs/04_انتخاب_تکنولوژی.md           ← Tech stack
├── docs/05_ساختار_پروژه.md              ← Project structure
├── docs/06_راهنمای_توسعه.md             ← Development guide
└── docs/07_تحلیل_ریسک_و_راه_حل.md      ← Risk analysis

CONTRIBUTING.md                           ← How to contribute
DELIVERABLES.md                           ← What's included
```

---

## 🎯 Common Tasks

### Frontend Development

```bash
# React web dashboard
cd frontend-web
yarn dev

# React Native mobile
cd frontend-mobile
yarn start
```

### Backend Service Development

```bash
# Work on auth service
cd backend/packages/auth-service
yarn dev

# Work on user service  
cd backend/packages/user-service
yarn dev
```

### Testing

```bash
# Run all tests
yarn test

# Watch mode
yarn test --watch

# Coverage
yarn test:coverage
```

### Database

```bash
# When migrations are ready
yarn run migrate

# View database
docker-compose exec postgres psql -U media_user -d media_platform

# Reset database
docker-compose exec postgres psql -U media_user -d media_platform -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

---

## 🐛 Troubleshooting Quick Reference

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `lsof -i :3000` then kill process |
| Docker failed | `docker-compose down && docker-compose up -d` |
| DB connection error | `docker-compose logs postgres` |
| Modules not found | `yarn install` then `yarn workspaces focus @media-platform/shared` |
| Redis error | `docker-compose restart redis` |

---

## ✅ Quick Verification Checklist

After setup, verify everything:

```bash
# 1. Check services are running
docker-compose ps

# 2. Test database
docker-compose exec postgres psql -U media_user -d media_platform -c "SELECT 1;"

# 3. Test Redis
docker-compose exec redis redis-cli ping

# 4. Test RabbitMQ UI
# Visit http://localhost:15672 (guest/guest)

# 5. Test API
curl http://localhost:3001/api/auth/register -X OPTIONS -v

# 6. Test frontend
open http://localhost:3000
```

---

## 🔑 Key Commands Reference

```bash
# Development
yarn dev                          # Start all services
yarn format                       # Format code
yarn lint                         # Check linting
yarn type-check                   # Type checking
yarn test                         # Run tests

# Docker
docker-compose up -d              # Start infrastructure
docker-compose down               # Stop everything
docker-compose logs -f            # View all logs
docker-compose ps                 # View status

# Workspaces
yarn workspaces run test          # Test all packages
yarn workspace @media-platform/auth-service test  # Test one
yarn add axios -W                 # Add to all

# Database (future)
yarn run migrate                  # Run migrations
yarn run migrate:rollback         # Rollback
yarn run seed                     # Seed data
```

---

## 📖 Next Steps

### First Time Setup (Do Once)
1. ✅ Clone repository
2. ✅ Run `yarn install`
3. ✅ Copy `.env.local`
4. ✅ Start `docker-compose`
5. ✅ Run `yarn dev`

### Before First Commit
1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Review [docs/01_سند_معماری_سیستم.md](docs/01_سند_معماری_سیستم.md)
3. Understand [docs/03_مشخصات_API.md](docs/03_مشخصات_API.md)

### Development Workflow
1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test
3. Format code: `yarn format`
4. Commit: `git commit -m "feat(scope): description"`
5. Push: `git push origin feature/name`
6. Create Pull Request

---

## 🎓 Understanding the Project

### The Big Picture
```
Web App (Next.js) ──┐
                    ├─→ API Gateway ──→ Microservices ──→ PostgreSQL
Mobile App (RN) ───┘                       ├─ Auth
                                           ├─ User
                                           ├─ Content
                                           └─ Media
                                              ↓
                                           Redis/RabbitMQ
```

### Service Responsibility
- **Auth**: Login, registration, tokens
- **User**: Profiles, library, history
- **Content**: Search, discovery, metadata
- **Media**: Streaming, downloads, progress

---

## 💡 Pro Tips

1. **Keep terminal organized**: Use tmux or VS Code terminals
2. **Use `.env.local`**: Never commit real secrets
3. **Read logs**: They're your friend! `docker-compose logs -f`
4. **Test early**: Write tests as you code
5. **Document changes**: Update docs when adding features
6. **Commit often**: Small commits are easier to review

---

## 📞 Getting Help

- **"How do I...?"** → Check [CONTRIBUTING.md](CONTRIBUTING.md)
- **"What is...?"** → Check respective doc in `/docs`
- **"Setup issue"** → Check Troubleshooting table above
- **"Architecture question"** → Read [01_سند_معماری_سیستم.md](docs/01_سند_معماری_سیستم.md)
- **"API question"** → Check [03_مشخصات_API.md](docs/03_مشخصات_API.md)

---

## 🎉 You're Ready!

```
✅ Environment set up
✅ Docker running
✅ Services accessible
✅ Documentation available

→ Create your feature branch and start coding!
```

---

**Happy Coding! 🚀**

For more details: See [CONTRIBUTING.md](CONTRIBUTING.md) and [README.md](README.md)
