
const Contact = require('../models/contact');

const createContact = async(req, res) => {
    const data = req.body;
    console.log(req.body);
    try {      
        const contact = await Contact.create({
            name: data.name,
            email: data.email,
            message: data.message,
            phone: data.phone,
            userid: req.user.id
        });
        res.status(201).json(contact);
    } catch (error) {
        console.log(error)
        res.status(404).json({message: `Contact not created ${error.message}`});
    }
}

const getContactById = async(req, res) => {
    const id = req.params.id;
    try {
        const contact = await Contact.findByPk(id);
        if (contact) {
            res.status(201).json(contact);
        } else {
            res.status(404).json({ message: `Contact with ${id} id is not found`})
        }
    } catch (error) {
        res.status(404).json({ message: `An error has occured with ${id} id`});
    }
}

const getAllContact = async(req, res) => {
    try {
        const contacts = await Contact.findAll({
            attributes: ['id', 'name', 'email', 'message', 'phone', 'userId', 'createdAt', 'updatedAt']
        });
        res.status(200).json(contacts);
        console.log(contacts);
    }
    catch (error) {
        console.log(error)
        res.status(404).json({ message: `An error has occured ${ error.message}`});
    }
}

const updateContactById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const contact = await Contact.findByPk(id);
        if (contact){
            const updatecontact = await Contact.update({
                name: data.name,
                email: data.email,
                message: data.message,
                phone: data.phone,
                userid: req.user.id
            });
            res.status(201).json(updatecontact);
        } else {
            res.status(404).json({ message: `The updatation of ${id} id of Contact is not completed`})
        }
    } catch (error) {
        res.status(500).json({message: `An error has occured ! ${ error.message}`});
    }
}

const deleteContactById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Contact.destroy({
            where: {id:id}
        });
        if (result) {
            res.status(201).json({ message: `Contact with ${id} id has been deleted !`});
        } else {
            res.status(404).json({ message: `Contact with ${id} id is not deleted !`});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `An error has Occured ${error.message}`});
    }
}

module.exports = {
    createContact,
    getContactById,
    getAllContact,
    updateContactById,
    deleteContactById,

}