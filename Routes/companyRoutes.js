const express = require('express');

const router = express.Router();
// controller path
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware');
const sameUserCheck = require('../middleware/sameUserChecker');

router.post('/createCompany', companyController.createCompany);
router.get('/getAllCompany', authMiddleware,companyController.getAllCompany);
router.get('/getCompanyById', authMiddleware,companyController.getCompanyById);
router.post('/adminUpdateStatus', authMiddleware,companyController.updateStatusById);
router.post('/updateCompany', authMiddleware,companyController.updateCompany);
router.post('/deleteById', authMiddleware,companyController.deleteCompanyById);
module.exports = router;