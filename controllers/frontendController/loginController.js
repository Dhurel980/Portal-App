const Role = require('../../models/role');
const User = require('../../models/user');
const Job = require('../../models/jobs');
const jobApplication = require('../../models/job_application')
const Company = require('../../models/company')
const renderLoginPage = (req, res) => {
    res.render('Login');
};

const userLoginPage = async (req, res) => {
    try {
        // Fetch the logged-in user
        const user = await User.findByPk(req.user.id, {
            attributes: ["id", "email", "roleId", "fullName"],
            include: [{
                model: Role,
                as: 'Role',
                attributes: ["name"],
            }],
        });

        if (!user) {
            res.clearCookie("token");
            return res.render("login", { user: null, jobs: [] });
        }

        console.log(`User  Logged In: ${user.fullName}, Role: ${user.Role.name}`);

        // Fetch available jobs
        const jobs = await Job.findAll({
            attributes: ["id", "title", "description", "requirements", "location", "salaryRange", "jobType", "deadline", "status", "companyId"],
        });

        // Role-Based Page Redirection
        let pageToRender = "jobs"; // Default for jobseeker
        let additionalData = {}; // Object to hold additional data

        if (user.Role.name === "admin") {
            pageToRender = "admindashbord";
        } else if (user.Role.name === "company") {
            pageToRender = "company";

            // Fetch company data if the user is a company
            console.log(req.user.companyId);
            const company = await Company.findByPk(req.user.companyId); // Assuming companyId is stored in the user model
            if (company) {
                additionalData.company = company; // Add company data to additionalData
            } else {
                console.error('Company not found for user:', user.id);
            }
        }

        return res.render(pageToRender, { 
            user: user.toJSON(), 
            jobs: jobs, 
            title: "Dashboard", 
            page: pageToRender,
            ...additionalData, // Spread additional data into the render context
        });

    } catch (error) {
        console.error(error);
        res.clearCookie("token");
        return res.render("login", { user: null, jobs: [], users: [] });
    }
};
    // const user = req.user;
    // console.log(req.user);
    // try {
    //     // Ensure the user is logged in and email is available
    //     if (!req.user) {
    //         return res.redirect('/login'); // Redirect if not logged in
    //     }

    //     // Fetch user details using Sequelize
    //     const user = await User.findOne({
    //         where: { email: req.user.email } // Fetch user by email
    //     });

    //     if (!user) {
    //         return res.redirect('/login'); // Redirect if user not found
    //     }

    //     // Render EJS page with user data
    //     res.render('user', { user });
    // } catch (error) {
    //     console.error("Error fetching user:", error);
    //     res.status(500).send("Internal Server Error");
    // }



const renderDashbord = async (req, res) => {
    // console.log(req.user);
    // try {
    //     const name = await Role.findByPk({
    //         where: { id:id}, attributes: ["name"]
    //     });
    //     if (name = admin) {
    //         res.render('adminpage');
    //     }
    //     else {
    //         res.render('userPage');
    //     }
    // } catch (error) {
    //     res.status(500).json({ message: `Todos are not found ${error.message}`});
    // }
    // try {
    //     // Get all To-Dos belonging to the logged-in user
    //     const todos = await Todo.findAll({
    //         where: { userId: req.user.id }
    //     });

    //     // Pass the todos array to the EJS template
    //     res.render('dashbord', {todos});

    // } catch (err) {
    //     console.error("Database Error: ", err);
    //     res.status(500).send("Internal Server Error");
    // }
};

const renderCreateTodoPage = (req, res) => {
    res.render('jobappp');
}

const renderRegisterPage = async (req, res) => {
    res.render('regrestration');
}

const renderCompanyRegisterPage = async (req, res) => {
    res.render('registerCompany');
}

const renderjobapplicationPage = async (req, res) => {
    try {
        // Fetch job applications for the logged-in user
        const applications = await jobApplication.findAll({
            where: { userId: req.user.id }, // Adjust according to your model
            include: [{ model: Job, as: 'Jobs', attributes: ['title'] }] // Use the correct alias here
        });

        console.log(applications);
        // Render the job application page and pass the applications and page variable
        res.render('jobapplication', {
            title: 'Job Applications',
            applications: applications, // Pass the applications to the view
            page: 'jobApplications' // Set the active page
        });
    } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).send('Internal Server Error');
    }
}

// const renderjobapplicationPage = async (req, res) => {
//     try {
//         const jobapplications = await jobApplication.findAll(); // Fetch all job applications
//         res.render('jobapplication', { jobapplications }); // Render the view with data
//     } catch (error) {
//         console.error('Error fetching job applications:', error);
//         res.status(500).send('Internal Server Error');
//     }
// }


const renderCompaniesPage = async (req, res) => {
    try {
        // Fetch registered companies from the database
        const companies = await Company.findAll(); // Adjust according to your model

        // Render the companies page and pass the companies and page variable
        res.render('companies', {
            title: 'Registered Companies',
            companies: companies, // Pass the companies to the view
            page: 'companies' // Set the active page
        });
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).send('Internal Server Error');
    }
};


const renderTermsAndConditionsPage = (req, res) => {
    try {
        // Render the terms and conditions page and pass the page variable
        res.render('termsAndConditions', {
            title: 'Terms and Conditions',
            page: 'termsAndConditions' // Set the active page
        });
    } catch (error) {
        console.error('Error rendering terms and conditions page:', error);
        res.status(500).send('Internal Server Error');
    }
};

