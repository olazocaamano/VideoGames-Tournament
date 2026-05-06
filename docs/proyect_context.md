# Project Context

This is a full-stack tournament system built with:

Frontend:
- React
- Axios API layer

Backend:
- Node.js
- Express
- MySQL

Main Features:
- Tournament CRUD
- Player registration
- Activity logging
- Admin control panel

Important Endpoints:
- GET /api/tournaments
- POST /api/tournaments
- POST /api/tournaments/register
- PUT /api/tournaments/:id/status

Architecture:
Frontend uses services layer to communicate with backend.
Backend follows MVC pattern.