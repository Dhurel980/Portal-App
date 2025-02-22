// const Company = require('../models/company');
// const Role = require('../models/role')
// const companyIdAdder =(roles) => {
//     return async (req, res, next) => {     
//         try {
//             if(!req.user) {
//                 res.status(404).json({ message: `token is not found`});
//             }
//             const company = await Company.findByPk({
//                 where { id}
//             });

//             }
//             else {
//                 return next();
//             }
//             return res.status(403).json({ message: `Forbidden` });
//         }catch (error) {
//             console.error(error);
//             res.status(500).json({ message: `Internal Server Error` });
//         }
//     };
// };       