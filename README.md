# 📚 StudyHub – Note Sharing & Quiz Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-orange?style=flat)](https://github.com/pmndrs/zustand)

> **Empowering students to share, learn, and grow together.**

StudyHub is a feature-rich, full-stack web platform designed to solve real-world academic challenges. It enables students to seamlessly share study resources, create interactive quizzes, and maintain learning consistency through daily streak tracking and progress analytics.

🌐 **Live Demo:** [https://studyhub-dev.web.app/](https://studyhub-dev.web.app/)

---

## ✨ Key Features

### 🔐 Secure Authentication
- **Identity Management:** Robust login and registration system.
- **JWT Protection:** Secure API communication with protected routes.
- **Profile Customization:** Personalize your presence with bios and social links.

### 📄 Intelligent Note Sharing
- **Multi-format Support:** Share resources in PDF, DOC, and DOCX formats.
- **Organized Subjects:** Categorize notes by subject for easy discoverability.
- **Cloud-Powered:** Reliable file storage and delivery via Cloudinary.

### 🧠 Interactive Quizzes
- **Dynamic Creation:** Build custom multiple-choice quizzes for any subject.
- **Instant Result:** Real-time scoring and feedback upon attempt.
- **Performance Tracking:** Monitor average scores and progress over time.

### 📊 Gamified Learning
- **Activity Timeline:** Visualize your recent contributions and attempts.
- **Daily Streaks:** Stay motivated with a Duolingo-style streak system.
- **Analytics Dashboard:** Overview of total notes shared and quizzes completed.

---

## 🏗️ Architecture & Folder Structure

The project follows a modular and decoupled architecture, ensuring scalability and ease of maintenance.

### File Structure Overview
```text
Note-sharing-app/
├── 📁 backend/           # Node.js & Express API
│   ├── 📁 controllers/   # Request handlers & logic
│   ├── 📁 middlewares/   # JWT verification & file upload logic
│   ├── 📁 models/        # Mongoose database schemas
│   ├── 📁 routes/        # API endpoint definitions
│   ├── 📁 services/      # Business logic isolation layer
│   └── 📄 index.js       # Entry point
├── 📁 client/            # React & Vite Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/ # Reusable UI components
│   │   ├── 📁 pages/      # Route-level views
│   │   ├── 📁 store/      # Zustand state management
│   │   └── 📁 config/     # Axios & environment setup
└── 📄 README.md          # Project documentation
```
---

## 🗄️ Database Design

StudyHub was designed with a structured database schema to handle complex relationships between users, study materials, and learning analytics.

- **Entity Isolation:** Separate collections for Users, Notes, and Quizzes to maintain data integrity.
- **Analytics & Tracking:** Dedicated `UserState` model for high-performance streak and activity tracking.
- **Scalable Attempts:** Quiz results are stored independently, allowing for detailed historical performance analysis.

📊 **Database Diagram:** [View on dbdiagram.io](https://dbdiagram.io/d/686783bbf413ba3508438d32)

<p align="center">
  <img width="1129" alt="studyhub schema design" src="https://github.com/user-attachments/assets/5829ea96-98e7-436c-a095-f2c3f1512df7" />
</p>

---

## 🔧 Installation & Setup

Follow these steps to get your local development environment running.

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local instance or Atlas)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/akrathor18/Note-sharing-app.git
cd Note-sharing-app
```

### 2. Configure Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```
Start the server:
```bash
npm run dev
```

### 3. Configure Frontend
```bash
cd ../client
npm install
```
Create a `.env` file in the `client/` directory:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```
Start the app:
```bash
npm run dev
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS, Vite |
| **State Management** | Zustand |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **File Storage** | Cloudinary |
| **Authentication** | JSON Web Tokens (JWT) |

---

## 🤝 Contributing

We welcome contributions! To contribute:
1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License & Credits

Distributed under the **MIT License**. See `LICENSE` for more information.

### Authors
- **Ashish Kumar** - *Project Lead* - [akrathor18](https://github.com/akrathor18)
- **Prince Rawat** - *Contributor* - [Kashina69](https://github.com/Kashina69)

---

## ⭐ Support the Project

If you find this project helpful, please consider giving it a **Star**! Your support keeps the development alive.

[⭐ Star on GitHub](https://github.com/akrathor18/Note-sharing-app)
