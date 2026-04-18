const db = require('../db');
const bcrypt = require('bcrypt');

async function migratePasswords() {
    try {
        const [users] = await db.query('SELECT id, password FROM users');

        for (const user of users) {
            const plainPassword = user.password;

            const hashedPassword = await bcrypt.hash(plainPassword, 10);

            await db.query(
                'UPDATE users SET password = ? WHERE id = ?',
                [hashedPassword, user.id]
            );

            console.log(`User ${user.id} updated`);
        }

        console.log('Migration completed');
        process.exit();

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

migratePasswords();