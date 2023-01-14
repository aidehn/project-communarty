const userQueries = require('../model/users');

// Creating a User
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUserData = { username, email, password };

    // result => { status: 'User Exists' | 'Created User' }
    const result = await userQueries.getUser(newUserData);
    return result;
  } catch (err) {
    console.log('There was an error in creating a user (controller)');
    res.sendStatus(400);
  }
};

exports.loginUser = async (req, res) => {};
