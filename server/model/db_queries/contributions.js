const Contributions = require('../artwork');
const Users = require('../users');

exports.postContribution = async (data) => {
  try {
    const contribution = await Contributions.create(data);
    return contribution;
  } catch (err) {
    console.log('There was an error in uploading the contribution');
    console.log(err);
    return err;
  }
};

// Note that canvasId is stored as belongs_to in the collection for the contributions.
exports.getContributionsByCanvasId = async (canvasId) => {
  try {
    const allContributions = await Contributions.find({ belongs_to: canvasId });
    console.log(allContributions);
    return allContributions;
  } catch (err) {
    console.log(
      `There was an error in retrieving the contributions for a given canvas: ${canvasId}`
    );
    console.log(err);
    return err;
  }
};

exports.getUserContributions = async (userId) => {
  try {
    // To whoever is reading this, I used username as the owner_id in the contributions table and never changed it
    // So before getting the contributions, the user id needs to be turned into the username
    const user = await Users.findOne({ _id: userId });
    const { username } = user;
    const userContributions = await Contributions.find({ owner_id: username });
    return userContributions;
  } catch (err) {
    console.log('There was an error in retrieving the user art');
    return err;
  }
};
