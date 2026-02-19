erDiagram
    USER ||--o{ TOURNAMENT : manages
    USER ||--o{ REGISTRATION : joins
    TOURNAMENT ||--o{ REGISTRATION : contains
    TOURNAMENT ||--o{ MATCH : includes

    USER {
        int id PK
        string username
        string email
        string password
        string role
        string nickname
        string favorite_game
    }

    TOURNAMENT {
        int id PK
        string name
        string game
        string prize_pool
        datetime start_date
        string status
        int creator_id FK
    }

    REGISTRATION {
        int id PK
        int user_id FK
        int tournament_id FK
        datetime registration_date
    }

    MATCH {
        int id PK
        int tournament_id FK
        string player_1
        string player_2
        string winner
        string round
    }
