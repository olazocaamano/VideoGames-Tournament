-- ============================================================================
-- Core Entity: USERS
-- Description: Stores account data for administrators and players.
-- ============================================================================
CREATE TABLE USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL
);

-- ============================================================================
-- Core Entity: GAMES
-- Description: Stores master data of supported esports titles.
-- ============================================================================
CREATE TABLE GAMES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_name VARCHAR(100) NOT NULL UNIQUE,
    genre VARCHAR(50) NOT NULL,
    publisher VARCHAR(100),
    release_date DATE,
    is_active BOOLEAN NOT NULL
);

-- ============================================================================
-- Core Entity: TOURNAMENTS
-- Description: Stores competition details managed by an administrator.
-- ============================================================================
CREATE TABLE TOURNAMENTS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    game_id INT NOT NULL,
    prize_pool DECIMAL(12,2) NOT NULL,
    start_date DATETIME NOT NULL,
    status_id INT,
    creator_id INT NOT NULL,
    is_active BOOLEAN NOT NULL
);

-- ============================================================================
-- Associative Entity: REGISTRATION
-- Description: Represents the registration of users in tournaments.
-- ============================================================================
CREATE TABLE REGISTRATION (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    tournament_id INT NOT NULL,
    registration_date DATETIME NOT NULL,
    UNIQUE (user_id, tournament_id)
);

-- ============================================================================
-- Core Entity: MATCHES
-- Description: Stores matches and their results within tournaments.
-- ============================================================================
CREATE TABLE MATCHES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tournament_id INT NOT NULL,
    player_1_id INT NOT NULL,
    player_2_id INT NOT NULL,
    winner_id INT,
    round VARCHAR(50) NOT NULL
);

-- ============================================================================
-- Core Entity: ACTIVITY
-- Description: Stores system event logs and activity tracking.
-- ============================================================================
CREATE TABLE ACTIVITY (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    tournament_id INT,
    game_id INT,
    match_id INT,
    action_type VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Catalog Entity: STATUS
-- Description: Stores possible status values for tournaments.
-- ============================================================================
CREATE TABLE STATUS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================================
-- Catalog Entity: ROLES
-- Description: Stores system roles for users.
-- ============================================================================
CREATE TABLE ROLES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE
);