const cloudinary = require('../cloudinary');

exports.postArtwork = async (req, res) => {
  try {
    const { image, username } = req.body;
    console.log(req.body); // looks good here

    // Returns JSON on the image information.
    const result = await cloudinary.uploader.upload(image, {
      folder: 'communarty',
    });

    console.log(result);

    // To be sent to the user
    const imageDetails = {
      secure_url: result.secure_url,
    }

    const databaseEntry = {
      owner_id: username,
      belongs_to: 'test_canvas',
      row: 0,
      column: 0,
      img: result.secure_url
    }

    console.log(databaseEntry);
    // SUCCESSFUL POST
    res.status = 201
    res.send(imageDetails);
  } catch (err) {
    // BAD REQUEST
    res.status = 400;
    console.log(`There was an error uploading the image: ${err}`);
    res.send(err)
    return err;
  }
}
