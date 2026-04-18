# CHANGELOG

## Component Version Variation Dictionary

This table defines the prefixes used to identify which component of the system is affected by a version change.

| Prefix     | Component      | Description                                                                                        | Example Version |
| ---------- | -------------- | -------------------------------------------------------------------------------------------------- | --------------- |
| **FE**     | Frontend       | Changes in the user interface, visual components, client-side logic, or user experience.           | [FE]-1.2.0      |
| **BE**     | Backend        | Changes in server-side logic, services, controllers, authentication, or application processing.    | [BE]-2.0.1      |
| **API**    | API Services   | Changes to API endpoints, request/response structure, or service contracts.                        | [API]-1.3.0     |
| **DB**     | Database       | Modifications to database schema, tables, relationships, migrations, or constraints.               | [DB]-1.1.0      |
| **SEC**    | Security       | Security fixes, vulnerability patches, authentication improvements, or access control changes.     | [SEC]-1.0.2     |
| **INFRA**  | Infrastructure | Changes related to deployment, servers, containers, CI/CD pipelines, or environment configuration. | [INFRA]-0.4.1   |
| **TEST**   | Testing        | Addition or modification of automated tests, test cases, or testing environments.                  | [TEST]-0.3.0    |
| **DOC**    | Documentation  | Updates or corrections to technical documentation, guides, or project specifications.              | [DOC]-1.0.1     |
| **CONFIG** | Configuration  | Changes in system configuration files, environment variables, or runtime settings.                 | [CONFIG]-0.2.3  |

---

## Version [API]-v0.9.5 / [FE]-v0.9.5 / [DB]-v0.9.5 
### Sprint 4 - Tournament management and system integration (April 27, 2026) [IN PROGRESS]

This sprint focused on implementing tournament management and achieving a functional system flow 
by integrating frontend, backend, and database components.

### Added
- Tournament creation form in frontend
- Tournament list view UI
- Initial integration between frontend, backend, and database

### Changed
- Improved error handling in UI and backend responses
- Updated database relationships (STATUS, USERS)

### In Progress
- Tournament endpoints (register and retrieve)
- Database validation and query testing
- Dynamic display of tournaments from backend

### System Status
- Functional flow achieved: register → login → create tournament
- Partial backend implementation for tournaments

### Team Contributions
See detailed contributions in:
`/scrum/sprints/sprint-4/team-contributions.md`

### Notes
- Full tournament CRUD is not yet completed
- Backend endpoints require final implementation

---

## Scrum Integration

This project follows an adaptive Scrum approach.
Development history has been organized into sprints:

- Sprint 1 → Database & Authentication base
- Sprint 2 → Frontend & Player visualization
- Sprint 3 → Security improvements
- Sprint 4 → Tournament management & full system integration 🔥

See `/docs/scrum` folder for backlog and sprint details.

---

## Version [SEC]-v0.9.0 - Password encryption and error handling improvements (April 08, 2026)

User authentication was improved by adding password encryption and better error handling during registration and login.  
These changes help protect user data and provide clearer feedback when something goes wrong.

### Changes

- Added password encryption using bcrypt when registering users.
- Updated login to compare encrypted passwords instead of plain text.
- Removed direct password validation in SQL queries.
- Added validation to avoid duplicate usernames and emails.
- Handled database errors for duplicate entries.
- Improved backend responses with clear error messages.
- Connected backend errors with frontend messages.
- Displayed error messages in the registration form.
- Cleared messages when the user modifies input fields.

---

## Version [FE]-v0.8.6 - Frontend structure refactoring (April 05, 2026)

The frontend project structure was reorganized to improve code maintainability and scalability.
Files were separated into pages, components, services, and utility functions to follow a more modular architecture.

### Changes

- Reorganized frontend folder structure.
- Separated main views into `/pages`.
- Extracted reusable UI elements into `/components`.
- Centralized API calls into `/services`.
- Moved helper functions into `/utils`.
- Improved project readability and maintainability.

### New Structure

```bash  
/src  
    /pages  
        Home.jsx  
        Admin.jsx  
        Player.jsx  
        AdminLogin.jsx  
        UserRegister.jsx  
    /components  
        CreateTournament.jsx  
        TournamentList.jsx  
        ActivityList.jsx  
        Modal.jsx  
    /services  
        api.js  
        tournamentService.js  
        userService.js  
    /hooks
    /utils  
        formatDate.js  
    App.jsx
```

---
## Version [BE]-v0.8.5 - Player retrieval endpoint added (April 05, 2026)

### Changes

- Added endpoint to retrieve all registered players.
- Implemented query to filter users by role.

---

## Version [FE]-0.8.4 - Player visualization implementation (April 05, 2026)

A new section was implemented in the admin panel to display all registered players from the database.
This feature improves user management visibility and allows administrators to easily view player information within the system.

### Changes

- Added player list section in the admin panel.
- Displayed player information in the user interface.
- Integrated player view into existing navigation system.

---

## Version [DB]-v0.8.3 - DDL Schema Implementation from Existing Design (March 24, 2026)

The database schema was created in SQL based on the Data Dictionary and ER diagram that were already defined before.
This version does not change the database design. It only converts the existing design into SQL code using DDL statements.
Some small corrections were made to the Data Dictionary to make sure it matches the SQL structure.
The file `01_schema_tables.sql` was created, including all main tables. Foreign keys are not included yet and will be added in a future version.

### Changes

