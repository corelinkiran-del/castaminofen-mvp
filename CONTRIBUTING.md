# Contributing to Media Platform

> راهنمای مشارکت در پروژه Media Platform

## 📋 Prerequisites

Before you begin, ensure you have:

```bash
- Node.js 20 LTS or higher
- Docker and Docker Compose
- Git
- Yarn package manager (v4+)
- A code editor (VS Code recommended)
```

## 🔧 Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-org/media-platform.git
cd media-platform
```

### 2. Install Dependencies

```bash
# Install root dependencies and all workspace packages
yarn install

# Verify installation
yarn --version  # Should be 4.0+
node --version  # Should be 20.x+
```

### 3. Setup Environment

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your values (for local dev, defaults work)
# nano .env.local  # or use your editor
```

### 4. Start Infrastructure

```bash
# Start all services (PostgreSQL, Redis, RabbitMQ, etc.)
docker-compose up -d

# Verify services are running
docker-compose ps

# View logs if needed
docker-compose logs -f
```

### 5. Run Migrations (Future)

```bash
# When database migrations are ready
yarn run migrate
```

### 6. Start Development

```bash
# Terminal 1: Backend services
yarn dev

# Terminal 2: Frontend web
cd frontend-web && yarn dev

# Terminal 3: Frontend mobile (optional)
cd frontend-mobile && yarn start
```

Services will be available at:
- Backend API: http://localhost:8000
- Web Dashboard: http://localhost:3000
- Auth Service: http://localhost:3001
- User Service: http://localhost:3002
- Content Service: http://localhost:3003
- Media Service: http://localhost:3004

---

## 🌳 Git Workflow

### Branch Naming Convention

```
feature/description           # New features
bugfix/description           # Bug fixes
docs/description            # Documentation
refactor/description        # Code refactoring
test/description            # Testing improvements
chore/description           # Maintenance tasks
```

### Example Branches

```bash
feature/oauth-integration
bugfix/streaming-timeout
docs/api-specification
refactor/auth-service
```

### Commit Message Format

Use conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `refactor`: Code refactoring
- `test`: Adding tests
- `perf`: Performance improvement
- `chore`: Build/dependency updates

### Examples

```bash
git commit -m "feat(auth): add oauth2 google integration"
git commit -m "fix(media): resolve streaming timeout issue"
git commit -m "docs(api): update subscription endpoints"
git commit -m "refactor(user): simplify profile update logic"
git commit -m "test(payment): add payment gateway tests"
```

---

## 📝 Code Style

### TypeScript/JavaScript

```typescript
// Use camelCase for variables and functions
const getUserProfile = () => {};

// Use PascalCase for classes and interfaces
class AuthService {}
interface IUserProfile {}

// Use UPPER_SNAKE_CASE for constants
const API_BASE_URL = 'http://localhost:8000';

// Use kebab-case for file names (except React components)
// auth.service.ts, user.controller.ts
// UserProfile.tsx, AuthForm.tsx
```

### Comments

- Write all code comments in **English**
- Use JSDoc style for functions

```typescript
/**
 * Validates user password strength
 * @param password - The password to validate
 * @returns Object with validation result and errors
 */
const validatePassword = (password: string) => {
  // Implementation
};
```

### Formatting

```bash
# Format all files
yarn run format

# Check formatting
yarn run lint

# Type check
yarn run type-check
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
yarn test

# Run specific service tests
yarn test --packages auth-service

# Run with coverage
yarn test:coverage

# Watch mode
yarn test --watch
```

### Writing Tests

- Place tests next to implementation files: `feature.ts` → `feature.test.ts`
- Use Jest for unit tests
- Use Cypress for E2E tests
- Aim for 80%+ coverage

---

## 📚 Documentation

- Always update relevant documentation files
- Keep Persian documentation updated in `/docs`
- Code comments should be in English
- Update README if adding new features
- Add examples for new API endpoints

---

## 🔍 Code Review Process

### Before Creating PR

1. [ ] Code is formatted (`yarn format`)
2. [ ] No linting errors (`yarn lint`)
3. [ ] Tests pass (`yarn test`)
4. [ ] Type checks pass (`yarn type-check`)
5. [ ] Commits follow convention
6. [ ] Documentation is updated

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing
Describe testing done

## Checklist
- [ ] Code formatted
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Branch is up-to-date with main
```

### Review Requirements

- At least 1 approval required
- All conversations must be resolved
- CI/CD checks must pass

---

## 🚀 Submitting Changes

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit:
   ```bash
   git add .
   git commit -m "feat(service): add new feature"
   ```
3. Push branch: `git push origin feature/my-feature`
4. Create Pull Request on GitHub
5. Wait for reviews and address feedback
6. Merge after approval

---

## 📦 Working with Workspaces

### Add Dependency to Specific Service

```bash
# Add to auth-service
yarn workspace @media-platform/auth-service add axios

# Add to all
yarn add axios -W
```

### Run Script in Specific Service

```bash
# Run auth service test
yarn workspace @media-platform/auth-service test

# Run all services
yarn workspaces run test
```

---

## 🐛 Debugging

### VS Code Debug Configuration

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Auth Service",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/backend/packages/auth-service/dist/main.js",
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}
```

### Logging

Services use centralized logger:

```typescript
import { createLogger } from '@media-platform/shared';

const logger = createLogger('MyService');
logger.info('User registered', { userId: 123 });
logger.error('Failed to authenticate', { error });
```

---

## 📱 Frontend Development

### React Native/Expo

```bash
# Start dev server
cd frontend-mobile
yarn start

# Run on iOS simulator
yarn ios

# Run on Android emulator
yarn android
```

### Next.js Web

```bash
# Start dev server
cd frontend-web
yarn dev

# Build for production
yarn build
yarn start

# Export static site
yarn export
```

---

## 🐳 Docker Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f service-name
docker-compose logs -f  # All services

# Stop all services
docker-compose down

# Remove volumes (clean slate)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Restart a service
docker-compose restart postgres
```

---

## 🆘 Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use docker to clean up
docker-compose down
```

### Database Connection Error

```bash
# Check database logs
docker-compose logs postgres

# Verify database is running
docker-compose ps postgres

# Restart database
docker-compose restart postgres
```

### Redis Connection Error

```bash
# Check Redis logs
docker-compose logs redis

# Clear Redis cache
docker-compose exec redis redis-cli FLUSHALL

# Restart Redis
docker-compose restart redis
```

---

## 📚 Useful Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Native Docs](https://reactnative.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

---

## ✅ Final Checklist Before Push

```bash
# Format code
yarn format

# Fix linting
yarn lint --fix

# Run tests
yarn test

# Type check
yarn type-check

# Verify services still running
docker-compose ps

# Final commit
git add .
git commit -m "type(scope): message"
git push origin feature/branch-name
```

---

## 🎓 Learning Resources

- Read [README.md](README.md) first
- Review [01_سند_معماری_سیستم.md](docs/01_سند_معماری_سیستم.md) to understand architecture
- Check [03_مشخصات_API.md](docs/03_مشخصات_API.md) for API details
- Study [02_طراحی_دیتابیس.md](docs/02_طراحی_دیتابیس.md) for data model

---

## 🤝 Need Help?

- Check existing issues and PRs
- Ask in team chat
- Create discussion if unsure
- Contact project leads
- Review code examples in existing services

---

## 📞 Contact

- **Lead Architect:** [Your Team]
- **Team Chat:** [Slack/Discord]
- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions

---

**Happy Coding! 🚀**

Last Updated: 1405/04/13
Version: 1.0
