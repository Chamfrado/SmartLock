const { validationResult } = require('express-validator');
const database = require('../database/db');

const Lock = require('../models/lock')


const initDatabase = (req, res) => {
    const sqlQuery =  'CREATE TABLE IF NOT EXISTS lockl(id int AUTO_INCREMENT, serial_lock VARCHAR(50),PRIMARY KEY(id),UNIQUE KEY (serial_lock))';

    database.query(sqlQuery, (err) => {
        if (err) throw err;

        res.send('Table created!')
    });
};


//List All Lock
const listAllLocks = (req, res) => {
    const sqlQuery = 'SELECT * FROM lockl';

    console.log(`sqlQuery: ${sqlQuery}`);

    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        res.json({ 'lock': result });
    });
};

//Get by Id
const getLockById = (req, res) => {
    
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const Lock = {
            id: req.body.id
        };
    }

    const sqlQuery = 'SELECT * FROM lockl where id = ?';

    console.log(`sqlQuery: ${sqlQuery}`);

    database.query(sqlQuery,req.body.id,  (err, result) => {
        if (err) throw err;

        res.json({ 'lock': result });
    });
};

//Add Lock
const addLock = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const Lock = {
            serial_lock: req.body.serial_lock,

        };

        const sqlQuery = 'INSERT INTO lockl SET ?';
        console.log(`sqlQuery: ${sqlQuery}`);
        database.query(sqlQuery, Lock, (err, row) => {
            if (err) throw err;

            res.send('Lock add successfully!');
        });
    }
};

//Delete Lock
const deleteLock = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const lock = {
            id: req.body.id
        };

        const sqlQuery = 'DELETE FROM lockl WHERE id = ?';
        console.log(`sqlQuery: ${sqlQuery}`);
        database.query(sqlQuery, req.body.id, (err, row) => {
            if (err) throw err;

            res.send('Lock deleted successfully!');
        });
    }
};


//Update Lock
const updateLock = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const lock = {
            
            serial_lock: req.body.serial_lock,
        };

        const sqlQuery = 'UPDATE lockl SET ? WHERE id = '+req.body.id;
        console.log(`sqlQuery: ${sqlQuery}`);

        database.query(sqlQuery, lock, (err, row) => {
            if (err) throw err;

            res.send('Lock updated successfully!');
        });
    }
};





module.exports = {
    initDatabase,
    listAllLocks: listAllLocks,
    getLockById: getLockById,
    addLock,
    deleteLock,
    updateLock,
}
