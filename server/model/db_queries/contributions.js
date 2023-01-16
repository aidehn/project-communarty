const Contributions = require('../artwork');

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
