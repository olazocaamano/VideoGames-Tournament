## Component Version Variation Dictionary

This table defines the prefixes used to identify which component of the system is affected by a version change.

| Prefix | Component | Description | Example Version |
|------|------|------|------|
| **FE** | Frontend | Changes in the user interface, visual components, client-side logic, or user experience. | [FE]-1.2.0 |
| **BE** | Backend | Changes in server-side logic, services, controllers, authentication, or application processing. | [BE]-2.0.1 |
| **API** | API Services | Changes to API endpoints, request/response structure, or service contracts. | [API]-1.3.0 |
| **DB** | Database | Modifications to database schema, tables, relationships, migrations, or constraints. | [DB]-1.1.0 |
| **SEC** | Security | Security fixes, vulnerability patches, authentication improvements, or access control changes. | [SEC]-1.0.2 |
| **INFRA** | Infrastructure | Changes related to deployment, servers, containers, CI/CD pipelines, or environment configuration. | [INFRA]-0.4.1 |
| **TEST** | Testing | Addition or modification of automated tests, test cases, or testing environments. | [TEST]-0.3.0 |
| **DOC** | Documentation | Updates or corrections to technical documentation, guides, or project specifications. | [DOC]-1.0.1 |
| **CONFIG** | Configuration | Changes in system configuration files, environment variables, or runtime settings. | [CONFIG]-0.2.3 |

---

## Version [DOC]-v0.7.105 - Version documentation is added. (March 10, 2026)

The CHANGELOG.md file was created to better record program versions, allowing for detailed visualization of changes and improving workflow.

### Changes
- The `CHANGELOG.md` file was added.
- The "Version Dictionary" table was added to the `CHANGELOG.md` file, specifying in which area the change was made.


---



## Version [DB]-v0.7.2 – Correction of Tables and Data Dictionary (March 10, 2026)

Corrections were applied to the database tables and the data dictionary based on the suggestions provided by **The Query Master** and **The SQL Tester**. These adjustments improve consistency, constraints, and relational integrity in the database design.

### Changes
- Added `UNIQUE` constraints to fields such as **username**, **email**, and **game_name**.
- Corrected foreign key references (`USER` → `USERS`, `TOURNAMENT` → `TOURNAMENTS`, `MATCH` → `MATCHES`).
- Improved descriptions in the **Data Dictionary** for better clarity and accuracy.
- Added a composite constraint `UNIQUE(user_id, tournament_id)` in the **REGISTRATION** table to prevent duplicate registrations.
- Standardized naming of tables and fields across the schema.


---


## Version [DB]-v0.7.206 - Correction of Relationship Names (March 11, 2026)

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