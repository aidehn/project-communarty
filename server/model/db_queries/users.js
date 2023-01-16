const Users = require('../users');
const Canvases = require('../canvases');
const bcrypt = require('bcrypt');

exports.createUser = async (userData) => {
  try {
    // Check if the user already exists
    console.log('before');
    const checkEmail = await Users.findOne({ email: userData.email });
    const checkUsername = await Users.findOne({ username: userData.username });
    console.log(checkEmail);
    if (checkEmail || checkUsername) return { status: 'User Exists' };

    // If the user doesn't exist, hash and store the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Create a user, but also create a canvas linked to their account
    const newUser = await Users.create({
      ...userData,
      password: hashedPassword,
    });

    console.log(newUser);

    // Creating the canvas
    await Canvases.create({
      owner_id: newUser._id,
      img_url: 'placeholder_url',
    });

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

    // Note to self : Currently this approach only works for one canvas
    const userCanvas = await Canvases.findOne({ owner_id: userId });
    const returnedInfo = {
      username: user.username,
      email: user.email,
      canvas_id: userCanvas._id,
    };
    console.log('THIS SHIT WILD', returnedInfo);
    return returnedInfo;
  } catch (err) {
    return err;
  }
};
