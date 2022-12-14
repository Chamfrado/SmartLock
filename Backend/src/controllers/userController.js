const { validationResult } = require('express-validator');
const database = require('../database/db');

const User = require('../models/user')


const initDatabase = (req, res) => {
    const sqlQuery =  'CREATE TABLE IF NOT EXISTS user(id int AUTO_INCREMENT, name_user VARCHAR(50),email_user VARCHAR(50), phone_user VARCHAR(50),pass_user VARCHAR(50),cpf_user VARCHAR(50),PRIMARY KEY(id),UNIQUE KEY (phone_user),UNIQUE KEY (email_user),UNIQUE KEY (cpf_user))';

    database.query(sqlQuery, (err) => {
        if (err) throw err;

        res.send('Table created!')
    });
};


//List All User
const listAllUsers = (req, res) => {
    const sqlQuery = 'SELECT * FROM user';

    console.log(`sqlQuery: ${sqlQuery}`);

    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        res.json({ 'user': result });
    });
};

//Get by Id
const getUserById = (req, res) => {
    
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const User = {
            id: req.body.id
        };
    }

    const sqlQuery = 'SELECT * FROM user where id = ?';

    console.log(`sqlQuery: ${sqlQuery}`);

    database.query(sqlQuery,req.body.id,  (err, result) => {
        if (err) throw err;

        res.json({ 'user': result });
    });
};

//Add User
const addUser = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const User = {
            name_user: req.body.name_user,
            phone_user: req.body.phone_user,
            pass_user: req.body.pass_user,
            cpf_user: req.body.cpf_user,
            email_user: req.body.email_user

        };

        const sqlQuery = 'INSERT INTO user SET ?';
        console.log(`sqlQuery: ${sqlQuery}`);
        database.query(sqlQuery, User, (err, row) => {
            if (err) throw err;

            res.send('User add successfully!');
        });
    }
};

//Delete User
const deleteUser = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const user = {
            id: req.body.id
        };

        const sqlQuery = 'DELETE FROM user WHERE id = ?';
        console.log(`sqlQuery: ${sqlQuery}`);
        database.query(sqlQuery, req.body.id, (err, row) => {
            if (err) throw err;

            res.send('User deleted successfully!');
        });
    }
};


//Update User
const updateUser = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const user = {
            
            name_user: req.body.name_user,
            phone_user: req.body.phone_user,
            pass_user: req.body.pass_user,
            cpf_user: req.body.cpf_user,
            email_user: req.body.email_user
        };

        const sqlQuery = 'UPDATE user SET ? WHERE id = '+req.body.id;
        console.log(`sqlQuery: ${sqlQuery}`);

        database.query(sqlQuery, user, (err, row) => {
            if (err) throw err;

            res.send('User updated successfully!');
        });
    }
};



//AUTENTICATE
 const autenticUser  = (req, res) => {
    
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const User = {
            phone_user: req.body.phone_user,
            pass_user: req.body.pass_user
        };
    }

    const sqlQuery = 'SELECT * FROM user where phone_user = '+ req.body.phone_user + ' AND pass_user = "'+ req.body.pass_user+ '"';
    const sqlQuery2 = 'SELECT COUNT(*) as count FROM user where phone_user = '+ req.body.phone_user + ' AND pass_user = "'+ req.body.pass_user+ '"';

    console.log(`sqlQuery: ${sqlQuery}`);

    
    database.query(sqlQuery2,(error, result2) =>{

        console.log(result2[0]);
        chave = result2[0].count ;
        console.log(result2);
        console.log('ASALAMALEIKO '+chave)
        if(chave > 0){
            database.query(sqlQuery,  (err, result) => {
            if (err) throw err;
                 res.json({ 'user': result });
             });
                
                
        }else{
            res.send('recusado');
        }
        
    })
 }

module.exports = {
    initDatabase,
    listAllUsers: listAllUsers,
    getUserById: getUserById,
    addUser,
    deleteUser,
    updateUser,
    autenticUser
}
