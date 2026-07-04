# مشخصات API - پلتفرم چندرسانه‌ای

## ۱. مقدمه

### ۱.۱ Base URLs
```
Production:  https://api.media-platform.ir/v1
Staging:     https://staging-api.media-platform.ir/v1
Development: http://localhost:8000/v1
```

### ۱.۲ Versioning
- API Version: v1
- Release Date: 2026-07-04
- Sunset Date: 2027-07-04

### ۱.۳ Protocol
- HTTP/2
- All requests/responses: JSON
- Charset: UTF-8

---

## ۲. Authentication

### ۲.۱ Token Types

#### Access Token (JWT)
```
Header format: Authorization: Bearer {access_token}
Expiration: 1 hour
```

#### Refresh Token
```
Used to obtain new access token
Expiration: 30 days
Stored securely (HTTP-only cookie)
```

### ۲.۲ OAuth2 Support
```
Providers: Google, Apple ID (future: GitHub)
Scopes:
  - profile: User profile information
  - email: Email address
  - openid: OpenID Connect
```

---

## ۳. Response Format

### ۳.۱ Success Response
```json
{
  "success": true,
  "data": {
    // Actual data here
  },
  "error": null,
  "timestamp": "2026-07-04T10:30:00Z",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### ۳.۲ Error Response
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "توضیح خطا به فارسی",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  },
  "timestamp": "2026-07-04T10:30:00Z",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### ۳.۳ Pagination Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "totalPages": 25,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

## ۴. HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid parameters |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Maintenance mode |

---

## ۵. Rate Limiting

```
Default: 1000 requests/hour per user
Premium: 10000 requests/hour per user
Creator: 5000 requests/hour per user

Headers:
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1625404800
```

---

## ۶. Auth Endpoints

### ۶.۱ Register User
```
POST /api/auth/register

Request:
{
  "email": "user@example.com",
  "phone": "+989121234567",
  "password": "SecurePassword123!",
  "first_name": "علی",
  "last_name": "احمدی",
  "username": "ali_ahmadi",
  "accept_terms": true
}

Response (201):
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "ali_ahmadi",
    "access_token": "eyJhbGc...",
    "refresh_token": "eyJhbGc...",
    "token_type": "Bearer",
    "expires_in": 3600
  }
}

Errors:
- 400: Invalid email format
- 409: Email already registered
- 422: Password too weak
```

### ۶.۲ Login
```
POST /api/auth/login

Request:
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "device_id": "device_uuid"
}

Response (200):
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "access_token": "eyJhbGc...",
    "refresh_token": "eyJhbGc...",
    "token_type": "Bearer",
    "expires_in": 3600
  }
}
```

### ۶.۳ Refresh Token
```
POST /api/auth/refresh-token

Request:
{
  "refresh_token": "eyJhbGc..."
}

Response (200):
{
  "data": {
    "access_token": "eyJhbGc...",
    "refresh_token": "eyJhbGc...",
    "token_type": "Bearer",
    "expires_in": 3600
  }
}
```

### ۶.۴ Logout
```
POST /api/auth/logout

Headers:
Authorization: Bearer {access_token}

Response (204): No content
```

### ۶.۵ OAuth2 Google Login
```
GET /api/auth/oauth/google/authorize?
  redirect_uri=app://callback&
  state=random_state

Redirect to:
GET /api/auth/oauth/google/callback?
  code={auth_code}&
  state={state}

Response (200):
{
  "data": {
    "access_token": "...",
    "refresh_token": "...",
    "user": {...}
  }
}
```

---

## ۷. User Endpoints

### ۷.۱ Get Current User Profile
```
GET /api/users/me

Headers:
Authorization: Bearer {access_token}

Response (200):
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "ali_ahmadi",
    "first_name": "علی",
    "last_name": "احمدی",
    "avatar_url": "https://...",
    "bio": "توضیحات درباره من",
    "subscription_status": "premium",
    "subscription_end_date": "2027-07-04T00:00:00Z",
    "is_creator": false,
    "dark_mode": true,
    "preferred_language": "fa",
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

