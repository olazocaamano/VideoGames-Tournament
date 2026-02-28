# Data Dictionary - eSports Tournament System (Relational)

This document describes the structure, data types, and constraints for the MySQL database.

---

## Table: USER
Stores account data for administrators and players.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | INT | PK, Auto-increment | Unique identifier for each user. |
| **username** | VARCHAR(50) | Not Null | Unique name for system login. |
| **email** | VARCHAR(100) | Not Null | User's electronic mail address. |
| **password** | VARCHAR(255) | Not Null | Hashed security credentials. |
| **role** | VARCHAR(20) | Not Null | User type (e.g., 'admin', 'player'). |
| **nickname** | VARCHAR(50) | Not Null | In-game name displayed in tournaments. |
| **is_active** | BOOLEAN | Not Null | Indicates if the user is in any tournament. |

---

## Table: GAMES
Stores master data of supported esports titles.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | INT | PK, Auto-increment | Unique identifier for each game. |
| **game_name** | VARCHAR(100) | Not Null | Official title of the game. |
| **genre** | VARCHAR(50) | Not Null | Game category (e.g., FPS, MOBA). |
| **publisher** | VARCHAR(100) | Nullable | Company that publishes the game. |
| **release_date** | DATE | Nullable | Official launch date. |
| **is_active** | BOOLEAN | Not Null | Indicates if the game is currently supported. |

---

## Table: TOURNAMENT
Stores competition details managed by an administrator.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | INT | PK, Auto-increment | Unique identifier for the tournament. |
| **name** | VARCHAR(100) | Not Null | Official name of the event. |
| **game_id** | INT | FK (GAMES.id), Not Null | Game associated with the tournament. |
| **prize_pool** | DECIMAL(12,2) | Not Null | Total monetary prize amount. |
| **start_date** | DATETIME | Not Null | Scheduled start time. |
| **status** | ENUM('open','ongoing','finished') | Not Null | Current state of the tournament. |
| **creator_id** | INT | FK (USER.id), Not Null | Administrator who created the tournament. |
| **is_active** | BOOLEAN | Not Null | Indicates if the tournament is available. |

---

## Table: REGISTRATION
Associative table for the Many-to-Many relationship between Users and Tournaments.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | INT | PK, Auto-increment | Registration record identifier. |
| **user_id** | INT | FK (USER.id), Not Null | ID of the player signing up. |
| **tournament_id** | INT | FK (TOURNAMENT.id), Not Null | ID of the tournament being joined. |
| **registration_date** | DATETIME | Not Null | Date and time of enrollment. |

---

## Table: MATCH
Stores the competitive encounters and their results within a specific tournament.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | INT | PK, Auto-increment | Match identifier. |
| **tournament_id** | INT | FK (TOURNAMENT.id), Not Null | Tournament this match belongs to. |
| **player_1_id** | INT | FK (USER.id), Not Null | ID of the first participant. |
| **player_2_id** | INT | FK (USER.id), Not Null | ID of the second participant. |
| **winner_id** | INT | FK (USER.id), Nullable | ID of the player who won the match. |
| **round** | VARCHAR(50) | Not Null | Tournament stage (e.g., 'Quarter-finals'). |