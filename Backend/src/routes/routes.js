const express = require('express');
const { body } = require('express-validator');
const routes = new express.Router();

const sampleController = require('../controllers/sampleController');
const userController = require('../controllers/userController');
const lockController = require('../controllers/lockController');
const userHasLockController = require('../controllers/userHasLockController');
const whiteListController = require('../controllers/whiteList');

// sample routes ------------------------------------
routes.get('/init', sampleController.initDatabase);

routes.get('/first-sample', sampleController.getFirstSubscribersSample);

routes.get('/second-sample', sampleController.getSecondSubscribersSample);

routes.post('/subscribe',
    body('email').isEmail().normalizeEmail(),
    body('firstname').not().isEmpty().escape(),
    body('lastname').not().isEmpty().escape(),
    sampleController.addSubscriber
);
// end of sample routes ------------------------------

//User Routes --------------------------------------
routes.get('/user/init', userController.initDatabase);

routes.get('/user/list', userController.listAllUsers);

routes.post('/user/add',
    body('name_user').not().isEmpty().escape(),
    body('phone_user').not().isEmpty().escape(),
    body('cpf_user').not().isEmpty().escape(),
    body('email_user').not().isEmpty().escape(),
    body('pass_user').not().isEmpty().escape(),
    userController.addUser
);


routes.put('/user/update',
    body('name_user').not().isEmpty().escape(),
    body('name_user').not().isEmpty().escape(),
    body('phone_user').not().isEmpty().escape(),
    body('cpf_user').not().isEmpty().escape(),
    body('email_user').not().isEmpty().escape(),
    body('pass_user').not().isEmpty().escape(),
    userController.updateUser);

routes.delete('/user/delete',
    body('id').not().isEmpty().escape(),
    userController.deleteUser);
// end of user routes ------------------------------

//Lock Routes --------------------------------------
routes.get('/lock/init', lockController.initDatabase);

routes.get('/lock/list', lockController.listAllLocks);

routes.post('/lock/add',
    body('serial_lock').not().isEmpty().escape(),
    lockController.addLock
);


routes.put('/lock/update',
    body('serial_lock').not().isEmpty().escape(),
    lockController.updateLock);

routes.delete('/lock/delete',
    body('id').not().isEmpty().escape(),
    lockController.deleteLock);
// end of lock routes ------------------------------

//UHL Routes --------------------------------------
routes.get('/uhl/init', userHasLockController.initDatabase);

routes.get('/uhl/list', userHasLockController.listAllUserHasLocks);

routes.post('/uhl/add',
    body('serial_lock').not().isEmpty().escape(),
    userHasLockController.addUserHasLock
);


routes.put('/uhl/update',
    body('serial_lock').not().isEmpty().escape(),
    userHasLockController.updateUserHasLock);

routes.delete('/uhl/delete',
    body('id').not().isEmpty().escape(),
    userHasLockController.deleteUserHasLock);
// end of UHL routes ------------------------------

//White List Routes --------------------------------------
routes.get('/white_list/init', whiteListController.initDatabase);

routes.get('/white_list/list', whiteListController.listAllWhiteLists);

routes.post('/white_list/add',
    body('uhl_id').not().isEmpty().escape(),
    body('user_id').not().isEmpty().escape(),
    whiteListController.addWhiteList
);


routes.put('/white_list/update',
    body('uhl_id').not().isEmpty().escape(),
    body('user_id').not().isEmpty().escape(),
    whiteListController.updateWhiteList);

routes.delete('/white_list/delete',
    body('id').not().isEmpty().escape(),
    whiteListController.deleteWhiteList);
// end of White List routes ------------------------------




module.exports = routes;