const express = require('express');

const router = express.Router();
// controller path
const jobApplicationController = require('../controllers/JobApplicationController');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/addjobApplication', authMiddleware, jobApplicationController.createJobApplication);
router.get('/getUserJobapplication', authMiddleware, jobApplicationController.getAllUserJobApplications);
router.get('/getCompanyJobapplication', authMiddleware, jobApplicationController.getAllCompanyJobApplication);
router.post('/updateStatus', authMiddleware, jobApplicationController.updateJobApplicationStatus)
module.exports = router;