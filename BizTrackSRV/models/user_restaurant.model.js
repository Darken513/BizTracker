const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname+"/../database.db");
const db_utils = require('../services/database')

exports.createNew = async ({ userId, restaurantId }) => {
    try {
        return await db_utils.runSync(db, `INSERT INTO USER_RESTAURANT (userId, restaurantId) VALUES (?, ?)`, [userId, restaurantId]);
    } catch (err) {
        console.log(err);
        return { error: err.message.includes('SQLITE_CONSTRAINT') ? 'User-restaurant association already exists' : 'An error has occurred' };
    }
}