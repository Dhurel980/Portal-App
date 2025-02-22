const Role = require('../models/role');

const createRole = async (req, res) => {
    const data = req.body;
    try {
        const role = await Role.create({
            name: data.name
        });
        res.status(200).json(role);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: `Role is not created !`});
    }
}

const deleteById = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    try {
        const result = await Role.destroy({
            where: {id:id}
        });
        if (result) {
            res.status(201).json({ message: `User with ${id}id has been deleted!`});
        }
        else {
            res.status(404).json({ message: `User with ${id}id hasn't deleted!`});
        }
    } catch (error) {
        res.status(500).json({ message: `An error has occured ${id} "${error.message}"`});
    }
}


module.exports = {
    createRole,
    deleteById
}