# Mongo-React-NodeJS-Template

This is a full-stack **MongoDB + Express + React + Node.js (MERN)** template with **Docker support**. It provides a boilerplate to quickly set up a scalable web application with **live reloading** in both frontend and backend.

## 🚀 Technologies Used

### **Frontend:**
- React (Vite + TypeScript)
- React Router (for navigation)
- Docker (containerized environment)

### **Backend:**
- Node.js (Express.js)
- MongoDB (NoSQL database)
- Mongoose (ODM for MongoDB)
- WebSockets (for real-time updates)
- Nodemon (for live backend reloading)
- Docker (for containerized development)

### **DevOps:**
- Docker & Docker Compose (for easy setup and deployment)
- Volume Mounting (for live code changes)

---

## 📦 Folder Structure
```plaintext
📂 project-root
├── 📂 backend  # Express.js API with MongoDB
│   ├── src/models  # Mongoose schemas
│   ├── src/routes  # API routes
│   ├── Dockerfile  # Backend Docker setup
│   ├── package.json  # Dependencies
├── 📂 frontend  # React frontend (Vite + TypeScript)
│   ├── src/components  # Reusable UI components
│   ├── src/pages  # Page components
│   ├── Dockerfile  # Frontend Docker setup
│   ├── package.json  # Dependencies
├── 📄 docker-compose.yml  # Manages frontend, backend & database
├── 📄 .gitignore  # Files to ignore in Git
└── 📄 README.md  # Project documentation
```

---

## 🔥 Getting Started
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/Mongo-React-NodeJs-Template.git
cd Mongo-React-NodeJs-Template
```

### **2️⃣ Start with Docker** (Recommended)
```sh
docker-compose up --build
```
This will start the **frontend, backend, and MongoDB**.

### **3️⃣ Access the Application**
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:8080](http://localhost:8080)
- **Mongo Express:** [http://localhost:8081](http://localhost:8081)

---

## 🔧 Development Workflow
### **Frontend Development**
```sh
cd frontend
npm run dev
```

### **Backend Development**
```sh
cd backend
npm run dev
```

**Live Reloading:** Both frontend & backend update automatically when files change.

---

## 🛠 API Endpoints (Example)
| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| GET    | `/api/users`   | Get all users       |
| POST   | `/api/friends` | Send friend request |
| DELETE | `/api/friends` | Remove friend       |

---

## 🚀 Future Improvements
- Authentication (JWT)
- User profiles
- Pagination & search

---

## 📜 License
This project is **open-source**. Feel free to use and modify it!
