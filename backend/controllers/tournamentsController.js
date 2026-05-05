/*
    File: tournamentsController.js
    Description: Handles tournament CRUD operations, search optimization,
    and user registration with activity logging.
*/

const db = require("../db");
const logActivity = require("../utils/activityLogger");

/*
    Get tournaments with optional filters:
    - active: filters only active tournaments
    - search: filters by tournament name
    - limit & offset: pagination support for large datasets
*/
exports.getTournaments = async (req, res) => {
    const { active, search = "", limit = 10, offset = 0 } = req.query;

    let sql = `
        SELECT t.id, t.name, t.prize_pool, t.start_date
        FROM tournaments t
        WHERE 1=1
    `;

    let values = [];

    // Filter only active tournaments
    if (active == 1 || active === "true") {
        sql += " AND t.is_active = ?";
        values.push(1);
    }

    // Search by tournament name
    if (search) {
        sql += " AND t.name LIKE ?";
        values.push(`%${search}%`);
    }

    // Apply ordering and pagination
    sql += " ORDER BY t.start_date DESC LIMIT ? OFFSET ?";
    values.push(parseInt(limit), parseInt(offset));

    try {
        const [results] = await db.query(sql, values);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};

/*
    Create a new tournament
    Automatically assigns default status_id = 1 and sets active = true
*/
exports.createTournament = async (req, res) => {
    const { name, game_id, prize_pool, start_date, creator_id } = req.body;

    try {
        const [result] = await db.query(
            `
            INSERT INTO tournaments 
            (name, game_id, prize_pool, start_date, status_id, creator_id, is_active)
            VALUES (?, ?, ?, ?, 1, ?, 1)
            `,
            [name, game_id, prize_pool, start_date, creator_id]
        );

        const tournamentId = result.insertId;

        // Log tournament creation activity
        await logActivity({
            user_id: creator_id,
            tournament_id: tournamentId,
            action_type: "NEW_TOURNAMENT",
            description: `New tournament created: ${name}`
        });

        res.json({ message: "Tournament created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};

/*
    Update existing tournament data
*/
exports.updateTournament = async (req, res) => {
    const { id } = req.params;
    const { name, game_id, prize_pool, start_date, status_id, is_active, editor_id } = req.body;

    try {
        await db.query(
            `
            UPDATE tournaments
            SET name = ?, game_id = ?, prize_pool = ?, start_date = ?, status_id = ?, is_active = ?
            WHERE id = ?
            `,
            [name, game_id, prize_pool, start_date, status_id, is_active, id]
        );

        // Log update activity
        await logActivity({
            user_id: editor_id,
            tournament_id: id,
            action_type: "EDIT_TOURNAMENT",
            description: `Tournament updated: ${name}`
        });

        res.json({ message: "Tournament updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};

/*
    Register a user to a tournament
    Includes validation to prevent duplicate registrations
*/
exports.registerTournament = async (req, res) => {
    const { user_id, tournament_id } = req.body;

    try {
        // Check if user is already registered
        const [existing] = await db.query(
            `SELECT id FROM registration 
             WHERE user_id = ? AND tournament_id = ?`,
            [user_id, tournament_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: "Already registered" });
        }

        // Validate that the tournament exists
        const [tournament] = await db.query(
            `SELECT name FROM tournaments WHERE id = ?`,
            [tournament_id]
        );

        if (tournament.length === 0) {
            return res.status(404).json({ error: "Tournament not found" });
        }

        const tournamentName = tournament[0].name;

        // Insert registration record
        await db.query(
            `INSERT INTO registration 
             (user_id, tournament_id, registration_date) 
             VALUES (?, ?, NOW())`,
            [user_id, tournament_id]
        );

        // Log registration activity
        await logActivity({
            user_id,
            tournament_id,
            action_type: "REGISTER_TOURNAMENT",
            description: `User registered for tournament ${tournamentName}`
        });

        // Send success response to frontend
        res.json({ message: "Registration successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};