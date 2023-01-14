const userQueries = require('../model/db_queries/users');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Creating a User
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUserData = { username, email, password };
    console.log(newUserData);

    // result => { status: 'User Exists' | 'Created User' }
    const result = await userQueries.createUser(newUserData);
    res.send(result);
  } catch (err) {
    console.log('There was an error in creating a user (controller)');
    console.log(err);
    res.sendStatus(400);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginData = { email, password };
    console.log(loginData);
    const result = await userQueries.loginUser(loginData);

    console.log(result);
    if (result.status === 'Correct Password') {
      // Send Back a jwt for authentication
      const token = jwt.sign(
        { userId: result.userId },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '1h',
        }
      );
      console.log(token);
      res.status = 200;
      res.send({ token });
    } else if (result.status === 'Incorrect Password') {
      res.status = 400;
      res.send({ token: null });
    }
  } catch (err) {}
};
