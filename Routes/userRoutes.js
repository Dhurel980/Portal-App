const express = require('express');

const router = express.Router();
// controller path
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


// control 
router.post('/addcompany', userController.UsersController.registerCompany);
router.post('/addjobseeker', userController.UsersController.registerJobseeker);
router.post('/addAdmin', userController.UsersController.registerAdmin);
router.get('/getuserbyid', authMiddleware, userController.getUserById);
router.get('/getusers', authMiddleware, userController.getAllUser);
router.put('/updatebyid', userController.updateUserById);
router.delete('/deletebyid', userController.deleteUserById);
router.post('/login', userController.LoginUser);
router.post('/logout', userController.logout);
module.exports = router;