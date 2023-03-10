const cloudinary = require('../cloudinary');
const contributionQueries = require('../model/db_queries/contributions');
const canvasQueries = require('../model/db_queries/canvases');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.postArtwork = async (req, res) => {
  try {
    const { imageBase64, user, row, column, canvasId } = req.body;

    // Returns JSON on the image information. This is sent to the "communarty" file in Cloudinary server.
    const imageInfo = await cloudinary.uploader.upload(imageBase64, {
      folder: 'communarty',
    });

    // Data to be stored in Contributions Collection
    const data = {
      owner_id: user,
      belongs_to: canvasId,
      row: row,
      column: column,
      img_url: imageInfo.secure_url,
    };

    // Store in the database
    const contributionData = await contributionQueries.postContribution(data);

    // SUCCESSFUL POST
    res.status = 201;
    res.send(contributionData);
  } catch (err) {
    // BAD REQUEST
    res.status = 400;
    console.log(`There was an error uploading the image`);
    res.send(err);
    return err;
  }
};

exports.getContributionsByCanvasId = async (req, res) => {
  try {
    const { canvasId } = req.body;
    const contributions = await contributionQueries.getContributionsByCanvasId(
      canvasId
    );
    // SUCCESSFUL GET
    res.status(200);
    res.send(contributions);
  } catch (err) {
    console.log(
      `There was an error in querying all contributions for the canvas_id : ${canvasId}`
    );
    res.status(400);
    res.send(err);
  }
};

exports.getCanvasesByUserId = async (req, res) => {
  try {
    const { username } = req.body;
    const canvases = await canvasQueries.getCanvasesByUserId(username);
    res.status = 200;
    res.send(canvases);
  } catch (error) {
    res.status(400);
    res.send(err);
  }
};

exports.getUserContributions = async (req, res) => {
  try {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if (token) {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      const userArt = await contributionQueries.getUserContributions(
        payload.userId
      );
      res.status = 200;
      res.send(userArt);
    }
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};
