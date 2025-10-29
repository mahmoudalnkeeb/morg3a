# Morg3a Backend

**Morg3a** is a comprehensive e-learning platform backend that helps teachers organize their lessons and enables students to learn more effectively. This is the REST API backend built with Node.js, Express, and TypeScript.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Structure](#api-structure)
- [Database Schema](#database-schema)
- [Docker Deployment](#docker-deployment)
- [Development](#development)
- [License](#license)
- [Contact](#contact)

## Features

### Student Management
- Student registration and profile management
- Student enrollment by grade
- Parent contact information tracking
- Location tracking (country, city)

### Course & Lesson Management
- Course creation and organization
- Lesson management with ordering
- Video content hosting
- Interactive quizzes
- Document management (lesson documents, summaries/mozakrat, notes/mol5as)

### Staff Management
- Multi-role system: Teacher, Support Agent, Admin
- Staff authentication and authorization
- Role-based access control

### Grade Management
- Grade levels with specialization tracking
- Year-based organization
- Active/inactive status management

### Support System
- Ticket creation and management
- Categorized tickets (technical, payment, general)
- Ticket status tracking (open, in progress, closed)
- Image attachments support

### FAQ System
- Organized FAQ folders
- Questions and answers management
- Tag-based organization
- View tracking

## Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Express.js 5.x
- **Language**: TypeScript 5.9
- **Database**: PostgreSQL 18
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **File Storage**: AWS S3 / MinIO
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, bcrypt
- **Logging**: Winston
- **Notifications**: NotificationAPI
- **Containerization**: Docker & Docker Compose

## Architecture

The project follows a modular architecture pattern:

```
src/
├── app.ts              # Express app configuration
├── server.ts           # Server entry point
├── config/             # Configuration management
│   ├── env.ts         # Environment variables
│   ├── logger.ts      # Winston logger setup
│   ├── s3.ts          # S3/MinIO configuration
│   └── notification-api.ts
├── db/                 # Database layer
│   └── schema/        # Drizzle schema definitions
├── modules/            # Feature modules
│   ├── auth/          # Authentication
│   ├── students/      # Student management
│   ├── staff/         # Staff management
│   ├── courses/       # Course management
│   ├── lessons/       # Lesson management
│   ├── quizzes/       # Quiz management
│   ├── grades/        # Grade management
│   └── support/       # Support tickets
├── middlewares/        # Express middlewares
│   ├── error.ts       # Error handling
│   └── notFound.ts    # 404 handler
└── utils/              # Utility functions
    ├── errors.ts      # Error utilities
    ├── messages.ts    # Message utilities
    ├── notifications.ts
    ├── otp.ts         # OTP generation
    ├── s3.ts          # S3 operations
    └── strings.ts     # String utilities
```

Each module follows a layered architecture:
- **Controller**: Handles HTTP requests/responses
- **Service**: Business logic
- **Repository**: Data access layer
- **DTOs**: Data validation schemas (Zod)
- **Routes**: Express route definitions

##  Prerequisites

- Node.js 20+ and npm
- PostgreSQL 18+
- Docker & Docker Compose (optional, for containerized deployment)
- MinIO or AWS S3 (for file storage)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahmoudalnkeeb/morg3a.git
   cd morg3a-be
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Configuration](#configuration))

4. **Set up the database**
   ```bash
   npm run migrate
   ```

## Configuration

Create a `.env` file in the root directory with the following variables:

### Application
```env
NODE_ENV=development
PORT=3000
BASE_URL=http://localhost:3000
PLATFORM_NAME=morg3a
CORS_ORIGIN=*
```

### Database
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=morg3a
```

### File Storage (S3/MinIO)
```env
S3_ENDPOINT=http://localhost:9000
S3_REGION=us-east-1
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=morg3a-files
S3_USE_SSL=false
```

### Notifications (NotificationAPI)
```env
N_CLIENT_ID=your_notification_client_id
N_CLIENT_SECRET=your_notification_client_secret
N_BASE_URL=https://api.notificationapi.com
N_OTP_TEMPLATE_ID=your_otp_template_id
```

##  Running the Application

### Development Mode
```bash
npm run dev
```
This runs the server with hot-reload using `tsx watch`.

### Production Mode
```bash
npm run start:prod
```
This builds the TypeScript code and starts the production server.

### Manual Build & Start
```bash
npm run build
npm start
```

### Database Migrations
```bash
# Generate new migration
npm run migrate
```

## API Structure

The API is organized under the `/api` prefix:

### Available Endpoints

- **Health Check**: `GET /health`
- **Students**: `/api/students`
- **Staff**: `/api/staff`
- **Courses**: `/api/courses`
- **Lessons**: `/api/lessons`
- **Quizzes**: `/api/quizzes`
- **Grades**: `/api/grades`
- **Support**: `/api/support`

### API Documentation

See `docs/data-models.md` for detailed DTO specifications and data models.

## Database Schema

The database includes the following main entities:

- **students** - Student information and enrollment
- **staff** - Staff members (teachers, support agents, admins)
- **grades** - Grade levels and specializations
- **courses** - Course information and metadata
- **lessons** - Lessons within courses
- **videos** - Video content for lessons
- **documents** - Documents (lessons, mozakrat, mol5as)
- **quizzes** - Quiz questions and answers
- **support_tickets** - Support ticket management
- **faq_folders** - FAQ organization
- **faq_questions** - FAQ questions and answers

See `src/db/schema/` for detailed schema definitions.

### Enums

- **Staff Roles**: `teacher`, `support_agent`, `admin`
- **Document Types**: `lesson`, `mozakra`, `mol5as`
- **Ticket Status**: `open`, `in_progress`, `closed`
- **Ticket Category**: `technical`, `payment`, `general`

## Docker Deployment

The project includes Docker Compose configuration for easy deployment:

### Using Docker Compose

1. **Set up environment variables** in `.env`

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

This will start:
- PostgreSQL database
- MinIO object storage (ports 9000 for the server, and 9001 for web dashboard)
- API server (port 3000)

3. **View logs**
   ```bash
   docker-compose logs -f api
   ```

4. **Stop services**
   ```bash
   docker-compose down
   ```

### Docker Image

Build the Docker image:
```bash
docker build -t morg3a-api .
```

Run the container:
```bash
docker run -p 3000:3000 --env-file .env morg3a-api
```

## Development

### Project Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run start:prod` - Build and start production server
- `npm run migrate` - Generate and run database migrations

### Code Structure

- **TypeScript**: Strict type checking enabled
- **Path Aliases**: Use `@/` prefix for imports from `src/`
- **Linting**: Follow TypeScript best practices
- **Error Handling**: Centralized error middleware
- **Logging**: Winston logger with file and console transports

##  License

consider checking the project [LICENSE](LICENSE)