### ۷.۲ Update User Profile
```
PUT /api/users/me

Headers:
Authorization: Bearer {access_token}

Request:
{
  "first_name": "علی",
  "last_name": "احمدی",
  "bio": "متن جدید درباره من",
  "avatar_url": "https://...",
  "dark_mode": true,
  "preferred_language": "en"
}

Response (200):
{
  "data": { ...updated user }
}
```

### ۷.۳ Get User by ID
```
GET /api/users/{userId}

Response (200):
{
  "data": {
    "id": "uuid",
    "username": "ali_ahmadi",
    "first_name": "علی",
    "avatar_url": "...",
    "bio": "...",
    "total_followers": 1250,
    "total_content_items": 3,
    "is_creator": true,
    "verified": true
  }
}
```

### ۷.۴ Get User Library
```
GET /api/users/me/library?
  page=1&
  limit=20&
  sort=added_at:desc&
  type=all

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 20)
- sort: Sort field (added_at, title)
- type: all, podcast, audiobook, video

Response (200):
{
  "data": [
    {
      "id": "uuid",
      "content_id": "uuid",
      "title": "نام پادکست",
      "creator_name": "نام creator",
      "added_at": "2026-07-01T00:00:00Z",
      "is_downloaded": false
    }
  ],
  "pagination": {...}
}
```

### ۷.۵ Add to Library
```
POST /api/users/me/library

Request:
{
  "content_id": "uuid",
  "notification": true
}

Response (201):
{
  "data": {
    "id": "uuid",
    "content_id": "uuid",
    "added_at": "2026-07-04T10:30:00Z"
  }
}
```

### ۷.۶ Remove from Library
```
DELETE /api/users/me/library/{contentId}

Response (204): No content
```

### ۷.۷ Get Listening History
```
GET /api/users/me/history?
  page=1&
  limit=20&
  days=7

Response (200):
{
  "data": [
    {
      "id": "uuid",
      "episode_id": "uuid",
      "title": "عنوان اپیزود",
      "current_position": 300000,
      "total_duration": 3600000,
      "played_at": "2026-07-04T10:30:00Z",
      "is_completed": false
    }
  ],
  "pagination": {...}
}
```

### ۷.۸ Get Following List
```
GET /api/users/me/following?
  page=1&
  limit=20

Response (200):
{
  "data": [
    {
      "id": "uuid",
      "username": "ali_ahmadi",
      "avatar_url": "...",
      "is_creator": true,
      "following_at": "2026-07-01T00:00:00Z"
    }
  ],
  "pagination": {...}
}
```

### ۷.۹ Follow User/Creator
```
POST /api/users/{userId}/follow

Request:
{
  "notifications_enabled": true
}

Response (201):
{
  "data": {
    "id": "uuid",
    "user_id": "{userId}",
    "following_at": "2026-07-04T10:30:00Z"
  }
}
```

### ۷.۱۰ Unfollow User/Creator
```
DELETE /api/users/{userId}/follow

Response (204): No content
```

---

## ۸. Content Endpoints

### ۸.۱ Search Contents
```
GET /api/contents/search?
  q=keyword&
  type=podcast&
  category=education&
  page=1&
  limit=20

Query Parameters:
- q: Search keyword
- type: podcast, audiobook, video
- category: Content category
- page: Page number
- limit: Items per page
- sort: relevance, newest, popular

Response (200):
{
  "data": [
    {
      "id": "uuid",
      "title": "عنوان پادکست",
      "creator": {
        "id": "uuid",
        "name": "نام creator",
        "avatar_url": "..."
      },
      "cover_image_url": "...",
      "category": "education",
      "total_episodes": 50,
      "total_followers": 5000,
      "explicit": false,
      "requires_subscription": false
    }
  ],
  "pagination": {...}
}
```

