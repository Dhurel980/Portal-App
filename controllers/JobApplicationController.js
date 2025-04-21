const JobApplication = require('../models/job_application');
const User = require('../models/user');
const Role = require('../models/role');
const Job = require('../models/jobs');

const createJobApplication  = async(req, res) => {
    const data = req.body;
    try {
        const jobApplication  = await JobApplication.create({
            resumeUrl: data.resumeUrl,                   
            coverLetter: data.coverLetter,       
            status: data.status,
            jobId: data.jobId,
            userId: req.user.id
        });
        res.status(201).json(jobApplication);
    } catch (error) {
        console.log(error)
        res.status(404).json({message: `JobApplication not created ${error.message}`});
    }
}

const getJobApplicationById = async(req, res) => {
    const id = req.params.id;
    try {
        const jobApplication = await JobApplication.findByPk(id);
        if (jobApplication) {
            res.status(201).json(jobApplication);
        } else {
            res.status(404).json({ message: `JobApplication with ${id} id is not found`})
        }
    } catch (error) {
        res.status(404).json({ message: `An error has occured with ${id} id`});
    }
}

const getAllUserJobApplications = async (req, res) => {
    try {
        const userId = req.user.id; 

        if (!userId) {
            return res.status(403).json({ message: "Unauthorized access! User ID not found." });
        }

        // Fetch job applications where the user is the applicant
        const jobApplications = await JobApplication.findAll({
            where: { userId: userId }, // Ensure applications belong to the user
            include: [
                {
                    model: Job,
                    as: "Jobs", // Ensure the alias matches your model definition
                    attributes: ["title"], // Fetch job details
                },
                {
                    model: User,
                    as: "Users", // Ensure the alias matches your model definition
                    attributes: ["fullName", "email"], // Fetch user details
                }
            ],
            attributes: ["id", "resumeUrl", "coverLetter", "status"], // Include relevant application fields
        });
        return res.status(200).json(jobApplications);
    } catch (error) {
        console.error("Error fetching user job applications:", error);
        return res.status(500).json({ message: "An error occurred while fetching job applications." });
    }
};

const getAllCompanyJobApplication = async (req, res) => {
    try {
        const companyId = req.user.companyId;

        if (!companyId) {
            return res.status(403).json({ message: "Unauthorized access! Company ID not found." });
        }

        // Fetch job applications where jobs belong to the company
        const jobApplications = await JobApplication.findAll({
            include: [
                {
                    model: Job,
                    as: "Jobs",
                    where: { companyId: companyId }, // Ensure jobs belong to the company
                    attributes: ["title", "description"], // Fetch job details
                },
                {
                    model: User,
                    as: "Users",
                    attributes: ["fullName", "email"], // Fetch user details
                }
            ],
            attributes: ["id", "resumeUrl", "coverLetter", "status", "createdAt"],
        });
        return res.status(200).json(jobApplications);
       
    } catch (error) {
        console.error("Error fetching job applications:", error);
        return res.status(500).json({ message: "An error occurred while fetching job applications." });
    }
};

const updateJobApplicationById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const jobApplication = await JobApplication.findByPk(id);
        if (jobApplication){
            const updatejob = await JobApplication.update({
                resumeUrl: data.resumeUrl,                   
                coverLetter: data.coverLetter,       
                status: data.status,
                jobId: jobId,
                userId: req.user.id
            });
            res.status(201).json(updatejob);
        } else {
            res.status(404).json({ message: `The updatation of ${id} id of JobApplication is not completed`})
        }
    } catch (error) {
        res.status(500).json({message: `An error has occured ! ${ error.message}`});
    }
}

const deleteJobApplicationById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await JobApplication.destroy({
            where: {id:id}
        });
        if (result) {
            res.status(201).json({ message: `JobApplication with ${id} id has been deleted !`});
        } else {
            res.status(404).json({ message: `JobApplication with ${id} id is not deleted !`});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `An error has Occured ${error.message}`});
    }
}

const updateJobApplicationStatus = async (req, res) => {
    try {
        const { applicationId, status } = req.body;
        console.log(applicationId, status);

        // Ensure the status is valid
        const validStatuses = ['pending', 'accepted', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // Find the job application by its ID
        const jobApplication = await JobApplication.findOne({ where: { id: applicationId } });

        if (!jobApplication) {
            return res.status(404).json({ message: "Job application not found" });
        }

        // Update the status
        await jobApplication.update({ status });

        return res.status(200).json({ 
            message: "Job application status updated successfully", 
            jobApplication 
        });
    } catch (error) {
        console.error("Error updating job application status:", error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};



module.exports = {
    createJobApplication,
    getJobApplicationById,
    getAllUserJobApplications,
    getAllCompanyJobApplication,
    updateJobApplicationById,
    deleteJobApplicationById,
    updateJobApplicationStatus

}