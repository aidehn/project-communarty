const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

const configOptions = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
};

cloudinary.config(configOptions);

module.exports = cloudinary;