### ۸.۲ Get Content Details
```
GET /api/contents/{contentId}

Response (200):
{
  "data": {
    "id": "uuid",
    "title": "عنوان پادکست",
    "slug": "podcast-slug",
    "description": "توضیح کامل",
    "cover_image_url": "...",
    "type": "podcast",
    "category": "education",
    "creator": {
      "id": "uuid",
      "name": "نام creator",
      "avatar_url": "...",
      "verified": true
    },
    "total_episodes": 50,
    "total_duration": 1800000,
    "total_plays": 500000,
    "total_followers": 5000,
    "explicit": false,
    "requires_subscription": false,
    "price": null,
    "is_saved": false,
    "user_progress": {
      "last_episode_id": "uuid",
      "last_position": 300000,
      "last_played_at": "2026-07-04T10:30:00Z"
    }
  }
}
```

### ۸.۳ Get Content Episodes
```
GET /api/contents/{contentId}/episodes?
  page=1&
  limit=20&
  sort=published_at:desc

Response (200):
{
  "data": [
    {
      "id": "uuid",
      "content_id": "uuid",
      "episode_number": "001",
      "season_number": "01",
      "title": "عنوان اپیزود",
      "description": "توضیح",
      "duration": 3600,
      "thumbnail_url": "...",
      "published_at": "2026-07-01T00:00:00Z",
      "explicit": false,
      "free_preview": false,
      "user_progress": {
        "current_position": 300000,
        "is_completed": false
      }
    }
  ],
  "pagination": {...}
}
```

### ۸.۴ Get Episode Details
```
GET /api/contents/{contentId}/episodes/{episodeId}

Response (200):
{
  "data": {
    "id": "uuid",
    "content_id": "uuid",
    "title": "عنوان اپیزود",
    "description": "...",
    "duration": 3600000,
    "file_url": "https://media-cdn.ir/...",
    "thumbnail_url": "...",
    "published_at": "2026-07-01T00:00:00Z",
    "creator": {
      "id": "uuid",
      "name": "نام creator"
    },
    "content": {
      "id": "uuid",
      "title": "نام پادکست"
    },
    "user_progress": {
      "current_position": 300000,
      "playback_speed": 1.0,
      "is_completed": false,
      "last_played_at": "2026-07-04T10:30:00Z"
    },
    "transcript_url": "https://..."
  }
}
```

### ۸.۵ Get Explore/Discover
```
GET /api/contents/explore?
  limit=5

Response (200):
{
  "data": {
    "trending": [
      { content objects }
    ],
    "featured": [
      { content objects }
    ],
    "recommended": [
      { content objects }
    ],
    "new_releases": [
      { content objects }
    ],
    "categories": [
      {
        "name": "education",
        "label": "آموزش",
        "icon": "..."
      }
    ]
  }
}
```

---

## ۹. Media Streaming Endpoints

### ۹.۱ Get Stream URL
```
GET /api/media/{episodeId}/stream?
  quality=auto&
  device_id=device_uuid

Query Parameters:
- quality: auto, low (64kbps), medium (128kbps), high (320kbps)
- device_id: Device identifier

Response (200):
{
  "data": {
    "manifest_url": "https://media-cdn.ir/stream/...",
    "format": "hls",
    "quality": "high",
    "bitrate": 320000,
    "duration": 3600000,
    "available_bitrates": [64000, 128000, 320000]
  }
}

Note: Manifest URL is HLS (m3u8) format
```

### ۹.۲ Track Playback Progress
```
POST /api/media/{episodeId}/progress

Request:
{
  "current_position": 300000,
  "playback_speed": 1.0,
  "device_id": "device_uuid",
  "app_version": "1.0.0"
}

Response (200):
{
  "data": {
    "id": "uuid",
    "episode_id": "uuid",
    "current_position": 300000,
    "updated_at": "2026-07-04T10:30:00Z"
  }
}

Note: This should be called every 10-30 seconds during playback
```

