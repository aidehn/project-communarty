import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Canvas from '../../Components/Canvas';
import ArtEditor from '../../Components/ArtEditor';
import apiService from '../../utility/apiService';
import Navbar from '../../Components/Navbar';

export default function Dashboard() {
  const router = useRouter();
  const inputName = router.query.username as string;
  const [toggleArtEditor, setToggleArtEditor] = useState(false);
  const [canvasData, setCanvasData] = useState<any>([]);
  const [currentRow, setCurrentRow] = useState<undefined | number>(undefined);
  const [currentColumn, setCurrentColumn] = useState<undefined | number>(
    undefined
  );
  const [canvasList, setCanvasList] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [artworkList, setArtworkList] = useState<any[]>([]);

  useEffect(() => {
    // This is for testing
    const getAllCanvasData = async (canvasId: string) => {
      const data = await apiService.getAllArtworkById(canvasId);
      setCanvasData(data);
    };
    getAllCanvasData('canvas_id');

    // On load, we need to grab all canvas and art data from the server using the token
    // If the token is invalid, or there is no token, we must return to the home page
    const getDataOnLoad = async () => {
      // Grabbing basic User Information { username }
      const userResponse = await apiService.retrieveUserInformation();
      console.log(userResponse);
      setCurrentUser(userResponse);
      console.log('this is the current user', currentUser);

      // Grabbing all Canvas Data
      // const canvasResponse = await apiService.retrieveUserCanvases();
      // console.log(canvasResponse);
      // setCanvasList(canvasResponse);

      // Grabbing all contributions to canvases
      // const artworkResponse = await apiService.retrieveUserArt();
      // setArtworkList(artworkResponse);

      console.log(currentUser);
      // console.log(canvasList);
      // console.log(artworkList);
    };
    getDataOnLoad();
  }, []);

  return (
    <div className="m-0 p-0 w-screen h-screen bg-offwhite overflow-hidden">
      <Navbar />
      <Canvas
        enableEditor={() => {
          setToggleArtEditor(true);
        }}
        setRow={setCurrentRow}
        setColumn={setCurrentColumn}
        canvasData={canvasData}
      />
      {toggleArtEditor && (
        <ArtEditor
          row={currentRow}
          column={currentColumn}
          user={currentUser.username}
          disableEditor={() => {
            setToggleArtEditor(false);
          }}
        />
      )}
      <div className="text-black">
        {currentUser.username} {currentUser.email}
      </div>
    </div>
  );
}
