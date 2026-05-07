## SPRINT 2 BACKLOG

### Sprint Goal
Finalize the system architecture, implement advanced security, organize frontend structure, and complete the functional tournament management flow including administrative statistics.

### Duration
March 25 - May 06

### User Stories
- **US-02:** User Login (Reinforced)
- **US-03:** Password Encryption
- **US-04:** Player Visualization (Filtered by 'player' role)
- **US-05:** Frontend Organization (Clean architecture)
- **US-06:** Error Handling and User Feedback
- **US-07:** Player registration to a specific tournament
- **US-08:** Admin visualization of system statistics
- **US-09:** Dynamic display of available games
- **US-10:** Tournament management and admin control

### Tasks

#### Database
- [x] Verify `TOURNAMENTS` table structure and relationships with `STATUS` (FK) and `USERS`.
- [x] Validate insertion constraints in the registration table to prevent integrity errors.
- [x] Test insertion and query operations for complex flows.
- [x] Ensure role logic (Role 3 = Players) is maintained in queries.

#### Backend
- [x] Implement password encryption using `bcrypt` and validate on the server.
- [x] Create endpoints for tournament registration and retrieval.
- [x] Fix `/api/users/login` endpoint and missing `/api/games` route.
- [x] Configure static folders for image management.
- [x] Implement tournament enrollment logic and handle NULL insertion errors.

#### Frontend
- [x] Refactor folder structure (`/pages`, `/components`, `/services`) for better maintenance.
- [x] Create UI for player lists, tournament lists, and creation forms.
- [x] Implement Tournament *Autocomplete* and dynamic game carousel.
- [x] Develop the statistics dashboard with integrated charts.
- [x] Connect forms to the backend using centralized services (Axios/Fetch).

#### Integration
- [x] Connect frontend, backend, and database into a single flow.
- [x] Test full flow: Register → Login → View Tournaments → Create/Join.
- [x] Debug API routes and real-time data validation.

### Result
- Fully functional tournament and registration system.
- Secure authentication with encryption and session management.
- Admin dashboard with real-time statistics.
- Scalable and professional code structure.

### Related Versions
- [DB]-v0.7.0 to v0.8.3
- [BE]-v0.8.0 to v0.9.7
- [FE]-v0.8.4 to v1.0.0
- [API]-v0.9.5 to v0.9.8
- [SEC]-v0.9.0
- [DOC]-v0.7.4

---

### AI Usage (Prompts and support)

**Prompt:**
> How can I better organize my React project and display data from the backend?

**AI support:**
> Recommended separating into pages, components, and services to improve maintainability. Explained the use of APIs, state management, and service consumption for dynamic data.

**Prompt:**
> Is it safe to store passwords in plain text and how do I validate them if they are encrypted?

**AI support:**
> Explained the risks and recommended `bcrypt`, assisting in the creation of the encryption file. Clarified that validation must happen in the backend rather than through direct SQL queries.

**Prompt:**
> How should I structure tournament endpoints and connect forms?

**AI support:**
> Suggested separating creation and retrieval routes, validating data before insertion. Guided the use of frontend services to send data and handle responses/errors.

**Prompt:**
> How to fix NULL errors in the DB and create statistics charts?

**AI support:**
> Identified database constraint errors and guided the configuration of game routes. Also helped implement charts for the admin dashboard.

---

## SPRINT 3 BACKLOG (FINAL STAGE)

### Sprint Goal
Optimize end-user experience and ensure deployment stability by fixing critical bugs and finalizing data visualization.

### User Stories
- **US-07:** Player can register to a tournament.
- **US-08:** Admin can visualize system statistics.
- **US-09:** System displays available games dynamically.
- **US-10:** Admin manages tournaments (basic control).

### Tasks

#### Backend
- [x] Create endpoint for tournament registration (enrollment).
- [x] Fix missing `/api/games` route.
- [x] Adjust `/api/users/login` endpoint for failed flows.
- [x] Configure static file folder for game images.
- [x] Fix insertion validations to prevent NULL type errors.

#### Frontend
- [x] Implement *Autocomplete* component for tournament selection.
- [x] Connect user enrollment service.
- [x] Refactor API service architecture.
- [x] Implement statistics charts in the admin panel.
- [x] Improve visual design of charts and carousel.

#### Database
- [x] Validate constraints for tournament and registration tables.
- [x] Ensure relationship integrity for new enrollments.

### Result
- Tournament registration system 100% operational.
- Stabilized API-Frontend communication.
- Admin dashboard with visual statistics and functional game carousel.

### Related Versions
- [API]-v0.9.8
- [FE]-v1.0.0
- [BE]-v0.9.7