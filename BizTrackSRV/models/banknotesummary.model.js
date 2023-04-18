const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const db_utils = require('../services/database')

exports.createNew = async (francJson, totalTpe1, totalTpe2, totalWebsite, totalAdvance, Totals, userId) => {
    try {
        return await db_utils.runSync(db, `INSERT INTO BANKNOTESUMMARY (francJson, totalTpe1, totalTpe2, totalWebsite, totalAdvance, Totals, userId) VALUES (?, ?, ?, ?, ?, ?, ?)`, [francJson, totalTpe1, totalTpe2, totalWebsite, totalAdvance, Totals, userId]);
    } catch (err) {
        return { error: err.message.includes('SQLITE_CONSTRAINT') ? 'Restaurant already exists' : 'An error has occurred' };
    }
}
exports.getById = async (id) => {
    const query = `SELECT * FROM BANKNOTESUMMARY WHERE id = ?`;
    try {
        let row = await db_utils.getSync(db, query, [id]);
        return row ? row : undefined; //refactor this into a base model class
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}
exports.getAll = async () => {
    try {
        let rows = await db_utils.getAllSync(db, `SELECT * FROM BANKNOTESUMMARY`);
        return rows ? rows : [];
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}
