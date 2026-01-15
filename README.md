# Trip Tracker 🧭

A full-stack trip and habit tracking application built with **React (CRA)**, **Node.js (Express + TypeScript)**, **MongoDB**, and **Docker**.

The project is fully Dockerized for consistent local development and production-ready deployment patterns.

---

## ✨ Features

- User authentication (JWT)
- Trip journal entries with photo uploads
- Habit tracking
- Secure, user-scoped data
- Dockerized client, server, and database
- Ready for cloud deployment (AWS / VPS / any Docker host)

---

## 🧱 Tech Stack

### Frontend
- React (Create React App)
- TypeScript
- React Router
- Fetch API
- Nginx (for production builds)

### Backend
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file uploads)

### Infrastructure
- Docker
- Docker Compose
- MongoDB container with persistent volume

---

## 📂 Project Structure

```
trip-tracker/
│
├── client/               # React frontend
│ ├── Dockerfile
│ ├── README.md
│ └── src/
│
├── server/               # Express backend
│ ├── Dockerfile
│ ├── README.md
│ └── src/
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Docker
- Docker Compose

### Start the full stack
```bash
docker compose up --build
```

Or run in the background:
``` bash
docker compose up -d
```

### Stop everything
```bash
docker compose down
```

---

## 🌐 Services & Ports

| Service     | URL                                            |
| ----------- | ---------------------------------------------- |
| Frontend    | [http://localhost](http://localhost)           |
| Backend API | [http://localhost:5000](http://localhost:5000) |
| MongoDB     | localhost:27017                                |

---

## 🔐 Environment Variables

Environment variables are **not committed**.

### Backend (server)

- `MONGO_URI`
- `JWT_SECRET`
- `PORT`

### Frontend (client)

- `REACT_APP_API_URL`
- `REACT_APP_PHOTO_URL`

> ⚠️ **Note:** `REACT_APP_*` variables are baked at build time. Changing them requires rebuilding the client image.

---

## 🐳 Why Docker?

Docker ensures:
- Identical environments across machines
- Zero local dependency issues
- Easy onboarding for collaborators
- Production-like setup locally

You can run the entire system with **one command**.

---

## 📦 Production Notes

- For production, image uploads should use **cloud storage (e.g. S3)** instead of local disk
- Secrets should be managed via a secrets manager or environment injection
- Frontend can be hosted separately (e.g. S3 + CDN) if desired
- Backend is compatible with any Docker-based host (ECS, VPS, etc.)

---

## 🛠️ Future Improvements

- Switch uploads to cloud storage
- CI/CD pipeline
- HTTPS & domain setup
- Monitoring and logging

---

## 👤 Author

Sara Husain

---

## 📄 License

MIT
