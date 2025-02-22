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
            userId: req.user.id
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
            });
            res.status(201).json(updateCompany);
        } else {
            res.status(404).json({ message: `The updatation of ${id} id of Company is not completed`})
        }
    } catch (error) {
        res.status(500).json({message: `An error has occured ! ${ error.message}`});
    }
}

const deleteCompanyById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Company.destroy({
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

const updateStatusById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const company = await Company.findByPk(id);
        if (company){
            const updateCompany = await Company.update({
                isVerified: data.isVerified
            });
            res.status(201).json(updateCompany);
        } else {
            res.status(404).json({ message: `The updatation of ${id} id of Company is not completed`})
        }
    } catch (error) {
        res.status(500).json({message: `An error has occured ! ${ error.message}`});
    }
}

module.exports = {
    createCompany,
    getCompanyById,
    getAllCompany,
    updateCompany,
    deleteCompanyById,
    updateStatusById

}