const express = require('express');

const router = express.Router();
const loginController = require('../../controllers/frontendController/loginController');
const authMiddleware = require('../../middleware/authMiddleware');
// const authorizeMiddleware = require('../middleware/authorization');
// const sameUserCheck= require('../middleware/sameUserCheck');

router.get('/login', loginController.renderLoginPage);
router.get('/jobs', authMiddleware,loginController.userLoginPage);
router.get('/register', loginController.renderRegisterPage);
router.get('/createTodo', loginController.renderCreateTodoPage);
router.get('/createCompany', loginController.renderCompanyRegisterPage);
router.get('/userpage', authMiddleware,loginController.userLoginPage);

router.get('/jobapplication', authMiddleware, loginController.renderjobapplicationPage);
router.get('/companies', authMiddleware, loginController.renderCompaniesPage);
router.get('/companies', authMiddleware, loginController.renderCompaniesPage);
router.get('/termsAndConditions', authMiddleware, loginController.renderTermsAndConditionsPage);
router.get('/mePage', authMiddleware, loginController.renderMePage);
router.get('/contact', authMiddleware, loginController.renderContactPage);
router.get('/company', authMiddleware, loginController.renderCompanyPage);
router.get('/companyJobs', authMiddleware, loginController.renderCompanyJobsPage);
router.get('/contactCompany', authMiddleware, loginController.renderContactCompanyPage);
router.get('/termsCompany', authMiddleware, loginController.rendertermsCompanyPage);
router.get('/jobapplicationCompany', authMiddleware, loginController.renderJobApplicationsCompanyPage);
router.get('/meCompany', authMiddleware, loginController.rendermeCompanyPage);
router.get('/admindashbord', authMiddleware, loginController.renderAdminDashboard);
router.get('/adminCompany', authMiddleware, loginController.renderAdminCompany);
router.get('/adminprofile', authMiddleware, loginController.renderAdminProfilePage);
router.get('/adminContact', authMiddleware, loginController.renderAdminContact);
module.exports = router;