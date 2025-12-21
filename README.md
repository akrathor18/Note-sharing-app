# 📚 StudyHub – Note Sharing & Quiz Platform

StudyHub is a full‑stack web platform built **for students, by students**. It allows users to **share study notes**, **create and attempt quizzes**, and **track learning activity** in one place. The project focuses on real‑world product problems like authentication, validation, responsive UI, and clean backend architecture.

🌐 **Live Demo:** [https://studyhub-dev.web.app/](https://studyhub-dev.web.app/)

💻 **GitHub Repository:** [https://github.com/akrathor18/Note-sharing-app](https://github.com/akrathor18/Note-sharing-app)

---

## 🚀 Features

### 🔐 Authentication & User Management

* Secure login & registration
* JWT-based authentication with protected routes
* Profile management with editable bio and social links (max 5 links)

### 📄 Notes Module

* Upload and share notes (PDF, DOC, DOCX)
* Notes linked to subjects
* View and manage your own uploaded notes
* Cloudinary integration for file storage

### 🧠 Quiz Module

* Create quizzes with multiple‑choice questions
* Attempt quizzes and get instant scores
* Track total quizzes taken and average score
* Question count optimization using MongoDB aggregation

### 📊 Activity & Streak Tracking

* Recent activity timeline (notes, quizzes)
* Daily login streak logic (Duolingo‑style)
* Highest streak tracking
* User analytics like total notes, quizzes created, quizzes taken

### 📱 Responsive UI

* Fully responsive design (desktop & mobile)
* Mobile‑friendly activity cards
* Dark‑theme focused UI

---

## 🛠️ Tech Stack

### Frontend

* React
* Tailwind CSS
* Zustand (state management)
* React Router
* react-toastify (notifications)

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer + Cloudinary (file uploads)

### Deployment

* Frontend: Firebase Hosting
* Backend: Render / Node hosting
---
## 🗄️ Database Design

StudyHub was designed with a structured database schema before and during development.

- Separate collections for core entities (Users, Notes, Quizzes)
- Analytics and streaks handled via a dedicated UserState model
- Quiz attempts stored independently to support multiple attempts per user
- Activity tracking designed for scalability and future analytics

📊 Database Diagram:  
https://dbdiagram.io/d/686783bbf413ba3508438d32

<img width="1129" height="896" alt="studyhub schema design" src="https://github.com/user-attachments/assets/5829ea96-98e7-436c-a095-f2c3f1512df7" />
---

## 🧩 Project Structure (Simplified)

```
Note-sharing-app/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── client/
│   ├── components/
│   ├── pages/
│   ├── store/ (Zustand)
│   ├── utils/
│   └── App.jsx
└── README.md
```

---

## 🧠 Key Learnings

* Designing **streak logic** that updates only once per day
* Preventing invalid data with **frontend + backend validation**
* Using **MongoDB aggregation** for computed fields (e.g., question count)
* Fixing real‑world **responsive UI issues**
* Managing complex user state and activity tracking
* Deploying a full‑stack project to production

---

## 🧪 Validation & UX Highlights

* Prevent saving empty social links
* Limit social links to maximum 5
* URL format validation (http / https)
* Mobile‑first layout fixes for activity cards
* Toast‑based feedback for all user actions

---

## 📌 Future Improvements

* Advanced analytics dashboard
* Search & filter for notes and quizzes
* Public user profiles
* Bookmark / favorite notes
* Admin moderation tools

---

## 👨‍💻 Author

**Ashish Kumar**
Diploma Computer Science Engineering Student
Aspiring Full‑Stack Web Developer (MERN)

GitHub: [https://github.com/akrathor18](https://github.com/akrathor18)

---

## ⭐ Feedback

If you have suggestions or feedback, feel free to open an issue or reach out.
If you like this project, consider giving it a ⭐ on GitHub!

---

> *Built with a focus on real‑world problems, not just tutorials.*
