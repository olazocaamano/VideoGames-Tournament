```mermaid
erDiagram
    USER ||--o{ TOURNAMENT : "creates_manages"
    USER ||--o{ REGISTRATION : "enrolls"
    USER ||--o{ MATCH : "participates_as_p1"
    USER ||--o{ MATCH : "participates_as_p2"
    TOURNAMENT ||--o{ REGISTRATION : "has"
    TOURNAMENT ||--o{ MATCH : "organizes"
    GAMES ||--o{ TOURNAMENT : "belongs_to"
    USER ||--o{ USER_GAMES : "favorites"
    GAMES ||--o{ USER_GAMES : "is_favorited"

    USER {
        int id PK
        varchar username UNIQUE
        varchar email UNIQUE
        varchar password
        varchar role
        varchar nickname
        datetime created_at
    }

    GAMES {
        int id PK
        varchar game_name UNIQUE
        varchar genre
        varchar publisher
        date release_date
        boolean is_active
    }

    USER_GAMES {
        int user_id FK
        int game_id FK
        datetime added_at
        PK user_id, game_id
    }

    TOURNAMENT {
        int id PK
        varchar name
        int game_id FK
        decimal(12,2) prize_pool
        datetime start_date
        enum('open','ongoing','finished') status
        int creator_id FK
        datetime created_at
    }

    REGISTRATION {
        int id PK
        int user_id FK
        int tournament_id FK
        datetime registration_date
        UNIQUE user_id, tournament_id
    }

    MATCH {
        int id PK
        int tournament_id FK
        int player_1_id FK
        int player_2_id FK
        int winner_id FK
        varchar round
        datetime played_at
    }
```
