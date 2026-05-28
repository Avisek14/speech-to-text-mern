# 🎙️ VoiceScript — Speech to Text App

<div align="center">

![VoiceScript Banner](https://img.shields.io/badge/VoiceScript-Speech%20To%20Text-7c3aed?style=for-the-badge&logo=microphone&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-speech--to--text--mern--wheat.vercel.app-06b6d4?style=for-the-badge)](https://speech-to-text-mern-wheat.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Avisek14-a855f7?style=for-the-badge&logo=github)](https://github.com/Avisek14/speech-to-text-mern)
[![Portfolio](https://img.shields.io/badge/Portfolio-Avisek%20Sahoo-3b82f6?style=for-the-badge)](https://avisek14.github.io/Avisek-portfolio/)

**A full-stack MERN application that converts speech to text in real-time using Groq Whisper AI — with JWT authentication, transcription history, and a beautiful glassmorphism UI.**

</div>

---

## 🎯 What is VoiceScript?

VoiceScript is an AI-powered Speech-to-Text web application. Simply upload an audio file or record directly from your browser microphone — and get an instant, accurate text transcription powered by Groq's Whisper large-v3 model. All your transcriptions are saved securely and accessible anytime after login.

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure Register & Login system
- 🎙️ **Live Mic Recording** — Record directly from browser using MediaRecorder API
- 📁 **File Upload** — Upload MP3, WAV, M4A, OGG, WEBM audio files
- 🤖 **Groq Whisper AI** — Industry-leading speech recognition (whisper-large-v3)
- 📝 **Transcription History** — View all past transcriptions per user
- 🗑️ **Delete Transcriptions** — Remove unwanted transcriptions
- 📋 **Copy to Clipboard** — One-click copy transcription text
- 🛡️ **Protected Routes** — User-wise data isolation
- 🔔 **Toast Notifications** — Real-time feedback for all actions
- 📱 **Fully Responsive** — Works perfectly on mobile and desktop
- 🎨 **Glassmorphism UI** — Modern dark theme with animated blobs

---

## 🛠️ Tech Stack

### Frontend
| Technology | Usage |
|---|---|
| React.js + Vite | UI Framework |
| Tailwind CSS | Styling |
| Axios | API Calls |
| React Hot Toast | Notifications |
| MediaRecorder API | Browser Audio Recording |
| Context API | Global State Management |

### Backend
| Technology | Usage |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Server Framework |
| MongoDB Atlas | Cloud Database |
| Mongoose | ODM |
| JWT (jsonwebtoken) | Authentication |
| bcryptjs | Password Hashing |
| Multer | File Upload Handling |
| Groq SDK | Whisper AI Transcription |

### Deployment
| Platform | Usage |
|---|---|
| Vercel | Frontend Hosting |
| Render | Backend Hosting |
| MongoDB Atlas | Cloud Database |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas Account
- Groq API Key ([console.groq.com](https://console.groq.com))
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Avisek14/speech-to-text-mern.git
cd speech-to-text-mern
```

**2. Setup Backend**
```bash
cd server
npm install
```

Create `.env` file in `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_jwt_secret_key
```

Start server:
```bash
npm run dev
```

**3. Setup Frontend**
```bash
cd client
npm install
```

Create `.env` file in `client/`:
```env
VITE_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

**4. Open in Browser**
```
http://localhost:5173
```

---

## 📁 Project Structure

```
speech-to-text-mern/
├── client/                        # React Frontend (Vite)
│   ├── public/
│   │   └── favicon.svg            # Custom mic favicon
│   └── src/
│       ├── components/
│       │   ├── UploadSection.jsx  # File upload + mic recording
│       │   ├── TranscriptionResult.jsx  # Show transcription output
│       │   ├── TranscriptionHistory.jsx # History cards with delete
│       │   └── Footer.jsx         # Footer with social links
│       ├── context/
│       │   └── AuthContext.jsx    # Global auth state
│       ├── pages/
│       │   ├── Home.jsx           # Main dashboard
│       │   ├── Login.jsx          # Login page
│       │   └── Register.jsx       # Register page
│       ├── App.jsx                # Route management
│       ├── main.jsx               # Entry point
│       └── index.css              # Global styles
│
└── server/                        # Node.js + Express Backend
    ├── config/
    │   └── db.js                  # MongoDB connection
    ├── controllers/
    │   ├── authController.js      # Register, Login logic
    │   └── transcriptionController.js  # Transcribe, Get, Delete
    ├── middleware/
    │   ├── authMiddleware.js      # JWT protect middleware
    │   └── upload.js              # Multer file upload config
    ├── models/
    │   ├── User.js                # User schema
    │   └── Transcription.js       # Transcription schema
    ├── routes/
    │   ├── authRoutes.js          # Auth API routes
    │   └── transcriptionRoutes.js # Transcription API routes
    ├── uploads/                   # Temp audio storage
    ├── .env                       # Environment variables
    └── server.js                  # Express entry point
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Transcription
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/transcribe` | Upload & transcribe audio | ✅ |
| GET | `/api/transcriptions` | Get user transcriptions | ✅ |
| DELETE | `/api/transcriptions/:id` | Delete a transcription | ✅ |

---

## 🎯 How to Use

1. **Register / Login** — Create your account or login
2. **Upload Audio** — Drag & drop or click to browse audio file
3. **Or Record** — Click the mic button and speak
4. **Get Transcription** — AI transcribes your audio instantly
5. **View History** — All transcriptions saved in your account
6. **Copy or Delete** — Manage your transcriptions easily

---

## 🌐 Live Links

| Service | URL |
|---|---|
| 🌐 Frontend | [speech-to-text-mern-wheat.vercel.app](https://speech-to-text-mern-wheat.vercel.app) |
| ⚙️ Backend | [voicescript-backend.onrender.com](https://voicescript-backend.onrender.com) |
| 💾 Database | MongoDB Atlas (Cloud) |

---

## 👨‍💻 Developer

<div align="center">

**Avisek Sahoo**
Full Stack Developer

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-06b6d4?style=flat-square)](https://avisek14.github.io/Avisek-portfolio/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-3b82f6?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/avisek-sahoo-907186341/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-a855f7?style=flat-square&logo=github)](https://github.com/Avisek14)
[![Email](https://img.shields.io/badge/Email-Contact-22c55e?style=flat-square&logo=gmail)](mailto:sahoo143avisek@gmail.com)

</div>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by **Avisek Sahoo** © 2026

⭐ **Star this repo if you liked it!** ⭐

</div>