### ۹.۳ Mark as Completed
```
POST /api/media/{episodeId}/complete

Response (200):
{
  "data": {
    "episode_id": "uuid",
    "is_completed": true,
    "completed_at": "2026-07-04T10:30:00Z"
  }
}
```

### ۹.۴ Get Subtitles/Transcript
```
GET /api/media/{episodeId}/subtitles?
  format=vtt

Query Parameters:
- format: vtt, srt, json

Response (200):
{
  "data": {
    "url": "https://media-cdn.ir/subtitles/...",
    "format": "vtt",
    "language": "fa"
  }
}
```

---

## ۱۰. Download Endpoints

### ۱۰.۱ Start Download
```
POST /api/downloads

Request:
{
  "episode_id": "uuid",
  "quality": "medium",
  "auto_delete": true
}

Quality Options:
- low: 64kbps
- medium: 128kbps
- high: 320kbps

Response (201):
{
  "data": {
    "id": "uuid",
    "episode_id": "uuid",
    "status": "pending",
    "quality": "medium",
    "expires_at": "2026-08-04T00:00:00Z"
  }
}
```

### ۱۰.۲ Get Download Status
```
GET /api/downloads/{downloadId}

Response (200):
{
  "data": {
    "id": "uuid",
    "episode_id": "uuid",
    "status": "downloading",
    "progress_percentage": 45,
    "file_size": 52428800,
    "quality": "medium"
  }
}
```

### ۱۰.۳ Get All Downloads
```
GET /api/downloads?
  status=all&
  page=1&
  limit=20

Query Parameters:
- status: all, pending, downloading, completed, failed

Response (200):
{
  "data": [
    {
      "id": "uuid",
      "episode_id": "uuid",
      "title": "عنوان اپیزود",
      "status": "completed",
      "progress_percentage": 100,
      "file_size": 52428800,
      "quality": "medium",
      "downloaded_at": "2026-07-04T10:30:00Z",
      "expires_at": "2026-08-04T00:00:00Z"
    }
  ],
  "pagination": {...}
}
```

### ۱۰.۴ Cancel Download
```
DELETE /api/downloads/{downloadId}

Response (204): No content
```

---

## ۱۱. Payment Endpoints

### ۱۱.۱ Get Subscription Plans
```
GET /api/payments/subscription-plans

Response (200):
{
  "data": [
    {
      "id": "monthly",
      "name": "ماهانه",
      "duration_months": 1,
      "price": 49900,
      "currency": "IRR",
      "benefits": [
        "دانلود نامحدود",
        "بدون تبلیغ",
        "کیفیت بالا"
      ]
    },
    {
      "id": "yearly",
      "name": "سالانه",
      "duration_months": 12,
      "price": 499000,
      "currency": "IRR",
      "discount_percentage": 16
    }
  ]
}
```

### ۱۱.۲ Subscribe
```
POST /api/payments/subscribe

Request:
{
  "plan_id": "monthly",
  "payment_method": "card",
  "phone_number": "+989121234567",
  "return_url": "app://subscription-success"
}

Response (200):
{
  "data": {
    "subscription_id": "uuid",
    "status": "pending",
    "payment_url": "https://payment-gateway.ir/...",
    "order_id": "order_123"
  }
}
```

### ۱۱.۳ Verify Payment
```
POST /api/payments/verify

Request:
{
  "order_id": "order_123",
  "transaction_id": "txn_123"
}

Response (200):
{
  "data": {
    "subscription_id": "uuid",
    "status": "active",
    "expires_at": "2026-08-04T00:00:00Z",
    "auto_renew": true
  }
}
```

