const Users = require('../users');

exports.loginUser = async (username, hashedPassword) => {
  try {
    // Find user via the username and password given by the user.
    const user = await Users.findOne({ username, password: hashedPassword });
    // If the user exists, return the user.
    if (user) return user;
  } catch (err) {
    console.log(`User with ${username} was not found`);
    return err;
  }
};

exports.createUser = async (userData) => {
  // User data : { username, password, email }
  // Checks if the email or username exists
  // Information from client is {username, email, password, NEEDS ID TO BE GENERATED}
  // need to hashpassword
  // If it does not exist, creates the user and user_id and stores in the server
};
