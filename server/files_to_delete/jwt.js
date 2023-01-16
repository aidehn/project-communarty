exports.createToken = (id) => {
  return token;
};

exports.verifyToken = (token) => {
  const verification = jwt.verify(token, process.env.TOKEN_SECRET);
  return verification;
};
