const express = require('express');

const router = express.Router();
// controller path
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createContact', authMiddleware,contactController.createContact);
router.get('/getAllContact', authMiddleware,contactController.getAllContact);


module.exports = router;