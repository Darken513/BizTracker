exports.initDataBase = async (db) => {
    await exports.runSync(db, `
        CREATE TABLE IF NOT EXISTS USERS (
            id INTEGER PRIMARY KEY,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            username TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
