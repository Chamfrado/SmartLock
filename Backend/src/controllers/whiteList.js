const { validationResult } = require('express-validator');
const database = require('../database/db');

const WhiteList = require('../models/whiteList')


const initDatabase = (req, res) => {
    const sqlQuery =  'CREATE TABLE IF NOT EXISTS white_list(id int AUTO_INCREMENT, uhl_id VARCHAR(50), user_id INTEGER,PRIMARY KEY(id),FOREIGN KEY (uhl_id) REFERENCES user_has_lock(id), FOREIGN KEY (user_id) REFERENCES user(id))';

    database.query(sqlQuery, (err) => {
        if (err) throw err;

        res.send('Table created!')
    });
};


//List All WhiteList
const listAllWhiteLists = (req, res) => {
    const sqlQuery = 'SELECT * FROM white_list';

    console.log(`sqlQuery: ${sqlQuery}`);

    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        res.json({ 'whiteList': result });
    });
};

//Get by Id
const getWhiteListById = (req, res) => {
    
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const WhiteList = {
            id: req.body.id
        };
    }

    const sqlQuery = 'SELECT * FROM white_list where id = ?';

    console.log(`sqlQuery: ${sqlQuery}`);

    database.query(sqlQuery,req.body.id,  (err, result) => {
        if (err) throw err;

        res.json({ 'whiteList': result });
    });
};

//Add WhiteList
const addWhiteList = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const WhiteList = {
            uhl_id: req.body.uhl_id,
            user_id: req.body.user_id,

        };

        const sqlQuery = 'INSERT INTO white_list SET ?';
        console.log(`sqlQuery: ${sqlQuery}`);
        database.query(sqlQuery, WhiteList, (err, row) => {
            if (err) throw err;

            res.send('WhiteList add successfully!');
        });
    }
};

//Delete WhiteList
const deleteWhiteList = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const whiteList = {
            id: req.body.id
        };

        const sqlQuery = 'DELETE FROM white_list WHERE id = ?';
        console.log(`sqlQuery: ${sqlQuery}`);
        database.query(sqlQuery, req.body.id, (err, row) => {
            if (err) throw err;

            res.send('WhiteList deleted successfully!');
        });
    }
};


//Update WhiteList
const updateWhiteList = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const whiteList = {
            uhl_id: req.body.uhl_id,
            user_id: req.body.user_id,

        };

        const sqlQuery = 'UPDATE white_list SET ? WHERE id = '+req.body.id;
        console.log(`sqlQuery: ${sqlQuery}`);

        database.query(sqlQuery, whiteList, (err, row) => {
            if (err) throw err;

            res.send('WhiteList updated successfully!');
        });
    }
};





module.exports = {
    initDatabase,
    listAllWhiteLists: listAllWhiteLists,
    getWhiteListById: getWhiteListById,
    addWhiteList,
    deleteWhiteList,
    updateWhiteList,
}
