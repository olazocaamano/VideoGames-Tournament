# Data Dictionary - eSports Tournament System

This document describes the structure and constraints of the database tables based on the Entity Relationship Diagram.

---

## Table: USER
Stores information for all account types (Administrators and Players).

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| id | int | Primary Key | Unique identifier for each user. |
| username | string | Unique, Not Null | Unique name for login purposes. |
| email | string | Unique, Not Null | Contact and identification email. |
| password | string | Not Null | Encrypted access credentials. |
| role | string | Not Null | Defines permissions (e.g., 'admin', 'player'). |
| nickname | string | Not Null | Display name within the competition. |
| favorite_game | string | Nullable | Game preference for user profile. |

---

## Table: TOURNAMENT
Stores the details of the competitions created by administrators.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| id | int | Primary Key | Unique identifier for the tournament. |
| name | string | Not Null | Official title of the tournament. |
| game | string | Not Null | Specific game to be played. |
| prize_pool | string | Nullable | Description of prizes or cash pool. |
| start_date | datetime | Not Null | Date and time when the event begins. |
| status | string | Not Null | Current state (e.g., 'open', 'ongoing', 'finished'). |
| creator_id | int | Foreign Key | Reference to the User (Admin) who created it. |

---

## Table: REGISTRATION
Acts as a bridge to manage players signing up for tournaments.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| id | int | Primary Key | Unique identifier for the registration record. |
| user_id | int | Foreign Key | Reference to the Player who is joining. |
| tournament_id | int | Foreign Key | Reference to the specific Tournament. |
| registration_date | datetime | Not Null | Timestamp of when the player joined. |

---

## Table: MATCH
Stores individual match data and results within a tournament.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| id | int | Primary Key | Unique identifier for the match. |
| tournament_id | int | Foreign Key | Reference to the parent Tournament. |
| player_1 | string | Not Null | Nickname of the first participant. |
| player_2 | string | Not Null | Nickname of the second participant. |
| winner | string | Nullable | Nickname of the player who won the match. |
| round | string | Not Null | Stage of the tournament (e.g., 'quarter-finals'). |
