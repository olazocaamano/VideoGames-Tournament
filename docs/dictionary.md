# Data Dictionary - eSports Tournament System (Relational)

This document describes the structure, data types, and constraints for the MySQL database.

---

## Table: USER
Stores account data for administrators and players.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | INT | PK, Auto-increment | Unique identifier for each user. |
| **username** | VARCHAR(50) | Unique, Not Null | Unique name for system login. |
| **email** | VARCHAR(100) | Unique, Not Null | User's electronic mail address. |
| **password** | VARCHAR(255) | Not Null | Hashed security credentials. |
| **role** | VARCHAR(20) | Not Null | User type: 'admin' or 'player'. |
| **nickname** | VARCHAR(50) | Not Null | In-game name displayed in brackets. |
| **favorite_game**| VARCHAR(50) | Nullable | Preferred game for personalized view. |

---

## Table: TOURNAMENT
Stores competition details managed by an administrator.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | INT | PK, Auto-increment | Unique identifier for the tournament. |
| **name** | VARCHAR(100) | Not Null | Official name of the event. |
| **game** | VARCHAR(50) | Not Null | Game title (e.g., 'Valorant'). |
| **prize_pool** | VARCHAR(100) | Nullable | Description of the rewards. |
| **start_date** | DATETIME | Not Null | Scheduled start time. |
| **status** | VARCHAR(20) | Not Null | State: 'open', 'ongoing', 'finished'. |
| **creator_id** | INT | FK (USER.id) | The Admin who created the tournament. |

---

## Table: REGISTRATION
Associative table for the Many-to-Many relationship between Users and Tournaments.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | INT | PK, Auto-increment | Registration record identifier. |
| **user_id** | INT | FK (USER.id) | ID of the player signing up. |
| **tournament_id**| INT | FK (TOURNAMENT.id)| ID of the tournament being joined. |
| **registration_date**| DATETIME | Not Null | Date of enrollment (Default: NOW). |

---

## Table: MATCH
Stores the competitive encounters and their results within a specific tournament.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | INT | PK, Auto-increment | Match identifier. |
| **tournament_id**| INT | FK (TOURNAMENT.id)| Tournament this match belongs to. |
| **player_1_id** | INT | FK (USER.id) | ID of the first participant. |
| **player_2_id** | INT | FK (USER.id) | ID of the second participant. |
| **winner_id** | INT | FK (USER.id), Nullable | ID of the player who won the match. |
| **round** | VARCHAR(50) | Not Null | Tournament stage (e.g., 'Quarter-finals'). |
