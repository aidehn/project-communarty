const userQueries = require('../model/users');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

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

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginData = { email, password };
    const result = await userQueries.loginUser(loginData);
    if (result.status === 'Correct Password') {
      // Send Back a jwt for authentication
      const token = jwt.sign(
        { userId: result.userId },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '1h',
        }
      );
      res.status = 200;
      res.send({ token });
    } else if (result.status === 'Incorrect Password') {
      res.status = 400;
      res.send({ token: null });
    }
  } catch (err) {
    res.send;
  }
};
