const Users = require('../users');
const bcrypt = require('bcrypt');

exports.createUser = async (userData) => {
  try {
    // Check if the user already exists
    console.log('before');
    const checkEmail = await Users.findOne({ email: userData.email });
    console.log(checkEmail);
    if (checkEmail) return { status: 'User Exists' };

    // If the user doesn't exist, hash and store the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    await Users.create({ ...userData, password: hashedPassword });
    return { status: 'Created User' };
  } catch (err) {
    console.log(err);
    return { status: 'error' };
  }
};

exports.loginUser = async (loginData) => {
  try {
    // Find user via the username and password given by the user.
    const user = await Users.findOne({ email: loginData.email });

    // If there is a user, check the password is correct
    if (user) {
      const passwordCorrect = await bcrypt.compare(
        loginData.password,
        user.password
      );
      console.log(passwordCorrect);

      return passwordCorrect
        ? { status: 'Correct Password', userId: user._id }
        : { status: 'Email / Password Incorrect', userId: null };
    } else {
      return { status: 'Email / Password Incorrect', userId: null };
    }
  } catch (err) {
    console.log(`User with ${username} was not found`);
    return err;
  }
};

exports.getUserInfo = async (userId) => {
  try {
    const user = await Users.findOne({ _id: userId });
    const returnedInfo = { username: user.username, email: user.email };
    return returnedInfo;
  } catch (err) {
    return err;
  }
};