- Added `01_schema_tables.sql` with all table definitions.
- Converted the Data Dictionary into SQL `CREATE TABLE` statements.
- Followed coding standards (table names, column names, constraints).
- Checked consistency between Data Dictionary, ER diagram, and SQL code.
- Made small corrections in the Data Dictionary.

---

## Version [FE]-v0.8.1 - Code correction in role validations (March 23, 2026)

Login validations were corrected, primarily for the administrator login, to utilize the `ROLES` table created a few versions back. This improves data flow and prevents potential errors due to spelling mistakes.
This update coincides with version [![Version](https://img.shields.io/badge/version-v0.8.0-blue)](https://github.com/olazocaamano/VideoGames-Tournament/blob/main/CHANGELOG.md#version-be-v080---implementation-of-inner-join-for-the-users-table-march-23-2026)

## Changes

- Correction: `Player -> player` and `Admin -> admin`

---

## Version [BE]-v0.8.0 - Implementation of INNER JOIN for the `USERS` table (March 23, 2026)

The login query was corrected to correctly relate the `USERS` table to the `ROLES` table using an **INNER JOIN** and to relate the `id` and `role_id`
columns.

### Changes

- Added:

```
    SELECT
        u.id,
        u.username,
        r.role_name
    FROM users u
    INNER JOIN roles r ON u.role_id = r.id
    WHERE u.username = ? AND u.password = ?
```

---

## Version [DOC]-v0.7.4 - Data Dictionary Relationship Summary Added (March 12, 2026)

A new section was added to the Data Dictionary to summarize the relationships between the main entities in the database.  
This improves documentation clarity and allows readers to quickly understand how the tables are connected without needing to analyze the full ER diagram.

### Changes

- Added **Entity Relationship Summary** section to the Data Dictionary.
- Documented the main parent-child relationships between database tables.
- Improved readability of database documentation.

---

## Version [DB]-v0.7.3 - Implementation of ROLES Table (March 12, 2026)

The **ROLES** table was added to improve role management in the system.  
Instead of storing user roles as an ENUM field in the **USERS** table, a relational approach was implemented using a dedicated table and a foreign key.

This change improves database normalization, flexibility, and consistency in role assignment.

### Changes

- Added new table **ROLES** to store system roles.
- Removed the **ENUM role** field from the **USERS** table.
- Added field **role_id** in **USERS** as a foreign key referencing **ROLES.id**.
- Established a new relationship between **ROLES** and **USERS**.
- Improved database normalization by replacing ENUM with a relational role catalog.

---

## Version [DB]-v0.7.2 - Implementation of STATUS Table (March 11, 2026)

The **STATUS** table was introduced to improve the management of status values used in the system.  
Instead of storing the status as a specific field using an ENUM type, it was replaced with a relational approach by creating a separate table and linking it through a foreign key.

This change was suggested by the **Database Administrator (DBA)**, who identified that using a dedicated table would provide better flexibility, normalization, and scalability for the database design.

### Changes

- Added new table **STATUS** to store tournament status values.
- Removed the **ENUM status** field from the **TOURNAMENTS** table.
- Added the field **status_id** in **TOURNAMENTS** as a foreign key referencing **STATUS.id**.
- Established a new relationship between **STATUS** and **TOURNAMENTS** to manage tournament states through relational data.
- Improved database normalization and future scalability by replacing ENUM with a catalog table.
- Replaced field `status` with `status_id` in the **TOURNAMENTS** table.

---

## Version [DB]-v0.7.1 - Correction of Relationship Names (March 11, 2026)

The names of the relationships between tables were updated to improve clarity and readability.  
These changes were suggested by **The Query Master** together with the **Database Administrator**, who identified that some relationship descriptions were ambiguous or inconsistent.

### Changes

- Updated relationship **GAMES → TOURNAMENTS**
  - `belongs_to` → `used_in`
  - Clarifies that tournaments are played using a specific game.

- Updated relationship **TOURNAMENTS → REGISTRATION**
  - `belongs_to` → `accepts`
  - Represents that tournaments accept multiple registrations.

- Corrected typo in relationships with **ACTIVITY**
  - `longs` → `logs`
  - Indicates that activity records or logs actions related to matches and games.

- Improved semantic clarity in relationship descriptions to better reflect system behavior.

---

## Version [DB]-v0.7.0 - Correction of Tables and Data Dictionary (March 10, 2026)

Corrections were applied to the database tables and the data dictionary based on the suggestions provided by **The Query Master** and **The SQL Tester**. These adjustments improve consistency, constraints, and relational integrity in the database design.

### Changes

- Added `UNIQUE` constraints to fields such as **username**, **email**, and **game_name**.
- Corrected foreign key references (`USER` → `USERS`, `TOURNAMENT` → `TOURNAMENTS`, `MATCH` → `MATCHES`).
- Improved descriptions in the **Data Dictionary** for better clarity and accuracy.
- Added a composite constraint `UNIQUE(user_id, tournament_id)` in the **REGISTRATION** table to prevent duplicate registrations.
- Standardized naming of tables and fields across the schema.

---

## Version [DOC]-v0.6.0 - Version Documentation Added (March 10, 2026)

The **CHANGELOG.md** file was created to better record program versions, allowing for detailed visualization of changes and improving workflow.

### Changes

- Added the `CHANGELOG.md` file to the repository.
- Added the **Component Version Variation Dictionary** table to explain version prefixes.
