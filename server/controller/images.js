const cloudinary = require('../cloudinary');
const contributionQueries = require('../model/db_queries/contributions');

exports.postArtwork = async (req, res) => {
  try {
    const { imageBase64, user, row, column } = req.body;

    // Returns JSON on the image information. This is sent to the "communarty" file in Cloudinary server.
    const imageInfo = await cloudinary.uploader.upload(imageBase64, {
      folder: 'communarty',
    });

    // Data to be stored in Contributions Collection
    const data = {
      owner_id: user,
      belongs_to: 'canvas_id',
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
