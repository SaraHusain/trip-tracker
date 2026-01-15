# Trip Tracker – Server

Express + TypeScript backend for the Trip Tracker application.

---

## 🧱 Stack
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- Multer

---

## 🚀 Development

Run via Docker (recommended):
```bash
docker compose up
```

---

## 🔐 Environment Variables

```ev
MONGO_URI=mongodb://mongo:27017/triptracker
JWT_SECRET=your_secret
PORT=5000
```

---

## 📂 Uploads

- Files are stored locally in `/app/uploads` (Docker volume)
- For production, cloud storage is recommended
