const express = require('express');

const router = express.Router();
// controller path
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware');
const sameUserCheck = require('../middleware/sameUserChecker');

router.post('/createCompany', authMiddleware,companyController.createCompany);
router.get('/getAllCompany', authMiddleware,companyController.getAllCompany);
router.get('/getCompanyById', authMiddleware,companyController.getCompanyById);
router.put('/adminUpdateStatus', authMiddleware,companyController.updateStatusById);
router.post('/updateCompany', authMiddleware,companyController.updateCompany);

module.exports = router;