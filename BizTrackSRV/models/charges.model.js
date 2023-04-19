const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const db_utils = require('../services/database')

exports.createNew = async ({chargeLabel, chargeValue, bankNoteSummaryId}) => {
    try {
        return await db_utils.runSync(db, `INSERT INTO CHARGES (chargeLabel, chargeValue, bankNoteSummaryId) VALUES (?, ?, ?)`, [chargeLabel, chargeValue, bankNoteSummaryId]);
    } catch (err) {
        console.log(err)
        return { error: err.message.includes('SQLITE_CONSTRAINT') ? 'Charges already exists' : 'An error has occurred' };
    }
}
exports.getById = async (id) => {
    const query = `SELECT * FROM CHARGES WHERE id = ?`;
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
        let rows = await db_utils.getAllSync(db, `SELECT * FROM CHARGES`);
        return rows ? rows : [];
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}
exports.getBybanknoteSummaryId = async (id) => {
    const query = `SELECT * FROM CHARGES WHERE bankNoteSummaryId = ?`;
    try {
        let rows = await db_utils.getAllSync(db, query, [id]);
        return rows ? rows : []; //refactor this into a base model class
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}