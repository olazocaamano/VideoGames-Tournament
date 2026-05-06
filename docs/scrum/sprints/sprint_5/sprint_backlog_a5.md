# SPRINT 5 BACKLOG

## Sprint Goal
Fix system integration issues and implement tournament registration with admin statistics.

---

## User Stories

- US-07: Player can register to a tournament
- US-08: Admin can visualize system statistics
- US-09: System displays available games dynamically
- US-10: Admin can manage tournaments (basic control)

---

## Tasks

### Backend
- [x] Create endpoint for tournament registration
- [x] Fix missing `/api/games` route
- [x] Fix `/api/users/login` endpoint
- [x] Configure static files for images
- [x] Fix DB insert validation (NULL errors)

### Frontend
- [x] Implement Tournament Autocomplete
- [x] Connect registration service
- [x] Fix API service structure
- [x] Fix login flow
- [x] Implement statistics chart
- [x] Improve UI styling (charts)

### Database
- [x] Validate tournament insert constraints
- [x] Ensure relationships integrity for registration

---

## Result

- Functional tournament registration system
- Stable API communication
- Admin dashboard with real-time statistics
- Fully working game carousel

---

## Sprint Review

The system transitioned from partial integration to a fully functional platform.  
Major bugs were fixed, and key features such as registration and statistics were implemented.

---

## Sprint Retrospective

### What went well
- Fast debugging of backend routes
- Successful frontend-backend integration
- Effective use of AI for problem solving

### What could be improved
- Better planning of API endpoints
- Earlier validation of database constraints

### Action items
- Add more validations
- Improve error logging
- Expand statistics module