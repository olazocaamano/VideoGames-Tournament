## Version v0.7.2 – Correction of Tables and Data Dictionary

Corrections were applied to the database tables and the data dictionary based on the suggestions provided by **The Query Master** and **The SQL Tester**. These adjustments improve consistency, constraints, and relational integrity in the database design.

### Changes
- Added `UNIQUE` constraints to fields such as **username**, **email**, and **game_name**.
- Corrected foreign key references (`USER` → `USERS`, `TOURNAMENT` → `TOURNAMENTS`, `MATCH` → `MATCHES`).
- Improved descriptions in the **Data Dictionary** for better clarity and accuracy.
- Added a composite constraint `UNIQUE(user_id, tournament_id)` in the **REGISTRATION** table to prevent duplicate registrations.
- Standardized naming of tables and fields across the schema.