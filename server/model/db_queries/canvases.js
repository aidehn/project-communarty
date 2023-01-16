const Canvases = require('../canvases');

exports.getCanvasesByUserId = async (username) => {
  try {
    const entries = await Canvases.find({ owner_id: username });
    console.log(entries);
    return entries;
  } catch (err) {
    return err;
  }
};
