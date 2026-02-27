# eSports Tournament Management System - User Stories

This repository contains the functional requirements for the eSports platform. The following user stories define the core features and the project scope.

---

## Project Roadmap and Priorities

| ID | Title | Role | Priority | Dependency |
| :--- | :--- | :--- | :---: | :---: |
| **US-01** | Platform Management | General Admin | 100 | None |
| **US-02** | Profile and Participation | Player | 200 | US-01 |
| **US-03** | Competition Control | Tournament Admin | 300 | US-02 |
| **US-04** | Visualization and Results | General User | 400 | US-03 |

---

## Detailed Requirements

### US-01: Platform Management
**Story:** As a **Site Administrator**, I want to manage user accounts and roles to ensure the platform is secure and every user has the correct permissions.

**Acceptance Criteria:**
* The system must allow creating, blocking, or deleting user accounts.
* Administrators can assign roles such as **Player** or **Tournament Organizer**.
* A dashboard view is provided to monitor all registered users.

**Priority:** 100 (Critical)
**Dependency:** None

---

### US-02: Profile and Participation
**Story:** As a **Player**, I want to create my profile and register for tournaments to compete and let others see my progress.

**Acceptance Criteria:**
* Users can set up a profile with a **Nickname** and **Favorite Game**.
* A "Tournaments" section displays all events with an "Open" status.
* Upon registration, the player gains access to a personal match schedule.

**Priority:** 200 (High)
**Dependency:** US-01

---

### US-03: Competition Control
**Story:** As an **Organizer**, I want to create tournaments and record results so that the competition progresses automatically and orderly.

**Acceptance Criteria:**
* Organizers can create events by defining Name, Date, Game, and Prizes.
* The system supports bracket generation (manual or automatic) based on registered players.
* Results can be updated per match to advance winners to the next stage.

**Priority:** 300 (High)
**Dependency:** US-02

---

### US-04: Visualization and Results
**Story:** As a **User or Visitor**, I want to consult standings and statistics to stay informed about the best players and results.

**Acceptance Criteria:**
* Tournament brackets are publicly accessible for both live and past events.
* A search feature allows users to find player profiles and view win/loss ratios.
* Public data is viewable without requiring an active login session.

**Priority:** 400 (Medium)
**Dependency:** US-03