const renderMePage = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send('User  not found');
        }

        res.render('mePage', {
            title: 'My Profile',
            user: user,
            page: 'me'
        });
    } catch (error) {
        console.error('Error fetching user data:', error );
        res.status(500).send('Internal Server Error');
    }
};

const renderContactPage = (req, res) => {
    res.render('contact', {
        title: 'Contact Us',
        page: 'contact' // Set the active page
    });
};


const renderCompanyPage = async (req, res) => {
    try {
        // Check if the user is authenticated and has a companyId
        if (!req.user || !req.user.companyId) {
            return res.status(401).send('Unauthorized: User not logged in or company ID missing');
        }

        const companyId = req.user.companyId; // Assuming the company ID is stored in the user token
        const company = await Company.findByPk(companyId); // Fetch company data by ID

        // If no company is found, return a 404 error
        if (!company) {
            return res.status(404).send('Company not found');
        }

        // Render the company page and pass the company data and active page
        res.render('company', {
            title: 'Company Profile',
            page: 'company', // Set the active page
            company: company.toJSON(), // Pass the company data to the template
            userRole: req.user.role, // Pass the user role to the template
            hasCompany: !!company // Pass whether the user has a company
        });
    } catch (error) {
        console.error('Error fetching company data:', error);
        res.status(500).send('Internal Server Error');
    }
};

const renderCompanyJobsPage = async (req, res) => {
    try {
        const companyId = req.user.companyId; // Assuming the company ID is stored in the user token
        // Fetch jobs associated with the company
        const jobs = await Job.findAll({ where: { companyId } });

        // Render the company jobs page and pass the company data, jobs, and active page
        res.render('companyJobs', {
            title: 'Company Jobs',
            page: 'companyJobs', // Set the active page
            jobs: jobs 
        });
    } catch (error) {
        console.error('Error fetching company jobs:', error);
        res.status(500).send('Internal Server Error');
    }
};

const renderContactCompanyPage = (req, res) => {
    res.render('contactCompany', {
        title: 'Contact Us',
        page: 'contactCompany' // Set the active page
    });
};

const rendertermsCompanyPage = (req, res) => {
    res.render('termsCompany', {
        title: 'Contact Us',
        page: 'termsCompany' // Set the active page
    });
};



const renderJobApplicationsCompanyPage = async (req, res) => {
    try {
        const companyId = req.user.companyId; // Assuming company ID is stored in the user token

        // Fetch jobs posted by the company
        const jobs = await Job.findAll({ where: { companyId }, attributes: ['id', 'title'] });

        if (!jobs.length) {
            return res.render('jobapplicationCompany', {
                title: 'Job Applications',
                page: 'jobapplicationCompany',
                jobApplications: [],
                message: 'No job applications found.'
            });
        }

        // Get job IDs posted by the company
        const jobIds = jobs.map(job => job.id);

        // Fetch job applications for the company's jobs
        const jobApplications = await jobApplication.findAll({
            where: { jobId: jobIds },
            include: [
                { model: User, as: 'Users', attributes: ['id', 'full_name', 'email'] }, // Include applicant details with alias
                { model: Job, as: 'Jobs', attributes: ['title'] } // Include job details with alias
            ]
        });

        // Render the company job applications page
        res.render('jobapplicationCompany', {
            title: 'Job Applications',
            page: 'jobapplicationCompany', // Set the active page
            jobApplications
        });
    } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).send('Internal Server Error');
    }
};

const renderAdminDashboard = async (req, res) => {
    try {
        // Render the admin dashboard page
        res.render('admindashbord', {
            title: 'Admin Dashboard',
            page: 'admindashbord' // Set the active page
        });
    } catch (error) {
        console.error('Error rendering admin dashboard:', error);
        res.status(500).send('Internal Server Error');
    }
};

const renderAdminCompany = async (req, res) => {
    try {
        // Render the admin dashboard page
        res.render('adminCompany', {
            title: 'Admin Dashboard',
            page: 'adminCompany' // Set the active page
        });
    } catch (error) {
        console.error('Error rendering admin company:', error);
        res.status(500).send('Internal Server Error');
    }
};

const renderAdminContact = async (req, res) => {
    try {
        // Render the admin dashboard page
        res.render('adminContact', {
            title: 'Admin Contact',
            page: 'adminContact' // Set the active page
        });
    } catch (error) {
        console.error('Error rendering admin Contact:', error);
        res.status(500).send('Internal Server Error');
    }
};

const rendermeCompanyPage = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send('User  not found');
        }

        res.render('meCompany', {
            title: 'My Profile',
            user: user,
            page: 'meCompany'
        });
    } catch (error) {
        console.error('Error fetching user data:', error );
        res.status(500).send('Internal Server Error');
    }
};

const renderAdminProfilePage = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send('User  not found');
        }

        res.render('adminprofile', {
            title: 'My Profile',
            user: user,
            page: 'adminprofile'
        });
    } catch (error) {
        console.error('Error fetching user data:', error );
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    renderLoginPage,
    renderDashbord,
    renderRegisterPage,
    renderCreateTodoPage,
    userLoginPage,
    renderjobapplicationPage,
    renderCompaniesPage,
    renderTermsAndConditionsPage,
    renderMePage,
    renderContactPage,
    renderCompanyPage,
    renderCompanyJobsPage,
    renderContactCompanyPage,
    rendertermsCompanyPage,
    renderJobApplicationsCompanyPage,
    renderAdminDashboard,
    rendermeCompanyPage,
    renderAdminCompany,
    renderAdminProfilePage,
    renderAdminContact,
    renderCompanyRegisterPage
};