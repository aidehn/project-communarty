const aws = require('aws-sdk');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const region = process.env.S3_REGION
const bucket = process.env.BUCKET_NAME
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// Connecting to the AWS Server
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
});

// Defining a function which generates a URL which the user uses to upload an image to the bucket
exports.generateUploadInfo = async () => {
  // Creating a secure name which will be stored in the backend.
  const secureName = crypto.randomBytes(8).toString('hex') + '.jpg';

  // Defining the parameters which are used to obtain the upload url
  const params = {
    Bucket: bucket,
    Key: secureName,
    Expires: 60, // The URL expires in 60s
    ContentType: 'image/jpeg'
  };

  const url = await s3.getSignedUrlPromise('putObject', params);

  // Returns the upload URL as well as the name which we used, this will be used to store in the MongoDB database
  return JSON.stringify({ url, secureName })
}