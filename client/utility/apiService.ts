import { CloudHSM } from 'aws-sdk';

// This uploads the Pixel Art to the Cloudinary Database and our MongoDB Database
const postImageToServer = async (data: any) => {
  try {
    const response = await fetch('http://localhost:3005/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (err) {
    console.log(`There was an error in uploading the image.`);
    console.log(err);
    return err;
  }
};

// Gets all Artwork for a given Canvas (for one canvas, we will hard code the name)
const getAllArtworkById = async (canvasId: string) => {
  const queryData = { canvasId };
  console.log(queryData);
  try {
    const response = await fetch('http://localhost:3005/canvas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryData),
    });
    const artwork = await response.json();
    console.log('the artwork response', artwork);
    return artwork;
  } catch (err) {
    console.log(`There was an error in uploading the image.`);
    console.log(err);
    return err;
  }
};

// Creates an account and stores in the server.
const createAccount = async (userData: any) => {
  try {
    const response = await fetch('http://localhost:3005/create/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (err) {
    console.log('There was an error in creating an account.');
    console.log(err);
    return err;
  }
};

const loginUser = async (loginData: any) => {
  try {
    const response = await fetch('http://localhost:3005/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    return await response.json();
  } catch (err) {
    console.log('There was an error with logging into your account');
    console.log(err);
    return err;
  }
};

const retrieveUserInformation = async () => {
  const token = localStorage.getItem('token');
  console.log('this is the token', token);
  try {
    const response = await fetch('http://localhost:3005/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const thing = await response.json();
    console.log('this is thiing', thing);
    return thing;
  } catch (err) {
    console.log('There was an error with retrieveing the users data');
    return err;
  }
};

// const retrieveUserCanvases = async () => {
//   const token = localStorage.getItem('token');
//   try {
//     const response = await fetch('http:localhost:3005/user/canvas', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return await response.json();
//   } catch (err) {
//     console.log('There was an error with retrieveing the users canvases');
//     return err;
//   }
// };

const retrieveUserArt = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:3005/user/artwork', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('artist list', await response.json());
    return await response.json();
  } catch (err) {
    console.log('There was an error with retrieveing the users contributions');
    return err;
  }
};

const searchCanvasByUser = async (username: string) => {
  try {
    const response = await fetch('http://localhost:3005/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    const userCanvasInfo = await response.json();
    console.log(userCanvasInfo);
    return userCanvasInfo;
  } catch (err) {
    console.log('There was an error in searching for users');
    return err;
  }
};

export default {
  postImageToServer,
  getAllArtworkById,
  createAccount,
  loginUser,
  /* retrieveUserCanvases, */
  retrieveUserInformation,
  retrieveUserArt,
  searchCanvasByUser,
};
