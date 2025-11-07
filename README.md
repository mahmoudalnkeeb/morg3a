# Morg3a Backend

**Morg3a** is a modular, high-performance e-learning backend designed for the Egyptian secondary education system. It enables teachers to manage lessons efficiently and helps students learn effectively. The platform is powered by **Node.js**, **Express**, and **TypeScript**, following clean architecture principles.

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture Overview](#architecture-overview)
* [Environment Variables](#environment-variables)
* [Setup & Running Locally](#setup--running-locally)
* [Database & Migrations](#database--migrations)
* [Authentication & Authorization](#authentication--authorization)
* [Logging](#logging)
* [Example .env](#example-env)
* [Useful Scripts](#useful-scripts)
* [License](#license)
* [Contact](#contact)

---

## Overview

* **Entry point:** `src/server.ts`
* **API base path:** `/api`
* **Configuration validation:** Handled by Zod (`src/config/env.ts`)
* **Database:** PostgreSQL via Drizzle ORM
* **Cache:** Redis for ephemeral data (e.g., OTPs)
* **Storage:** S3-compatible (supports MinIO)
* **Logging:** Winston
* **Notifications:** NotificationAPI SDK

---

## Features

* Student registration, profile, and enrollment management
* Teacher and staff management with roles (teacher, admin, support_agent)
* Courses, lessons, documents, and videos management
* Quizzes and question bank system
* Support ticketing system with attachments and categories
* OTP-based authentication and notifications
* File uploads to S3/MinIO

---

## Tech Stack

* **Node.js** 20
* **Express** 5
* **TypeScript** 5
* **PostgreSQL** + **Drizzle ORM**
* **Redis** (via node-redis)
* **Zod** for runtime validation
* **AWS S3 SDK** (MinIO-compatible)
* **Winston** for structured logging
* **JWT** for authentication

---

## Architecture Overview

```
src/
├── app.ts              # Express configuration
├── server.ts           # Application entry point
├── config/             # Environment, logger, S3, Redis, notifications
├── db/                 # Database connection & schema
├── lib/                # Helpers (JWT, caching)
├── middlewares/        # Auth, authorization, error handling
├── modules/            # Feature-based modules
├── types/              # Shared TypeScript interfaces
└── utils/              # Common utilities (messages, errors, etc.)
```

Each module follows a **layered structure**:

```
controllers → services → repositories → DTOs → routes
```

---

## Environment Variables

Environment validation is enforced at startup via Zod.

### Required

```
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
S3_ENDPOINT
S3_REGION
S3_ACCESS_KEY
S3_SECRET_KEY
S3_BUCKET
N_CLIENT_ID
N_CLIENT_SECRET
N_BASE_URL
N_OTP_TEMPLATE_ID
REDIS_URL
PLATFORM_NAME
```

### Optional / Defaults

```
NODE_ENV=development
PORT=3000
BASE_URL=http://localhost:3000
CORS_ORIGIN=*
S3_PUBLIC_ENDPOINT=http://localhost:9000
```

If any required variable is missing, the app logs detailed validation errors and exits.

---

## Setup & Running Locally

### Development

```bash
npm install
npm run dev
```

### Production

```bash
npm run build
npm run start:prod
```

### Database Migrations

```bash
npm run migrate
```

### Docker Example

```bash
docker-compose up -d
docker-compose logs -f api
docker-compose down
```

---

## Database & Migrations

* **ORM:** Drizzle ORM using PostgreSQL `Pool`
* **Schemas:** `src/db/schema/`
* **Command:** `npm run migrate` (runs drizzle-kit migrations)

---

## Authentication & Authorization

* **JWT Utilities:** `src/lib/jwt.ts`

  * Access Token: 15m expiry
  * Refresh Token: 7d expiry

* **Middlewares:**

  * `authenticate`: Verifies JWT
  * `authorize`: Enforces role-based access

* **Roles:** `student`, `teacher`, `support_agent`, `admin`

## Logging

* **Library:** Winston
* **Location:** `src/config/logger.ts`
* Logs output to both `stdout` and `./logs/output.log`
* The logs directory is created automatically.

---

## Example .env

```
PLATFORM_NAME=morg3a
NODE_ENV=development
PORT=3000

ACCESS_TOKEN_SECRET=replace_with_a_strong_secret
REFRESH_TOKEN_SECRET=replace_with_a_strong_secret

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=morg3a

REDIS_URL=redis://localhost:6379

S3_ENDPOINT=http://localhost:9000
S3_REGION=us-east-1
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=morg3a-files
S3_PUBLIC_ENDPOINT=http://localhost:9000

N_CLIENT_ID=notification_client_id
N_CLIENT_SECRET=notification_client_secret
N_BASE_URL=https://api.notificationapi.com
N_OTP_TEMPLATE_ID=otp_template_id
```

---

## Useful Scripts

```bash
npm run dev         # Run development server with hot reload
npm run build       # Compile TypeScript + resolve aliases
npm start           # Start built server
npm run start:prod  # Build then start server
npm run migrate     # Run database migrations
```

---

## License

Copyright (c) 2025 Mahmoud Alnakeeb
All rights reserved.

This source code is made publicly available **for review and educational reference only**.
Permission is granted **to view and read** the code.
Use, modification, distribution, or derivative works of any kind are **strictly prohibited** without written consent.

See [LICENSE](./LICENSE) for full terms.
For permissions, contact **[mahmoudalnakeeb@outlook.com](mailto:mahmoudalnakeeb@outlook.com)**.