### ۱۱.۴ Cancel Subscription
```
POST /api/payments/cancel-subscription

Request:
{
  "subscription_id": "uuid",
  "reason": "Too expensive"
}

Response (200):
{
  "data": {
    "subscription_id": "uuid",
    "status": "cancelled",
    "cancelled_at": "2026-07-04T10:30:00Z",
    "refund_amount": 0
  }
}
```

### ۱۱.۵ One-time Purchase
```
POST /api/payments/purchase

Request:
{
  "content_id": "uuid",
  "payment_method": "card",
  "phone_number": "+989121234567"
}

Response (200):
{
  "data": {
    "purchase_id": "uuid",
    "amount": 9900,
    "currency": "IRR",
    "payment_url": "https://payment-gateway.ir/...",
    "order_id": "order_124"
  }
}
```

---

## ۱۲. Creator Endpoints

### ۱۲.۱ Apply for Creator Status
```
POST /api/creators/apply

Request:
{
  "display_name": "نام نمایش من",
  "description": "توضیح درباره من",
  "document_type": "national_id",
  "document_image_url": "https://..."
}

Response (201):
{
  "data": {
    "creator_id": "uuid",
    "status": "pending",
    "message": "درخواست شما ارسال شد"
  }
}
```

### ۱۲.۲ Create Content
```
POST /api/creators/contents

Request:
{
  "title": "نام پادکست جدید",
  "description": "توضیح",
  "type": "podcast",
  "category": "education",
  "cover_image_url": "https://...",
  "explicit": false,
  "requires_subscription": false
}

Response (201):
{
  "data": {
    "id": "uuid",
    "title": "نام پادکست جدید",
    "status": "draft",
    "created_at": "2026-07-04T10:30:00Z"
  }
}
```

### ۱۲.۳ Upload Episode
```
POST /api/creators/contents/{contentId}/episodes

Request (multipart/form-data):
{
  "title": "عنوان اپیزود",
  "description": "توضیح",
  "episode_number": "001",
  "season_number": "01",
  "file": <binary audio file>,
  "thumbnail": <binary image file>,
  "explicit": false
}

Response (201):
{
  "data": {
    "id": "uuid",
    "title": "عنوان اپیزود",
    "duration": 3600,
    "status": "processing",
    "message": "فایل در حال پردازش است"
  }
}
```

### ۱۲.۴ Publish Episode
```
PUT /api/creators/contents/{contentId}/episodes/{episodeId}/publish

Request:
{
  "publish_immediately": true,
  "or_schedule_for": "2026-07-05T10:00:00Z"
}

Response (200):
{
  "data": {
    "id": "uuid",
    "status": "published",
    "published_at": "2026-07-04T10:30:00Z"
  }
}
```

### ۱۲.۵ Get Creator Analytics
```
GET /api/creators/analytics/{contentId}?
  date_from=2026-07-01&
  date_to=2026-07-04&
  metric=plays

Query Parameters:
- date_from: Start date
- date_to: End date
- metric: plays, listeners, completion_rate, engagement

Response (200):
{
  "data": {
    "content_id": "uuid",
    "title": "نام محتوا",
    "total_plays": 5000,
    "total_unique_listeners": 2000,
    "average_completion_rate": 75.5,
    "episode_analytics": [
      {
        "episode_id": "uuid",
        "episode_number": "001",
        "plays": 500,
        "unique_listeners": 400,
        "completion_rate": 82.3,
        "date": "2026-07-04"
      }
    ],
    "graph_data": [
      {
        "date": "2026-07-01",
        "plays": 1000,
        "listeners": 800
      }
    ]
  }
}
```

---

## ۱۳. Playlist Endpoints

### ۱۳.۱ Create Playlist
```
POST /api/playlists

Request:
{
  "title": "نام playlist جدید من",
  "description": "توضیح",
  "is_public": false
}

Response (201):
{
  "data": {
    "id": "uuid",
    "title": "نام playlist جدید من",
    "is_public": false,
    "total_episodes": 0,
    "created_at": "2026-07-04T10:30:00Z"
  }
}
```

