exports.initDataBase = async (db) => {
    await exports.runSync(db, `
        CREATE TABLE IF NOT EXISTS RESTAURANTS (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            address TEXT NOT NULL,
            phone TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
    )
    await exports.runSync(db, `
        CREATE TABLE IF NOT EXISTS USERS (
            id INTEGER PRIMARY KEY,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            username TEXT NOT NULL,
            restaurantId INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(restaurantId) REFERENCES RESTAURANTS(id)
        );`
    )
    await exports.runSync(db, `
        CREATE TABLE IF NOT EXISTS BANKNOTESUMMARY (
            id INTEGER PRIMARY KEY,
            francJson TEXT NOT NULL,
            totalTpe1 Real NOT NULL,
            totalTpe2 Real NOT NULL,
            totalWebsite Real NOT NULL,
            totalAdvance Real NOT NULL,
            Totals Real NOT NULL,
            userId INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(userId) REFERENCES USERS(id)
        );`
    )
    await exports.runSync(db, `
        CREATE TABLE IF NOT EXISTS CHARGES (
            id INTEGER PRIMARY KEY,
            chargeLabel TEXT NOT NULL,
            chargeValue Real NOT NULL,
            bankNoteSummaryId INTEGER NOT NULL,
            FOREIGN KEY(bankNoteSummaryId) REFERENCES BANKNOTESUMMARY(id)
        );`
    )
};
exports.runSync = function (db, sql, params) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
};
exports.getSync = function (db, sql, params) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, function (err, row) {
            if (err) reject(err);
            else resolve(row);
        });
    });
};
exports.getAllSync = function (db, sql, params) {
    return new Promise((resolve, reject) => {
        db.all(sql, params ? params : [], function (err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
