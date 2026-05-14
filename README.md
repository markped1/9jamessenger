# 9ja Messenger

A world-class, production-ready, cross-platform messaging ecosystem for Nigeria and the World.

**Designed By Thompson Obosa**

## 🚀 Architecture

This project is built as a **Turborepo monorepo**, sharing logic and UI components across all platforms.

- **`apps/web`**: Next.js 14 web application.
- **`apps/mobile`**: React Native (Expo) application for Android and iOS.
- **`apps/admin`**: Vite-based moderation and analytics dashboard.
- **`apps/api`**: NestJS microservice for real-time messaging, AI, and auth.
- **`packages/ui`**: Shared "African Modern" design system (Glassmorphism).
- **`packages/core`**: Shared business logic, types, and validation.

## ✨ Key Features

- **Real-time Chat**: 1:1, Groups, and Communities via Socket.IO.
- **African Modern UI**: Premium aesthetics inspired by Nigerian identity.
- **Firebase Auth**: Secure phone, email, and social login.
- **AI Assistant**: Multilingual support (English, Pidgin, Yoruba, Hausa, Igbo, Edo).
- **Admin Control**: Complete dashboard for moderation and revenue analytics.
- **Scalable**: Dockerized architecture ready for Cloud deployment.

## 🛠 Setup & Running

### Prerequisites
- Node.js >= 18
- pnpm (Recommended)
- Docker (for database and redis)

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```
This will start:
- Web App: `http://localhost:3000`
- Admin Dashboard: `http://localhost:5173`
- Backend API: `http://localhost:3001`
- Mobile Expo: Metro bundler for testing

### Deployment
Use the included `docker-compose.yml` for localized production deployment:
```bash
docker-compose up --build
```

## 🛡 Security
- Firebase Authentication for identity management.
- End-to-End Encryption support structure ready.
- Anti-spam and AI-powered moderation.

---
© 2026 9ja Messenger. Built by Antigravity AI.
