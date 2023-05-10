const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.initDataBase = async (db) => {
    await exports.runSync(db, `
        CREATE TABLE IF NOT EXISTS RESTAURANTS (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            email TEXT,
            address TEXT,
            img TEXT,
            phone TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
    )
    await exports.runSync(db, `
        CREATE TABLE IF NOT EXISTS USERS (
            id INTEGER PRIMARY KEY,
            password TEXT NOT NULL,
            email TEXT,
            username TEXT NOT NULL UNIQUE,
            address TEXT,
            phone TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
    )
    await exports.runSync(db, `
        CREATE TABLE IF NOT EXISTS USER_RESTAURANT (
            id INTEGER PRIMARY KEY,
            userId INTEGER NOT NULL,
            restaurantId INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(userId) REFERENCES USERS(id),
            FOREIGN KEY(restaurantId) REFERENCES RESTAURANTS(id),
            UNIQUE(userId, restaurantId)
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
exports.createData = async function (db) {
    let usersList = [
        { username: "Ghassen", password: "3087" },
        { username: "Mourad", password: "1211" },
        { username: "Haj", password: "894" },
        { username: "Yakoub", password: "2204" },
        { username: "Khalil", password: "2601" },
        { username: "Wael", password: "2906" },
        { username: "Autre", password: "1111" }
    ];
    let restaurants = [
        { name: "Mio pizza Fribourg", img: "./../../../assets/MioPizzaFrigbourg.png", address: "Rle de la Rosière 2, 1700 Fribourg", phone: "+41 26 422 18 12" },
        { name: "Walima Fribourg", img: "./../../../assets/walimaFrigbourg.png", address: "Bd de Pérolles 18, 1700 Fribourg", phone: "+41 26 303 52 02" },
        { name: "Walima Payerne", img: "./../../../assets/walimaPayerne.png", address: "Rue de la Boverie 5, 1530 Payerne", phone: "+41 79 101 47 87" }
    ]
    for (let idx = 0; idx < usersList.length; idx++) {
        const user = usersList[idx];
        let hash = bcrypt.hashSync(user.password, saltRounds);
        try {
            await exports.runSync(db, `INSERT INTO USERS (password, username) VALUES (?, ?)`, [hash, user.username]);
        } catch (err) {
            console.log(err)
        }
    }
    for (let idx = 0; idx < restaurants.length; idx++) {
        const rest = restaurants[idx];
        try {
            await exports.runSync(db, `INSERT INTO RESTAURANTS (name, address, phone, img) VALUES (?, ?, ?, ?)`, [rest.name, rest.address, rest.phone, rest.img]);
        } catch (err) {
            console.log(err)
        }
    }
    let usersIds = await exports.getAllSync(db, `SELECT id FROM USERS`);
    let restsIds = await exports.getAllSync(db, `SELECT id FROM RESTAURANTS`);
    for (let idx = 0; idx < usersIds.length; idx++) {
        const userId = usersIds[idx];
        for (let idx2 = 0; idx2 < restsIds.length; idx2++) {
            const restaurantId = restsIds[idx2];
            try {
                await exports.runSync(db, `INSERT INTO USER_RESTAURANT (userId, restaurantId) VALUES (?, ?)`, [userId.id, restaurantId.id]);
            } catch (err) {
                console.log(err);
            }
        }
    }
    console.log("all done !");
}
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
