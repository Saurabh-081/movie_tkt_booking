# Booking Service

Simple booking microservice (file-backed) refactored with routes/controllers/services, validation, logging and Docker support.

Quick start

1. Copy `.env.example` to `.env` and edit if needed.
2. Install deps: `npm install`
3. Run in dev: `npm run dev`
4. Start production: `npm start`

Endpoints

- `GET /health` - health check
- `GET /bookings` - list bookings (query `?userEmail=` optional)
- `POST /bookings` - create booking
- `GET /bookings/:id` - get booking by id
- `GET /bookings/user/:email` - bookings by user email

Notes

- This service uses `bookings.json` in the repo root as a simple data store. Replace with a DB for production.
