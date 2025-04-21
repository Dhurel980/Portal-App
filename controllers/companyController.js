const Company = require('../models/company');
const User = require('../models/user');

const createCompany = async(req, res) => {
    const data = req.body;
    console.log(req.body);
    try {      
        const company = await Company.create({
            companyName: data.companyName,
            registrationNumber: data.registrationNumber,
            description: data.description,
            website: data.website,
            logoUrl: data.logoUrl,
            isVerified: data.isVerified,
            userId: data.userId
        });
        res.status(201).json(company);
    } catch (error) {
        console.log(error)
        res.status(404).json({message: `Company not created ${error.message}`});
    }
}

const getCompanyById = async(req, res) => {
    const id = req.user.companyId;
    try {
        const company = await Company.findByPk(id);
        if (company) {
            res.status(201).json(company);
        } else {
            res.status(404).json({ message: `Company with ${id} id is not found`})
        }
    } catch (error) {
        res.status(404).json({ message: `An error has occured with ${id} id`});
    }
}

const getAllCompany = async(req, res) => {
    try {
        const company = await Company.findAll();
        res.status(201).json(company);
    }
    catch (error) {
        res.status(404).json({ message: `An error has occured ${ error.message}`});
    }
}

const updateCompany = async (req, res) => {
    const id = req.user.companyId;
    const data = req.body;
    console.log(id)
    console.log(data)
    try {
        const company = await Company.findByPk(id);
        if (company){
            const updateCompany = await Company.update({
                companyName: data.companyName,
                registrationNumber: data.registrationNumber,
                description: data.description,
                website: data.website,
                logoUrl: data.logoUrl,
                userId: req.user.id
            },
            { where: { id } }
        );
            res.status(200).json(updateCompany);
        } else {
            res.status(404).json({ message: `The updatation of ${id} id of Company is not completed`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: `An error has occured ! ${ error.message}`});
    }
}

const deleteCompanyById = async (req, res) => {
    const id = req.query.id;
    try {
        const result = await Company.destroy({
            where: { id:id }
        });
        if (result) {
            res.status(200).json({ message: `Company with ${id} id has been deleted !`});
        } else {
            res.status(404).json({ message: `Company with ${id} id is not deleted !`});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `An error has Occured ${error.message}`});
    }
}


const updateStatusById = async (req, res) => {
    try {
        const { companyId, isVerified } = req.body;
        console.log("Received Company ID:", companyId, "New Status:", isVerified);

        if (typeof isVerified !== 'boolean') {
            return res.status(400).json({ error: "isVerified must be a boolean value" });
        }

        const [updated] = await Company.update(
            { isVerified }, 
            { where: { id: companyId } }
        );

        if (updated === 0) {
            return res.status(404).json({ error: "Company not found" });
        }

        res.json({ message: "Company verification status updated successfully" });

    } catch (error) {
        console.error("Error updating verification:", error);
        res.status(500).json({ message: `An error occurred! ${error.message}` });
    }
};


module.exports = {
    createCompany,
    getCompanyById,
    getAllCompany,
    updateCompany,
    deleteCompanyById,
    updateStatusById

}