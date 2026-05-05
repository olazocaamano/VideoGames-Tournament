const db = require("./backend/db");
const { faker } = require("@faker-js/faker");

const TOTAL_USERS = 5000;
const TOTAL_TOURNAMENTS = 500;
const TOTAL_REGISTRATIONS = 20000;
const TOTAL_MATCHES = 10000;

const BATCH_SIZE = 1000;

async function main() {
    const connection = await db.getConnection();

    console.log("Conectado...");

    try {
        await connection.query("SET FOREIGN_KEY_CHECKS = 0");
        await connection.beginTransaction();

        // ROLES
        await connection.query(`
            INSERT IGNORE INTO roles (id, role_name)
            VALUES (1, 'admin'), (2, 'player')
        `);

        // STATUS
        await connection.query(`
            INSERT IGNORE INTO status (id, name)
            VALUES (1, 'pending'), (2, 'active'), (3, 'finished')
        `);

        // GAMES
        const games = [
            ["Valorant", "FPS"],
            ["League of Legends", "MOBA"],
            ["CS2", "FPS"],
            ["Fortnite", "Battle Royale"]
        ];

        for (let g of games) {
            await connection.query(
                "INSERT IGNORE INTO games (game_name, genre, is_active) VALUES (?, ?, true)",
                g
            );
        }

        // USERS
        console.log("Insertando usuarios...");

        for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
            const batch = [];

            for (let j = 0; j < BATCH_SIZE && (i + j) < TOTAL_USERS; j++) {
                const unique = Date.now() + "_" + (i + j);

                batch.push([
                    faker.internet.username() + "_" + unique,
                    faker.internet.email() + "_" + unique,
                    "$2b$10$hashedpassword",
                    3,
                    faker.internet.username(),
                    true
                ]);
            }

            await connection.query(`
                INSERT INTO users 
                (username, email, password, role_id, nickname, is_active)
                VALUES ?
            `, [batch]);
        }

        // TOURNAMENTS
        console.log("Insertando torneos...");

        for (let i = 0; i < TOTAL_TOURNAMENTS; i += BATCH_SIZE) {
            const batch = [];

            for (let j = 0; j < BATCH_SIZE && (i + j) < TOTAL_TOURNAMENTS; j++) {
                batch.push([
                    faker.company.name() + " Cup",
                    faker.number.int({ min: 1, max: 4 }),
                    faker.number.int({ min: 1000, max: 100000 }),
                    new Date(),
                    faker.number.int({ min: 1, max: 3 }),
                    faker.number.int({ min: 1, max: TOTAL_USERS }),
                    true
                ]);
            }

            await connection.query(`
                INSERT INTO tournaments
                (name, game_id, prize_pool, start_date, status_id, creator_id, is_active)
                VALUES ?
            `, [batch]);
        }

        // REGISTRATION
        console.log("Insertando registros...");

        for (let i = 0; i < TOTAL_REGISTRATIONS; i += BATCH_SIZE) {
            const batch = [];

            for (let j = 0; j < BATCH_SIZE && (i + j) < TOTAL_REGISTRATIONS; j++) {
                batch.push([
                    faker.number.int({ min: 1, max: TOTAL_USERS }),
                    faker.number.int({ min: 1, max: TOTAL_TOURNAMENTS }),
                    new Date()
                ]);
            }

            await connection.query(`
                INSERT IGNORE INTO registration
                (user_id, tournament_id, registration_date)
                VALUES ?
            `, [batch]);
        }

        // MATCHES
        console.log("Insertando matches...");

        for (let i = 0; i < TOTAL_MATCHES; i += BATCH_SIZE) {
            const batch = [];

            for (let j = 0; j < BATCH_SIZE && (i + j) < TOTAL_MATCHES; j++) {
                const p1 = faker.number.int({ min: 1, max: TOTAL_USERS });
                let p2;

                do {
                    p2 = faker.number.int({ min: 1, max: TOTAL_USERS });
                } while (p1 === p2);

                batch.push([
                    faker.number.int({ min: 1, max: TOTAL_TOURNAMENTS }),
                    p1,
                    p2,
                    faker.helpers.arrayElement([p1, p2]),
                    faker.helpers.arrayElement(["Quarter", "Semi", "Final"])
                ]);
            }

            await connection.query(`
                INSERT INTO matches
                (tournament_id, player_1_id, player_2_id, winner_id, round)
                VALUES ?
            `, [batch]);
        }

        await connection.commit();
        console.log("Datos generados correctamente");

    } catch (err) {
        await connection.rollback();
        console.error("Error:", err);
    } finally {
        await connection.query("SET FOREIGN_KEY_CHECKS = 1");
        connection.release();
    }
}

main();