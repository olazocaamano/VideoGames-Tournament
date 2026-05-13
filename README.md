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
- [Frontend configuration](#frontend-configuration)
  - [Enter the frontend folder](#enter-the-frontend-folder)
  - [Install dependencies](#install-dependencies-1)
  - [Run server](#run-server-1)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
  - [Development Tools](#development-tools)
  - [Architecture](#architecture)
  - [Features Implemented](#features-implemented)
  - [Additional Libraries](#additional-libraries)
  - [Version Control](#version-control)
  - [Documentation](#documentation)
- [Contributions](#contributions)
  - [Frontend Development](#frontend-development)
  - [Backend Development](#backend-development)
  - [Database Development](#database-development)
  - [Security Contributions](#security-contributions)
  - [Testing and Debugging](#testing-and-debugging)
  - [Documentation Contributions](#documentation-contributions)
  - [AI-Assisted Development](#ai-assisted-development)

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

# Frontend configuration

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

# Technologies Used

## Frontend
- React.js
- React Router DOM
- Axios
- Chart.js
- react-chartjs-2
- CSS3
- JavaScript (ES6+)

---

## Backend
- Node.js
- Express.js
- MySQL2
- bcrypt
- CORS
- dotenv

---

## Database
- MySQL

---

## Development Tools
- Visual Studio Code
- Git
- GitHub
- npm
- Postman

---

## Architecture
- REST API
- Client-Server Architecture
- MVC Pattern (Model-View-Controller)

---

## Features Implemented
- Authentication System
- Tournament Management
- Player Registration
- Activity Logging
- Statistics Dashboard
- Role-Based Access Control
- Dynamic Game Carousel
- Responsive Admin Panel

---

## Additional Libraries
- react-chartjs-2
- chart.js
- mysql2
- bcrypt
- cors

---

## Version Control
- Git
- GitHub Repository Management

---

## Documentation
- Markdown (.md)
- Scrum-based sprint documentation
- CHANGELOG versioning system

---

# Contributions

## Frontend Development
- Designed and implemented the user interface using React.js
- Developed responsive pages for players and administrators
- Integrated tournament visualization and registration components
- Implemented dynamic game carousel and statistics charts
- Improved user experience and navigation flow

---

## Backend Development
- Developed REST API endpoints using Express.js
- Implemented authentication and user validation
- Created tournament management and registration logic
- Integrated activity logging system
- Connected backend services with MySQL database

---

## Database Development
- Designed relational database schema
- Implemented tables, constraints, and relationships
- Added foreign keys and normalization improvements
- Optimized database structure for scalability

---

## Security Contributions
- Implemented password encryption using bcrypt
- Added login validation and duplicate user verification
- Improved backend error handling and security practices

---

## Testing and Debugging
- Performed integration testing between frontend and backend
- Fixed routing and API communication errors
- Resolved image loading and rendering issues
- Validated complete application flow

---

## Documentation Contributions
- Created and maintained CHANGELOG documentation
- Documented sprint progress and Scrum activities
- Wrote technical documentation and setup instructions
- Organized project structure documentation

---

## AI-Assisted Development
- Used AI tools for debugging and code correction
- Generated technical documentation and reports
- Assisted with frontend and backend integration
- Improved development workflow and problem-solving process