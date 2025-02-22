const Job = require('../models/jobs');


const createJob = async(req, res) => {
    const data = req.body;
    console.log(req.user);
    try {
        const job = await Job.create({
            title: data.title,
            description: data.description,                       
            requirements: data.requirements,                     
            location: data.location,                        
            salaryRange: data.salaryRange,                       
            jobType: data.jobType,                       
            deadline: data.deadline,                       
            status: data.status,
            companyId: req.user.companyId
        });
        res.status(201).json(job);
    } catch (error) {
        console.log(error)
        res.status(404).json({message: `Job not created ${error.message}`});
    }
}

const getJobById = async(req, res) => {
    const id = req.params.id;
    try {
        const job = await Job.findByPk(id);
        if (Job) {
            res.status(201).json(company);
        } else {
            res.status(404).json({ message: `Company with ${id} id is not found`})
        }
    } catch (error) {
        res.status(404).json({ message: `An error has occured with ${id} id`});
    }
}

const getAllJob = async(req, res) => {
    try {
        const job = await Job.findAll();
        res.status(201).json(job);
    }
    catch (error) {
        res.status(404).json({ message: `An error has occured ${ error.message}`});
    }
}

const updateJobById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const job = await Job.findByPk(id);
        if (job){
            const updatejob = await Job.update({
                title: data.title,
                description: data.description,                       
                requirements: data.requirements,                     
                location: data.location,                        
                salaryRange: data.salaryRange,                       
                jobType: data.jobType,                       
                deadline: data.deadline,                       
                status: data.status,
                companyId: req.user.id
            });
            res.status(201).json(updatejob);
        } else {
            res.status(404).json({ message: `The updatation of ${id} id of Company is not completed`})
        }
    } catch (error) {
        res.status(500).json({message: `An error has occured ! ${ error.message}`});
    }
}

const updateStatusById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const job = await Job.findByPk(id);
        if (job){
            const updatejob = await Job.update({                      
                status: data.status,
            });
            res.status(201).json(updatejob);
        } else {
            res.status(404).json({ message: `The updatation of ${id} id of Company is not completed`})
        }
    } catch (error) {
        res.status(500).json({message: `An error has occured ! ${ error.message}`});
    }
}

const deleteJobById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Job.destroy({
            where: {id:id}
        });
        if (result) {
            res.status(201).json({ message: `Company with ${id} id has been deleted !`});
        } else {
            res.status(404).json({ message: `Company with ${id} id is not deleted !`});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `An error has Occured ${error.message}`});
    }
}

const updateJobStatusById = async (req, res) => {
    const { jobId, status } = req.body;  // Extract jobId and status

    if (!jobId || !status) {
        return res.status(400).json({ message: "Missing jobId or status" });
    }

    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ message: `Job with ID ${jobId} not found` });
        }

        job.status = status;
        await job.save(); // Save changes

        res.status(200).json({ message: "Job status updated", job });
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};



module.exports = {
    createJob,
    getJobById,
    getAllJob,
    updateJobById,
    deleteJobById,
    updateJobStatusById
}

