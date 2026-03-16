# 💼 HanaPwesto — Local Job & Livelihood Board

> "Work is near. Opportunity is here."

Full-stack web app connecting informal workers with local employers in Pampanga, Philippines.

## Tech Stack
- **Frontend:** Angular 17 (Standalone Components)
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT

## Quick Start

### Backend
```bash
cd backend
npm install
cp .env.example .env   # Fill in your MongoDB URI and JWT secret (run this node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
It instantly prints a secure random string like:
```
8f3a2c1e9b4d7f6a0e5c8b2d1a3f9e4c7b0d5a8e2f1c6b3d9a4e7f0c1b8d2a5)
npm run dev            # Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm start              # Runs on http://localhost:4200
```

## Features
- Worker registration with skill tags (no resume needed)
- Employer job posting in under 2 minutes
- Barangay-first job matching
- Application management with accept/reject/complete flow
- Community trust ratings after completed jobs
- Real-time notifications
- Mobile-responsive design

## API Base URL
`http://localhost:5000/api`

Routes: `/auth`, `/jobs`, `/users`, `/applications`, `/notifications`, `/ratings`

## Production Build
```bash
cd frontend && ng build --configuration production
```

*Built for Pampanga's informal workers 🇵🇭*
