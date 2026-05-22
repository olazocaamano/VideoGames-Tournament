# PRODUCT BACKLOG - SISTEMA DE CONTROL DE TORNEOS

This document contains the prioritized features and requirements of the video game tournament control system, organized as actionable User Stories with clear Acceptance Criteria.

---

## Definition of Done (DoD) - General Rules for All Stories
* **Technical Standards:** UI elements must be responsive and adapt to dark mode (Chart.js/CSS). Service layers must be modular (`tournamentService`, `userService`).
* **Security:** All endpoints under `/api/` must validate user roles (`admin` / `player`) mapping the `ROLES` database relation. Passwords must use bcrypt hashing.
* **Testing:** Every story must include automated unit tests before being marked as complete.

---

## High Priority

### US-01: User Registration & Role Assignment
**Description:** As a **new visitor**,  
I want to **register in the system by providing my username, email, and a password**,  
To **create an account with an automatic default role of 'player'**.

**Acceptance Criteria:**
* [ ] **Scenario 1 (Successful Registration):** Given a visitor provides a unique username, unique email, and valid password, when they click "Register", then a new record is inserted in `USERS` linked to the `id` of 'player' in the `ROLES` table.
* [ ] **Scenario 2 (Duplicate Prevention):** Given a username or email that already exists in the database, when the registration is submitted, then the system triggers a `UNIQUE` constraint violation error and displays: *"Username or Email already registered"*.
* [ ] **Scenario 3 (Form UX):** When the user modifies any input field after a failed attempt, the error message must instantly clear.

### US-02: User Login with Relational Roles
**Description:** As a **registered user (Player/Admin)**,  
I want to **log into the system with my credentials**,  
To **access my corresponding dashboard depending on my verified role**.

**Acceptance Criteria:**
* [ ] **Scenario 1 (Role-Based Routing):** Given valid credentials, when the user logs in, the backend must execute an `INNER JOIN` between `USERS` and `ROLES`. If the role is `admin`, redirect to `/pages/Admin.jsx`; if it is `player`, redirect to `/pages/Player.jsx`.
* [ ] **Scenario 2 (Secure Comparison):** The system must compare the plain text input with the encrypted bcrypt hash in the DB.
* [ ] **Scenario 3 (Error Fallback):** Any routing or credential failure must be handled gracefully, returning clear feedback without crashing the session layer.

### US-03: Tournament Creation (Admin)
**Description:** As an **administrator**,  
I want to **create a new tournament specifying its name, game, and prize pool via a form**,  
To **publish it with an initial status of 'Created'**.

**Acceptance Criteria:**
* [ ] **Scenario 1 (Successful Creation):** Given valid form data, when the admin submits it, a new tournament is logged with a foreign key pointing to the 'Created' status in the `STATUS` table.
* [ ] **Scenario 2 (Database Integrity):** The database constraints must prevent any `NULL` values in critical fields like `name` or `game_id`.
* [ ] **Scenario 3 (Game Selection):** The game field must be selected via a dropdown populated directly from the database catalog.

### US-04: Player Tournament Registration (Join)
**Description:** As a **registered player**,  
I want to **join an active tournament from the player dashboard**,  
To **secure a slot in the competition**.

**Acceptance Criteria:**
* [ ] **Scenario 1 (Successful Entry):** Given an open tournament, when the player clicks "Join Tournament", a entry is added to the `REGISTRATION` table mapping `user_id` and `tournament_id`.
* [ ] **Scenario 2 (Duplicate Prevention):** Given a player who is already registered for a specific tournament, when they try to click join again, the composite `UNIQUE(user_id, tournament_id)` constraint must block the action and show: *"You are already registered for this tournament"*.

---

## Medium Priority

### US-05: Tournament Search via Autocomplete
**Description:** As a **player**,  
I want to **type in a search bar to filter tournaments dynamically**,  
To **quickly find the specific competition or game I want to join**.

**Acceptance Criteria:**
* [ ] **Scenario 1 (Dynamic Filtering):** When the user types 3 or more characters in the search bar, the UI must filter available tournaments using the `tournamentService`.
* [ ] **Scenario 2 (No Results):** If no tournament matches the query, the autocomplete dropdown must display: *"No tournaments found"*.

### US-06: Game Carousel Display
**Description:** As a **user**,  
I want to **see a visual carousel of popular games on the homepage**,  
To **explore what games currently have active communities or tournaments**.

**Acceptance Criteria:**
* [ ] **Scenario 1 (Data Fetching):** The landing page must execute a `GET` request to `/api/games` to fetch game names and image metadata.
* [ ] **Scenario 2 (Static Image Serving):** The carousel must display high-quality images served via static assets without broken links or 404 image paths.

### US-07: Admin Core Metrics Dashboard
**Description:** As an **administrator**,  
I want to **view a metrics dashboard with automated calculations and charts**,  
To **analyze the overall health and size of the tournament ecosystem**.

**Acceptance Criteria:**
* [ ] **Scenario 1 (Real-Time Metrics):** The dashboard must calculate and display cards for: *Total Tournaments*, *Active Tournaments*, *Finished Tournaments*, *Total Players*, and *Average Prize Pool*.
* [ ] **Scenario 2 (Visual Charting):** The statistics must feature a Chart.js dynamic visual component that updates using real backend data.
* [ ] **Scenario 3 (Dashboard UX):** The charts must fully adapt to the responsive grid and adhere to the application's dark mode palette.

### US-08: Tournament Lifecycle Management (Status Control)
**Description:** As an **administrator**,  
I want to **change the status of a tournament (In Progress, Finished, Cancelled)**,  
To **control the lifecycle of the events and close them when they conclude**.

**Acceptance Criteria:**
* [ ] **Scenario 1 (Status Update):** Given an active tournament, when the admin changes its state to "Finished", the `status_id` in the `TOURNAMENTS` row must update to match the corresponding ID in the `STATUS` table.
* [ ] **Scenario 2 (Cascade Behavior):** When a tournament is marked as "Cancelled", the system must notify or visually flag the status change for all registered players in that event.

---

## Low Priority

### US-09: Admin Registration Controls & Player Analytics
**Description:** As an **administrator**,  
I want to **review player participation analytics and manage registrations manually**,  
To **oversee tournament brackets and kick/approve participants if necessary**.

**Acceptance Criteria:**
* [ ] **Scenario 1 (Advanced Statistics):** The admin panel must show time-based user activity tracking (e.g., registrations over the last 30 days).
* [ ] **Scenario 2 (Manual Override):** The admin must have an explicit control action (button) next to each registered player in a tournament list to cancel their registration.

### US-10: Player List View (Admin Panel)
**Description:** As an **administrator**,  
I want to **see a dedicated section with a list of all registered players**,  
To **have a searchable directory of the user base filtered by player role**.

**Acceptance Criteria:**
* [ ] **Scenario 1 (Table view):** Navigation to the player directory triggers a fetch to `/api/users?role=player` and renders a clean data grid.