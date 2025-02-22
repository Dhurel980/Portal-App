const User = require('../models/user');
const bcrypt = require('bcrypt');
const hashedpass = require('../helper/hashedpassword');
const jwt = require('jsonwebtoken');
const Company = require('../models/company');

const UsersController = {
	registerJobseeker: async (req, res) => {
		await registerUser(req, res, 3); // RoleId: 3 for Jobseeker
	},
	registerCompany: async (req, res) => {
		await registerUser(req, res, 2); // RoleId: 2 for Company
	},
	registerAdmin: async (req, res) => {
		await registerUser(req, res, 1); // RoleId: 1 for Admin
	},
};

const registerUser = async(req, res, roleId) => {
	const data = req.body;
	try {
		const hashedpassword = hashedpass(data.password);
		const user = await User.create({
			email: data.email,
			password: hashedpassword,
			fullName: data.fullName,
			phone: data.phone,
			address: data.address,
			roleId: roleId
		});
		res.status(201).json(user);
	} catch (error) {
		res.status(404).json({message: `User not created ${error.message}`});
	}
}

const getUserById = async(req, res) => {
	const id = req.query.id;
	try {
		const user = await User.findByPk(id);
		if (user) {
			res.status(201).json(user);
		} else {
			res.status(404).json({ message: `User with ${id} id is not found`})
		}
	} catch (error) {
		res.status(404).json({ message: `An error has occured with ${id} id`});
	}
}

const getAllUser = async(req, res) => {
	try {
		const user = await User.findAll();
		res.status(201).json(user);
	}
	catch (error) {
		res.status(404).json({ message: `An error has occured ${ error.message}`});
	}
}

const updateUserById = async (req, res) => {
	const id = req.query.id;
	const data = req.body;
	try {
		const hashedpassword = hashedpass(data.password);
		const user = await User.findByPk(id);
		console.log("Password data:", data.password);

		if (user){
			const updateUser = await user.update({
				email: data.email,
				password: hashedpassword,
				fullName: data.fullName,
				phone: data.phone,
				address: data.address
			});
			res.status(200).json(updateUser);
		} else {
			res.status(404).json({ message: `The updatation of ${id} id of User is not completed`})
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({message: `An error has occured ! ${ error.message}`});
	}
}

const deleteUserById = async (req, res) => {
	const id = req.params.id;
	try {
		const result = await User.destroy({
			where: {id:id}
		});
		if (result) {
			res.status(201).json({ message: `User with ${id} id has been deleted !`});
		} else {
			res.status(404).json({ message: `User with ${id} id hasn't been deleted !`});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `An error has Occured ${error.message}`});
	}
}

const LoginUser = async(req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({
			where: {email}
		})
		if (!user) {
			return res.status(404).json({ message: `Invalid credentials !`});
		}
		const validatePassword = await bcrypt.compare(password,user.password);
		if(!validatePassword) {
			return res.status(404).json({ message: `Invalid credentials !`});
		}

		const company = await Company.findOne({ where: { userId: user.id } });
		const companyId = company ? company.id : null;
        if (company) {
			const token = jwt.sign(
				{ id:user.id, email:user.email, roleId:user.roleId, companyId:companyId },
				process.env.JWT_SECRET,
				{ expiresIn: "1hr"}
			);
			res.cookie("token",token,{httpOnly:true})
    		return res.status(200).json({ message: "User logged in successfully", token: token });
			
		}
		else {
			const token = jwt.sign(
				{ id:user.id, email:user.email, roleId:user.roleId },
				process.env.JWT_SECRET,
				{ expiresIn: "1hr"}
			);
			res.cookie("token",token,{httpOnly:true})
			return res.status(200).json({ message: "User logged in successfully", token: token });
		}
	} catch (error) {
		console.log(error);
		if (!res.headersSent) {
            return res.status(500).json({ error: error.message });
        }
	}   
};

const logout = (req, res) => {
    res.clearCookie('token'); 
    res.status(200).send('Logged out successfully');
};

module.exports = {
	// createUser,
	UsersController,
	getUserById,
	getAllUser,
	updateUserById,
	deleteUserById,
	LoginUser,
	logout
}