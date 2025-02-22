const bcrypt = require('bcrypt');

const hashedpass = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports = hashedpass;