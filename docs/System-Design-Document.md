# سند طراحی سیستم — پلتفرم چندرسانه‌ای ترکیبی (Audio + Video + Audiobook)

این سند به زبان فارسی و برای پیاده‌سازی یک پلتفرم موبایل-اول (Mobile-First) ترکیبی صوتی و تصویری آماده شده است. هدف: پیاده‌سازی MVP قابل تولید (production-ready) با قابلیت توسعه برای فازهای بعدی.

## 1. خلاصه‌ی سطح بالا
- محصول: اپلیکیشن موبایل-محور ترکیبی پادکست/کتاب صوتی/ویدیو.
- ویژگی مرکزی MVP: پلیر واحد (audio+video)، دانلود آفلاین، تجربه‌ی discovery اولیه، حساب کاربری، سیستم اشتراک و پنل سازنده برای آپلود و مدیریت محتوا.
- رویکرد فنی: مونورپو با میکروسرویس‌های Node.js/TypeScript در بک‌اند، React Native برای موبایل، Next.js برای وب/داشبورد.

## 2. تصمیمات معماری کلیدی
- معماری: Microservices سبک با API Gateway (REST), سرویس‌های مجزا: auth, content, media, creator, user, payment.
- پروتکل API: REST برای MVP (قابل تبدیل به GraphQL در فاز بعدی برای پیچیده‌تر شدن queries).
- رسانه: فایل‌ها در Object Storage (S3-compatible) نگهداری شده و با CDN منتشر می‌شوند. استریم با HLS (video) و HLS/DASH یا progressive download برای audio.
- دانلود آفلاین: client-side encrypted chunked download + manifest (for resume & integrity) با sync وضعیت دانلود‌ها در سرور.
- دیتابیس: PostgreSQL اصلی برای داده‌های رابطه‌ای، Redis برای cache و coordination (locks, queues), و ElasticSearch/Vector DB برای جستجوی پیشرفته و embedding در فاز بعدی.
- پردازش مدیا: یک مدیا ورک‌فلو (transcoder) مبتنی بر FFmpeg در پشت‌صحنه برای تولید چند کیفیت، استخراج موج صوتی (waveform), و ایجاد thumbnails.
- احراز هویت: JWT + refresh tokens، OAuth2 providers for social login.

## 3. کامپوننت‌ها و جریان داده
- API Gateway: مسیر همه درخواست‌ها، rate limiting، احراز هویت اولیه، رایتینگ لاگ.
- Auth Service: مدیریت کاربران، sessions, JWTs, subscription status.
- Content Service: متادیتای محتوا (shows, episodes, books), search index bootstrap.
- Media Service: presigned URLs, streaming endpoints, ingestion pipeline (upload -> transcoding -> store -> CDN).
- Creator Service: پنل آپلود، مدیریت اپیزود، پردازش متادیتا، و مدیریت درآمد.
- Payment Service: تعامل با payment gateway محلی (plugin based) و مدیریت تراکنش‌ها و تقسیم درآمد.
- Sync Service: سینک وضعیت‌های کاربران و دانلودها بین دستگاه‌ها (via change-logs / event sourcing minimal).

## 4. Storage & Streaming
- Object Storage: S3-compatible (minIO for on-prem test, AWS S3 for production).
- CDN: edge caching برای فایل‌های استریم و فایل‌های استاتیک.
- Streaming protocol: HLS with IAM-protected signed URLs. For audio short-form progressive download + HLS fallback.
- Adaptive bitrate: produce multiple renditions (64/128/192/320 kbps for audio; 240/360/720p for video).

## 5. Offline-first & Sync strategy
- Client keeps a Download Manifest per content (list of segments with checksums).
- Downloads are chunked and resumable; metadata stored locally (SQLite on device) and mirrored to server as a compact state (list of content ids + last-played pos + downloaded segments).
- Conflict resolution: server is source-of-truth for user-owned lists; client sends local events as deltas.

## 6. Scalability & Observability
- Autoscaling stateless services behind load balancers.
- Persistent services: managed Postgres with read replicas; Redis cluster.
- Observability: OpenTelemetry traces, centralized logs (ELK or Loki + Grafana), metrics via Prometheus.

## 7. Security & Compliance
- JWT + refresh, rotating refresh tokens.
- Signed CDN URLs, optional DRM later.
- Rate-limiting, abuse detection, content moderation pipeline (ML-assisted + human review).
- PCI: keep payment flow in dedicated service and rely on payment gateway to handle card data.

## 8. AI-readiness
- Embed an AI layer via event-driven architecture: extracted transcripts -> embeddings stored in vector DB -> search/summarization microservice.
- ASR pipeline: batched/streaming transcription service optimized for Persian (fine-tuned models, on-prem GPU or managed cloud).

## 9. Deployment & infra (MVP)
- Container-based deployments with Docker + Kubernetes (production) or Docker Compose (dev/local).
- CI: TypeScript tests, lint, build images, run integration tests, and promote to staging.

## 10. Non-functional requirements (MVP)
- Mobile-first, responsive web dashboard.
- Latency: first-byte for media < 500ms in target region via CDN.
- Offline reliability: resume downloads, integrity checks.
- Security: OWASP basics, input validation, rate limits.

## 11. Next steps (immediate)
1. طراحی دیتابیس و نگاشت جداول اصلی (در فایل جداگانه).
2. تعریف API spec MVP (OpenAPI) و قراردادها.
3. ایجاد اسکلت میکروسرویس‌ها و اپ موبایل اولیه.
4. پیاده‌سازی جریان ingest مدیا و نمونه‌ای از HLS packaging.

---

این سند برای شروع توسعه و پیاده‌سازی MVP کافی است؛ در فایل‌های جداگانه توضیحات دیتابیس و API ارائه شده‌اند.