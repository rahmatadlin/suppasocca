// const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

const hashPassword = (rawPassword) => {
    return bcrypt.hashSync(rawPassword, salt);
};

const comparePassword = (rawPassword, hashPassword) => {
    return bcrypt.compareSync(rawPassword, hashPassword);
};

module.exports = { hashPassword, comparePassword };
