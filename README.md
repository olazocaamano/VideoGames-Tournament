# eSports Tournament Database System

---

## Table of Contents

- [eSports Tournament Database System](#esports-tournament-database-system)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Team Roles](#team-roles)
- [Project structure](#project-structure)
- [Project installation](#project-installation)
  - [Clone the repository](#clone-the-repository)
- [Backend configuration](#backend-configuration)
  - [Enter the backend folder](#enter-the-backend-folder)
  - [Install dependencies](#install-dependencies)
  - [Run server](#run-server)
- [Backend configuration](#backend-configuration-1)
  - [Enter the frontend folder](#enter-the-frontend-folder)
  - [Install dependencies](#install-dependencies-1)
  - [Run server](#run-server-1)

---

## Project Overview
This project was created to promote healthy and competitive environments where video game tournaments can be organized and managed efficiently. The system is designed to simplify the creation, administration, and participation in tournaments, making it accessible for players, teams, and organizers interested in competitive gaming events.

The database structure supports the management of users, games, tournaments, matches, registrations, and activity tracking within the platform.

The project is divided into the following components:
- **Database Design**
- **Entity-Relationship Diagram**
- **Data Dictionary**
- **SQL Implementation**
- **Query Development**
- **Testing and Validation**

---

> [!NOTE]
> ## Current Version
> The latest version of the database design and system updates can always be found in the **CHANGELOG**.
> 
> [![Version](https://img.shields.io/badge/version-v9.8.0-blue)](https://github.com/olazocaamano/VideoGames-Tournament/blob/main/CHANGELOG.md#version-api-v980-fe-v980-be-v980-db-v980)

---

## Team Roles

| Role                   | Name                       |
| :--------------------- | :------------------------- |
| The Analyst & Designer | Galán Torres Citlalli      |
| The SQL Developer      | Olazo Caamaño Emmanuel     |
| The Query Master       | Jimenez Solis Caleb        |
| The QA/Tester          | Lopez Gil Dilan Osmar      |
| The DBA (Admin)        | Aguilar Medina Angel Uriel |

---

# Project structure
```txt
backend/
 ├── controllers/
 ├── routes/
 ├── uploads/
 ├── utils/
 ├── db.js
 └── index.js

frontend/
 ├── public/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── resources/
 │   ├── services/
 │   ├── utils/
 ├── App.jsx
 └── index.jsx
```

---

# Project installation

## Clone the repository

```bash
git clone https://github.com/olazocaamano/VideoGames-Tournament.git
```

---

# Backend configuration

## Enter the backend folder

```bash
cd backend
```

## Install dependencies

```bash
node install
```

## Run server

```bash
node index.js
```

---

# Backend configuration

## Enter the frontend folder

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Run server

```bash
npm start
```

---