// This uploads the Pixel Art to the Cloudinary Database and our MongoDB Database
const postImageToServer = async (data: any) => {
  try {
    const response = await fetch('http://localhost:3005/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (err) {
    console.log(`There was an error in uploading the image:`);
    console.log(err);
    return err;
  }
}

// Gets all Artwork for a given Canvas (for one canvas, we will hard code the name)
const getAllArtworkById = async (canvasId: string) => {
  const queryData = { canvasId };
  try {
    const response = await fetch('http://localhost:3005/canvas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(queryData)
    });
    return await response.json();
  } catch (err) {
    console.log(`There was an error in uploading the image:`);
    console.log(err);
    return err;
  }
}

export default { postImageToServer, getAllArtworkById }