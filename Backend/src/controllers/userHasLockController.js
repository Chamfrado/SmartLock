const { validationResult } = require('express-validator');
const database = require('../database/db');

const UserHasLock = require('../models/userHasLock')


const initDatabase = (req, res) => {
    const sqlQuery =  'CREATE TABLE IF NOT EXISTS user_has_lock(id int AUTO_INCREMENT, serial_lock VARCHAR(50), user_id INTEGER,PRIMARY KEY(id),FOREIGN KEY (serial_lock) REFERENCES lockl(serial_lock), FOREIGN KEY (user_id) REFERENCES user(id))';

    database.query(sqlQuery, (err) => {
        if (err) throw err;

        res.send('Table created!')
    });
};


//List All UserHasLock
const listAllUserHasLocks = (req, res) => {
    const sqlQuery = 'SELECT * FROM user_has_lock';

    console.log(`sqlQuery: ${sqlQuery}`);

    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        res.json({ 'userHasLock': result });
    });
};

//Get by Id
const getUserHasLockById = (req, res) => {
    
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const UserHasLock = {
            id: req.body.id
        };
    }

    const sqlQuery = 'SELECT * FROM user_has_lock where id = ?';

    console.log(`sqlQuery: ${sqlQuery}`);

    database.query(sqlQuery,req.body.id,  (err, result) => {
        if (err) throw err;

        res.json({ 'userHasLock': result });
    });
};

//Add UserHasLock
const addUserHasLock = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const UserHasLock = {
            serial_lock: req.body.serial_lock,
            user_id: req.body.user_id,

        };

        const sqlQuery = 'INSERT INTO user_has_lock SET ?';
        console.log(`sqlQuery: ${sqlQuery}`);
        database.query(sqlQuery, UserHasLock, (err, row) => {
            if (err) throw err;

            res.send('UserHasLock add successfully!');
        });
    }
};

//Delete UserHasLock
const deleteUserHasLock = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const userHasLock = {
            id: req.body.id
        };

        const sqlQuery = 'DELETE FROM user_has_lock WHERE id = ?';
        console.log(`sqlQuery: ${sqlQuery}`);
        database.query(sqlQuery, req.body.id, (err, row) => {
            if (err) throw err;

            res.send('UserHasLock deleted successfully!');
        });
    }
};


//Update UserHasLock
const updateUserHasLock = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const userHasLock = {
            serial_lock: req.body.serial_lock,
            user_id: req.body.user_id,

        };

        const sqlQuery = 'UPDATE user_has_lock SET ? WHERE id = '+req.body.id;
        console.log(`sqlQuery: ${sqlQuery}`);

        database.query(sqlQuery, userHasLock, (err, row) => {
            if (err) throw err;

            res.send('UserHasLock updated successfully!');
        });
    }
};





module.exports = {
    initDatabase,
    listAllUserHasLocks: listAllUserHasLocks,
    getUserHasLockById: getUserHasLockById,
    addUserHasLock,
    deleteUserHasLock,
    updateUserHasLock,
}
