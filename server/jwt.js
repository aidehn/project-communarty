const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  try {
    const verification = jwt.verify(token, process.env.TOKEN_SECRET);
    return verification;
  } catch (err) {
    console.log('Failed to Verify Token');
    return err;
  }
};
