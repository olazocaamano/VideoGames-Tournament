# AI SUPPORT REPORT - Sprint 5

This document describes how AI assistance contributed to the development process.

---

## 1. Tournament Registration Issue

**Prompt:**
"POST http://localhost:5000/api/register 404 (Not Found)"

**IA Support:**
Identified incorrect endpoint usage and suggested:
- Verifying backend routes
- Correcting endpoint to `/api/tournaments/register`
- Ensuring route is mounted in `index.js`

---

## 2. Games Not Loading

**Prompt:**
"Cannot GET /api/games"

**IA Support:**
Detected missing route registration and suggested:
- Adding:
```js
app.use("/api/games", require("./routes/gamesRoutes"));