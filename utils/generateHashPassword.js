const bcrypt = require("bcryptjs");

const generateHashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};
module.exports = generateHashPassword;
