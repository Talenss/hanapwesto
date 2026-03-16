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
cp .env.example .env   # Fill in your MongoDB URI and JWT secret
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
