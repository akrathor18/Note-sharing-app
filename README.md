# StudyHub

A full-stack academic platform for collaborative note sharing, interactive quizzes, and learning analytics.

[![Live Demo](https://img.shields.io/badge/Live-studyhub--dev.web.app-blue?style=flat-square)](https://studyhub-dev.web.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)

---

## Features

**Notes System** — Upload, browse, and preview study materials (PDF, DOC, DOCX) with subject-based categorization, view tracking, and public/private visibility controls. Files stored via Cloudinary CDN.

**Quiz Engine** — Create MCQ quizzes with configurable difficulty levels (Easy / Medium / Hard), time limits, and multi-option questions. Instant scoring with detailed attempt history and running average tracking.

**Learning Analytics** — Daily streak tracking, activity timeline, aggregate stats (notes shared, quizzes taken, average scores), and per-user performance history via a dedicated `UserState` model.

**User Profiles** — Customizable profiles with bio, social links, profile pictures (Cloudinary-backed), tabbed views for authored notes/quizzes, and recent activity feed.

**Settings & Preferences** — Appearance (theme), notification preferences, privacy controls, security (password management), and account management including deletion.

---

## Architecture

The backend follows a strict **Service → Controller → Route** layered architecture with clear separation of concerns:

```
Route (request validation, auth middleware)
  → Controller (HTTP handling, response formatting)
    → Service (business logic, database operations)
```

Key architectural decisions:
- **Stateless JWT auth** with bcrypt password hashing and HTTP-only cookies
- **Dedicated analytics model** (`UserState`) decoupled from the `User` document for high-frequency stat updates without impacting user reads
- **Embedded activity log** on the user document for fast profile rendering without joins
- **Rate limiting** (100 req/15 min), **Helmet** security headers, and **CORS** whitelisting
- **Structured logging** via Winston + Morgan with Sentry error tracking
- **Cloudinary** integration for file and image storage with public ID tracking for cleanup
- **Database indexing** on high-query fields (`user`, `title` text index) for performant lookups

### Database Schema

Entity-relationship design with isolated collections for Users, Notes, Quizzes, Quiz Attempts, User States, Roles, and Links.

[View full schema on dbdiagram.io](https://dbdiagram.io/d/686783bbf413ba3508438d32)

<p align="center">
  <img width="1129" alt="StudyHub database schema" src="https://github.com/user-attachments/assets/5829ea96-98e7-436c-a095-f2c3f1512df7" />
</p>

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Frontend | React 19, Vite, Tailwind CSS |
| State Management | Zustand |
| Backend | Node.js, Express.js (ES Modules) |
| Database | MongoDB, Mongoose |
| File Storage | Cloudinary |
| Auth | JWT, bcrypt |
| Monitoring | Sentry, Winston, Morgan |
| Security | Helmet, express-rate-limit, CORS |
| Hosting | Firebase Hosting (client) |

---

## Project Structure

```
StudyHub/
├── backend/
│   ├── config/          # DB, Cloudinary, Swagger, Redis, Logger config
│   ├── controllers/     # HTTP request handlers
│   │   ├── auth.controller.js
│   │   ├── notes.controller.js
│   │   ├── quiz.controller.js
│   │   ├── user.controller.js
│   │   └── links.controller.js
│   ├── services/        # Business logic layer
│   ├── models/          # Mongoose schemas (User, Note, Quiz, QuizAttempt, UserState, Role, Link)
│   ├── middlewares/     # JWT verification, file upload (Multer + Cloudinary)
│   ├── routes/          # Express route definitions
│   ├── utils/           # Activity tracking, logging, score calculations
│   └── index.js         # Server entry point
│
├── client/
│   └── src/
│       ├── pages/       # Route-level views (Dashboard, Notes, Quiz, Profile, Settings, etc.)
│       ├── components/  # Feature-scoped UI components
│       │   ├── dashboard/    # Stats, streaks, quick actions, activity feed
│       │   ├── profile/      # Profile header, tabs, notes/quiz lists, achievements
│       │   ├── notes/        # Note cards, upload forms, preview
│       │   ├── quiz/         # Quiz cards, quiz screen, creation form
│       │   ├── settings/     # Account, security, privacy, appearance, notifications
│       │   └── feedback/     # User feedback components
│       ├── store/       # Zustand stores (userStore, noteStore, quizStore)
│       ├── auth/        # Protected route wrapper
│       ├── layouts/     # Shared layout components (Notes, Quizzes)
│       ├── config/      # Axios instance, static data
│       └── utils/       # Client-side utilities
│
└── types/               # Shared type definitions
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))
- Cloudinary account ([free tier](https://cloudinary.com/))
- Git

### 1. Clone

```bash
git clone https://github.com/akrathor18/Note-sharing-app.git
cd Note-sharing-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Overview

| Method | Endpoint | Description |
| :----- | :------- | :---------- |
| `POST` | `/api/auth/register` | User registration |
| `POST` | `/api/auth/login` | JWT authentication |
| `GET` | `/api/notes` | List all notes |
| `POST` | `/api/notes` | Upload a note (multipart) |
| `GET` | `/api/quiz` | List all quizzes |
| `POST` | `/api/quiz` | Create a quiz |
| `POST` | `/api/quiz/:id/attempt` | Submit quiz attempt |
| `GET` | `/api/users/profile` | Get user profile + stats |
| `PUT` | `/api/users/profile` | Update profile |
| `GET` | `/api/links` | Get user social links |

All protected endpoints require a valid JWT via `Authorization: Bearer <token>` or HTTP-only cookie.

---

## Roadmap

- [ ] Real-time collaboration (WebSockets)
- [ ] AI-powered quiz generation and note recommendations
- [ ] Advanced analytics dashboard with charts
- [ ] Gamification (badges, leaderboards, streak rewards)
- [ ] Commenting and discussion threads on notes
- [ ] Full-text search across notes and quizzes

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your-feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

MIT — see [LICENSE](./LICENSE) for details.

## Authors

- **Ashish Kumar** — [akrathor18](https://github.com/akrathor18)
- **Prince Rawat** — [Kashina69](https://github.com/Kashina69)
