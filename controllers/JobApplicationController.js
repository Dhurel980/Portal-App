const JobApplication = require('../models/job_application');
const User = require('../models/user');
const Role = require('../models/role');

const createJobApplication  = async(req, res) => {
    const data = req.body;
    const jobId = req.query.id;
    console.log(jobId)
    try {
        const jobApplication  = await JobApplication.create({
            resumeUrl: data.resumeUrl,                   
            coverLetter: data.coverLetter,       
            status: data.status,
            jobId: jobId,
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

// const getAllJobApplication = async(req, res) => {
//     try {
//         const jobApplication = await JobApplication.findAll();
//         res.status(201).json(jobApplication);
//     }
//     catch (error) {
//         res.status(404).json({ message: `An error has occured ${ error.message}`});
//     }
// }

const getAllJobApplication = async (req, res) => {
    const {id} = req.use.id;
    try {
        const user = await User.findOne({
            where: { id },
            include: [{ model: Role, as: "Role", attributes: ["name"] }],
        });

        if (!user) {
            res.status(404).json({ message: `User not found`});
        }
        const roleName = user.Role.name;
        console.log(user.Role.name);
        if (roleName === "admin") {
            const jobApplication = await JobApplication.findAll();
            return res.status(200).json(jobApplication);
        }
        else if (roleName === "jobseeker" || "company") {
            const jobApplication = await JobApplication.findAll({ where: {userId: id}})
            return res.status(200).json(jobApplication);
        }
        else {
            return res.status(404).json({ message:`Unauthorized role !`});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message:`An error occurred while processing the request`});
    }
}

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
        const { jobId, userId, status } = req.body;

        // Ensure the status is valid
        const validStatuses = ['pending', 'accepted', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // Find the job application
        const jobApplication = await JobApplication.findOne({ where: { jobId, userId } });

        if (!jobApplication) {
            return res.status(404).json({ message: "Job application not found" });
        }

        // Update the status
        await jobApplication.update({ status });

        return res.status(200).json({ message: "Job application status updated successfully", jobApplication });
    } catch (error) {
        console.error("Error updating job application status:", error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};



module.exports = {
    createJobApplication,
    getJobApplicationById,
    getAllJobApplication ,
    updateJobApplicationById,
    deleteJobApplicationById,
    updateJobApplicationStatus

}