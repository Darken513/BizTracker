const bcrypt = require('bcrypt');
const saltRounds = 10;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const db_utils = require('../services/database')

exports.createNew = async ({ password, email, address, phone, username}) => {
    let hash = bcrypt.hashSync(password, saltRounds);
    try {
        return await db_utils.runSync(db, `INSERT INTO USERS (password, email, username, address, phone) VALUES (?, ?, ?, ?, ?)`, [hash, email, username, address, phone]);
    } catch (err) {
        console.log(err)
        return { error: err.message.includes('SQLITE_CONSTRAINT') ? 'User already exists' : 'An error has occurred' };
    }
}
exports.getByEmail = async (email) => {
    const query = `SELECT * FROM USERS WHERE email = ?`;
    try {
        let row = await db_utils.getSync(db, query, [email]);
        if (!row) {
            return undefined;
        }
        return row;
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}
exports.getByUsername = async (username) => {
    const query = `SELECT * FROM USERS WHERE username = ?`;
    try {
        let row = await db_utils.getSync(db, query, [username]);
        if (!row) {
            return undefined;
        }
        return row;
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}
exports.getById = async (id) => {
    const query = `SELECT * FROM USERS WHERE id = ?`;
    try {
        let row = await db_utils.getSync(db, query, [id]);
        return row ? row : undefined; //refactor this into a base model class
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}
exports.getAllByResturantId = async (restaurant_id) => {
    const query = `SELECT u.* FROM USERS u join USER_RESTAURANT ur on u.id = ur.userId WHERE ur.restaurantId = ?`;
    try {
        let row = await db_utils.getAllSync(db, query, [restaurant_id]);
        return row ? row : undefined; //refactor this into a base model class
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}
exports.getByEmailAndPassword = async (email, plaintextPassword) => {
    const query = `SELECT * FROM USERS WHERE email = ?`;
    try {
        let row = await db_utils.getSync(db, query, [email]);
        if (!row) {
            return undefined;
        }
        const isPasswordMatch = bcrypt.compareSync(plaintextPassword, row.password);
        if (isPasswordMatch) {
            return row;
        } else {
            return undefined;
        }
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}
exports.getByUsernameAndPassword = async (username, plaintextPassword) => {
    const query = `SELECT * FROM USERS WHERE username = ?`;
    try {
        let row = await db_utils.getSync(db, query, [username]);
        if (!row) {
            return undefined;
        }
        const isPasswordMatch = bcrypt.compareSync(plaintextPassword, row.password);
        if (isPasswordMatch) {
            return row;
        } else {
            return undefined;
        }
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}

exports.getAll = async () => {
    try {
        let rows = await db_utils.getAllSync(db, `SELECT * FROM USERS`);
        return rows ? rows : [];
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}
