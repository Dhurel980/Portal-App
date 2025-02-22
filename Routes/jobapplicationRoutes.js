const express = require('express');

const router = express.Router();
// controller path
const jobApplicationController = require('../controllers/JobApplicationController');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/addjobApplication', authMiddleware, jobApplicationController.createJobApplication);
router.get('/getjobapplication', authMiddleware, jobApplicationController.getAllJobApplication)
module.exports = router;