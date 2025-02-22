const express = require('express');

const router = express.Router();
// controller path
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/addjob', authMiddleware,jobController.createJob);
router.get('/getAllJob', authMiddleware,jobController.getAllJob);
router.post('/updatejobStatus', jobController.updateJobStatusById);
module.exports = router;