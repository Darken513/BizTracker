const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const db_utils = require('../services/database')

exports.createNew = async ({francJson, totalTpe1, totalTpe2, totalWebsite, totalAdvance, Totals, userId}) => {
    try {
        return await db_utils.runSync(db, `INSERT INTO BANKNOTESUMMARY (francJson, totalTpe1, totalTpe2, totalWebsite, totalAdvance, Totals, userId) VALUES (?, ?, ?, ?, ?, ?, ?)`, [francJson, totalTpe1, totalTpe2, totalWebsite, totalAdvance, Totals, userId]);
    } catch (err) {
        return { error: err.message.includes('SQLITE_CONSTRAINT') ? 'Banknote Summary already exists' : 'An error has occurred' };
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
        let rows = await db_utils.getAllSync(db, `select bn.id, bn.francjson, bn.totalTpe1, bn.totalTpe2, bn.totalWebsite, bn.totalAdvance, ch.chargeLabel, ch.chargeValue, bn.Totals from BANKNOTESUMMARY bn join CHARGES ch on bn.id = ch.bankNoteSummaryId `);
        return rows ? rows : [];
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}
