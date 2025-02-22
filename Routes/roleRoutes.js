const express = require('express');

const router = express.Router();
// controller path
const roleController = require('../controllers/roles');

router.post('/addrole', roleController.createRole);

module.exports = router;