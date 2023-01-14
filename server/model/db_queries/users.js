const Users = require('../users');
const bcrypt = require('bcrypt');

exports.loginUser = async (loginData) => {
  try {
    // Find user via the username and password given by the user.
    const user = await Users.findOne({ email: loginData.email });
    const passwordCorrect = bcrypt.compare(loginData.password, user.password);

    if (passwordCorrect) {
      // Create a token for login
    } else {
      return { status: 'Incorrect Password', token: null };
    }
  } catch (err) {
    console.log(`User with ${username} was not found`);
    return err;
  }
};

exports.createUser = async (userData) => {
  try {
    // Check if the user already exists
    const checkEmail = await Users.findOne({ email: userData.email });
    if (checkEmail) return { status: 'User Exists' };

    // If the user doesn't exist, hash and store the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = bcrypt.hash(userData.password, salt);

    await Users.create({ ...userData, password: hashedPassword });
    return { status: 'Created User' };
  } catch (err) {
    console.log(err);
    return { status: err };
  }
};