### ۱۳.۲ Add Episode to Playlist
```
POST /api/playlists/{playlistId}/episodes

Request:
{
  "episode_id": "uuid"
}

Response (201):
{
  "data": {
    "id": "uuid",
    "playlist_id": "uuid",
    "episode_id": "uuid",
    "position": 1
  }
}
```

### ۱۳.۳ Get Playlist Episodes
```
GET /api/playlists/{playlistId}/episodes?
  page=1&
  limit=20

Response (200):
{
  "data": [
    {
      "id": "uuid",
      "episode_id": "uuid",
      "position": 1,
      "title": "عنوان اپیزود",
      "duration": 3600,
      "content": {
        "title": "نام پادکست",
        "creator": "نام creator"
      }
    }
  ],
  "pagination": {...}
}
```

### ۱۳.۴ Reorder Playlist
```
PUT /api/playlists/{playlistId}/reorder

Request:
{
  "episodes": [
    { "episode_id": "uuid1", "position": 1 },
    { "episode_id": "uuid2", "position": 2 }
  ]
}

Response (200):
{
  "data": {
    "playlist_id": "uuid",
    "episodes_reordered": 2
  }
}
```

### ۱۳.۵ Delete Playlist
```
DELETE /api/playlists/{playlistId}

Response (204): No content
```

---

## ۱۴. Notification Endpoints

### ۱۴.۱ Register Push Token
```
POST /api/notifications/push-token

Request:
{
  "token": "push_notification_token",
  "device_type": "ios",
  "device_id": "device_uuid"
}

Response (201):
{
  "data": {
    "id": "uuid",
    "registered_at": "2026-07-04T10:30:00Z"
  }
}
```

### ۱۴.۲ Get Notifications
```
GET /api/notifications?
  page=1&
  limit=20&
  unread_only=false

Response (200):
{
  "data": [
    {
      "id": "uuid",
      "type": "new_episode",
      "title": "اپیزود جدید اضافه شد",
      "message": "...",
      "is_read": false,
      "created_at": "2026-07-04T10:30:00Z",
      "data": {
        "content_id": "uuid",
        "episode_id": "uuid"
      }
    }
  ],
  "pagination": {...}
}
```

### ۱۴.۳ Mark as Read
```
PATCH /api/notifications/{notificationId}/read

Response (200):
{
  "data": {
    "id": "uuid",
    "is_read": true,
    "read_at": "2026-07-04T10:30:00Z"
  }
}
```

### ۱۴.۴ Update Notification Preferences
```
PATCH /api/notifications/preferences

Request:
{
  "new_episode": true,
  "new_release": true,
  "follow": true,
  "message": false,
  "promotional": false
}

Response (200):
{
  "data": {
    "preferences": {...}
  }
}
```

---

## ۱۵. Error Codes

| Code | Meaning |
|------|---------|
| INVALID_REQUEST | درخواست نامعتبر است |
| UNAUTHORIZED | شما باید وارد شوید |
| FORBIDDEN | دسترسی رد شد |
| NOT_FOUND | منبع پیدا نشد |
| CONFLICT | تضاد یا تکراری |
| VALIDATION_ERROR | خطای تایید |
| RATE_LIMIT_EXCEEDED | حد مجاز درخواست‌ها تجاوز شد |
| INTERNAL_ERROR | خطای داخلی سرور |
| SERVICE_UNAVAILABLE | سرویس در دسترس نیست |

---

## ۱۶. Webhook Events (Future)

```
Events:
- subscription.activated
- subscription.expired
- subscription.cancelled
- episode.published
- episode.completed
- content.trending
- creator.verified
- payment.completed
- payment.failed
```

---

**تاریخ آخرین به‌روز رسانی:** ۱۴۰۵/۰۴/۱۳
**نسخه:** ۱.۰
**وضعیت:** API Specification Complete
