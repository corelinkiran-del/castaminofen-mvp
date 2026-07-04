# ساختار پیشنهادی مونورپو برای Castaminofen

این سند به‌صورت فارسی توضیح می‌دهد چگونه یک مونورپو منظم برای پروژهٔ پلتفرم چندرسانه‌ای (MVP) سازمان‌دهی شود. هدف: توسعه همزمان چند سرویس و اپ‌فرنت‌ها با حداکثر اشتراک کد و کمترین اصطکاک.

پیشنهادات کلی
- Package manager: `pnpm` یا `yarn workspaces` (پیشنهاد: `pnpm` برای سرعت و مصرف فضای کمتر).
- Task runner: Turborepo یا Nx برای orchestration بین پکیج‌ها.
- زبان اصلی: TypeScript (strict mode فعال).
- Lint/Format: ESLint + Prettier + Husky (pre-commit hooks).

ساختار درختی پیشنهادی

- /packages
  - /mobile-app           # React Native (Expo managed or bare) — Mobile-first client
  - /web-dashboard       # Next.js dashboard for web/admin/creator
  - /shared              # shared utilities, types, ui tokens, API clients
  - /design              # Figma tokens export, design-system docs

- /services
  - /auth-service
  - /content-service
  - /media-service
  - /creator-service
  - /user-service
  - /payment-service
  - /sync-service
  - /transcoder-worker   # Batch workers for FFmpeg tasks

- /infra
  - /docker-compose      # Local/dev compose definitions
  - /k8s                 # Production manifests (Helm charts optional)
  - /terraform           # Cloud infra as code (optional)

- /scripts               # helper scripts (db_migrate, seeders, generate-clients)
- /docs                  # documentation files (system design, APIs, guides)
- /deploy                # CI/CD manifests, GitHub Actions / GitLab CI
- /configs               # shared config templates (nginx, certs, policy)

نکات مهم پیاده‌سازی
- هر سرویس مستقل یک repo-like package با `package.json` خودش دارد.
- `shared` شامل: تایپ‌ها (`types.ts`), API client generator (OpenAPI clients), helperهای auth، feature flags types و توابعی که بین سرویس‌ها و کلاینت مشترک است.
- برای تولید کلاینت‌های تایپ‌شده از OpenAPI generator یا `@openapitools/openapi-generator-cli` استفاده شود و خروجی در `packages/shared/openapi-clients` قرار گیرد.
- Secrets و envها در dev از `.env` استفاده و در production از Secret Manager (Vault / cloud provider secrets) استفاده شود.
- Versioning: semantic-release برای هر پکیج یا release trunk-based با tags.

اسکریپت‌های پیشنهادی در root `package.json`

- `pnpm install`
- `pnpm dev` — runs turborepo/dev pipelines (services + apps)
- `pnpm build` — build all packages
- `pnpm lint` — run eslint across repo
- `pnpm test` — run unit tests
- `pnpm gen:clients` — generate OpenAPI clients into `packages/shared`

CI / CD
- هر push -> run lint/test/build for affected packages (turbo cache)
- main branch -> build images and push to registry
- deploy to staging -> run migration job then rollout

ملاحظات برای توسعه موبایل-first
- UI tokens و design system در `packages/shared/design` نگهداری شود تا React Native و Next.js از یک منبع حقیقت استفاده کنند.
- استفاده از storybook (web) برای نمایش کامپوننت‌های مشترک.

این فایل پایهٔ ساختار مونورپو را تعریف می‌کند؛ در مرحلهٔ بعدی طرح دیتابیس و APIهای MVP را آماده می‌کنم.