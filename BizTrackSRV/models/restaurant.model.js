const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname+"/../database.db");
const db_utils = require('../services/database')
const usersDB = require("../models/user.model");

exports.createNew = async ({name, email, address, phone}) => {
    try {
        return await db_utils.runSync(db, `INSERT INTO RESTAURANTS (name, email, address, phone) VALUES (?, ?, ?, ?)`, [name, email, address, phone]);
    } catch (err) {
        console.log(err)
        return { error: err.message.includes('SQLITE_CONSTRAINT') ? 'Restaurant already exists' : 'An error has occurred' };
    }
}
exports.getById = async (id) => {
    const query = `SELECT * FROM RESTAURANTS WHERE id = ?`;
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
        let rows = await db_utils.getAllSync(db, `SELECT * FROM RESTAURANTS`);
        return rows ? rows : [];
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}
exports.getAllwithDetails = async () => {
    try {
        let rows = await db_utils.getAllSync(db, `SELECT * FROM RESTAURANTS`);
        for (let idx = 0; idx < rows.length; idx++) {
            const restaurant = rows[idx];
            let users = await usersDB.getAllByResturantId(restaurant.id);
            restaurant.users = users;
        }
        return rows ? rows : [];
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}
