const db = require("./backend/db");
const { faker } = require("@faker-js/faker");

const TOTAL_USERS = 3000;
const BATCH_SIZE = 500;

async function main() {
    const connection = await db.getConnection();

    console.log("Insertando usuarios con role_id = 3...");

    try {
        await connection.beginTransaction();

        // (Opcional) asegurar que el rol 3 exista
        await connection.query(`
            INSERT IGNORE INTO roles (id, role_name)
            VALUES (3, 'user')
        `);

        for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
            const batch = [];

            for (let j = 0; j < BATCH_SIZE && (i + j) < TOTAL_USERS; j++) {
                const unique = Date.now() + "_" + (i + j);

                batch.push([
                    "user_" + unique,                         // username
                    "user_" + unique + "@mail.com",           // email
                    "$2b$10$hashedpassword",                  // password fake
                    3,                                        // role_id
                    faker.internet.username(),                // nickname
                    true                                      // is_active
                ]);
            }

            await connection.query(`
                INSERT INTO users
                (username, email, password, role_id, nickname, is_active)
                VALUES ?
            `, [batch]);

            console.log(`Insertados: ${Math.min(i + BATCH_SIZE, TOTAL_USERS)}`);
        }

        await connection.commit();
        console.log("Usuarios role_id=3 insertados correctamente");

    } catch (err) {
        await connection.rollback();
        console.error("Error:", err);
    } finally {
        connection.release();
    }
}

main();