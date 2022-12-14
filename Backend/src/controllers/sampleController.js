const { validationResult } = require('express-validator');
const database = require('../database/db');

const SampleUser = require("../models/sample");

const initDatabase = (req, res) => {
    const sqlQuery =  'CREATE TABLE IF NOT EXISTS emails(id int AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), PRIMARY KEY(id))';

    database.query(sqlQuery, (err) => {
        if (err) throw err;

        res.send('Table created!')
    });
};

const getFirstSubscribersSample = (req, res) => {
    const sqlQuery = 'SELECT * FROM emails';

    console.log(`sqlQuery: ${sqlQuery}`);

    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        res.json({ 'created_users': result });
    });
};

const getSecondSubscribersSample = (req, res) => {
    const sqlQuery = 'SELECT * FROM emails';

    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        let subscribers = [];
        result.forEach(user => {

            console.log('db user: ' + JSON.stringify(user));

            let sampleUser = new SampleUser(user.id, user.firstname, user.lastname, user.email);

            console.log(`user.id ${sampleUser.id}`);
            console.log(`user.firstname ${sampleUser.firstname}`);
            console.log(`user.lastname ${sampleUser.lastname}`);
            console.log(`user.email ${sampleUser.email}`);

            subscribers.push(sampleUser);
        });

        res.json(subscribers);
    });
};

const addSubscriber = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const subscriber = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        };

        const sqlQuery = 'INSERT INTO emails SET ?';

        database.query(sqlQuery, subscriber, (err, row) => {
            if (err) throw err;

            res.send('Subscribed successfully!');
        });
    }
};

module.exports = {
    initDatabase,
    getFirstSubscribersSample: getFirstSubscribersSample,
    getSecondSubscribersSample: getSecondSubscribersSample,
    addSubscriber
}