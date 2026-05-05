# SPRINT 1 BACKLOG

## Sprint Goal
Establish the initial system structure, including database design and basic authentication.

## Duration
March 25 - March 31

## User Stories
- US-01: User Registration
- US-02: User Login

## Tasks

### Database
- [x] Create database schema (tables: USERS, TOURNAMENTS, etc.)
- [x] Define constraints (UNIQUE, PRIMARY KEY)
- [x] Normalize database structure
- [x] Implement ROLES table
- [x] Replace ENUM fields with relational tables

### Backend
- [x] Implement login logic
- [x] Create SQL query with INNER JOIN for roles
- [x] Validate user credentials

### Documentation
- [x] Create Data Dictionary
- [x] Define relationships between entities

## Result
- Functional database schema created
- Login system implemented
- Improved database normalization
- Clear documentation of system structure

## Related Versions
- [DB]-v0.7.0
- [DB]-v0.7.1
- [DB]-v0.7.2
- [DB]-v0.7.3
- [DB]-v0.8.3
- [BE]-v0.8.0
- [DOC]-v0.7.4

---

### AI Usage (Prompts and support)

**Prompt:**
> Estoy diseñando la tabla `USERS` actualmente estu usando `ENUM` para los roles, ¿Esta bien?

**AI support:**
> La IA sugirió evitar ENUM por falta de escalabilidad y guió hacia una tabla ROLES con relación mediante clave foránea.

--- 
**Prompt:**
> Mi login no funciona correctamente, ¿qué podría estar mal?

**AI support:**
> La IA hizo preguntas sobre el uso de INNER JOIN y la relación entre tablas, le mandamos partes de codigo para que nos
> pudiera ayudar mejor hasta que logramos encontrar la solución.