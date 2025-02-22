const Company = require('../models/company');
const Role = require('../models/role');
const hybridAuthorizeMiddleware =(roles) => {
    return async (req, res, next) => {
        const user = req.user;
        
        try {
            if(!user.companyId) {
                res.status(404).json({ message: `Company ID is required`});
            }
            const role = await Role.findByPk(user.roleId);
            if(role && roles.includes(role.name)){
                return next();
            }
            else {
                const company = await Company.findOne ({
                    where: { id:user.companyId, userId: user.id},
                });
                if (company){
                    return next();
                }
            }
            return res.status(403).json({ message: `Forbidden` });
        }catch (error) {
            console.error(error);
            res.status(500).json({ message: `Internal Server Error` });
        }
    };
};       
module.exports = hybridAuthorizeMiddleware;