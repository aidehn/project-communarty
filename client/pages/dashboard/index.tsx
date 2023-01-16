import { useState, useEffect } from 'react';
import Canvas from '../../Components/Canvas';
import ArtEditor from '../../Components/ArtEditor';
import apiService from '../../utility/apiService';
import Navbar from '../../Components/Navbar';
import HighlightPanel from '../../Components/HighlightPanel';

export default function Dashboard() {
  const [toggleArtEditor, setToggleArtEditor] = useState(false);
  const [canvasData, setCanvasData] = useState<any>([]);
  const [currentRow, setCurrentRow] = useState<undefined | number>(undefined);
  const [currentColumn, setCurrentColumn] = useState<undefined | number>(
    undefined
  );
  const [currentUser, setCurrentUser] = useState<any>({});
  const [artworkList, setArtworkList] = useState<any[]>([]);
  const [highlightedArt, setHighlightedArt] = useState<any>({});

  useEffect(() => {
    const getAllCanvasData = async (canvasId: string) => {
      const data = await apiService.getAllArtworkById(canvasId);
      console.log(data);
      setCanvasData(data);
    };

    // On load, we need to grab all canvas and art data from the server using the token
    // If the token is invalid, or there is no token, we must return to the home page
    const getDataOnLoad = async () => {
      // Grabbing basic User Information { username, email, canvas_id }
      const userResponse = await apiService.retrieveUserInformation();
      console.log(userResponse);
      setCurrentUser(userResponse);
      // This somehow fixed a loading issue
      getAllCanvasData(userResponse.canvas_id);
    };
    getDataOnLoad();
  }, []);

  const updateCanvas = async (canvasId: string) => {
    const newCanvas = await apiService.getAllArtworkById(canvasId);
    setCanvasData(newCanvas);
  };

  return (
    <div className="m-0 p-0 w-screen h-screen bg-offwhite overflow-hidden">
      <Navbar />
      <p className="text-3xl font-semibold">
        Hello, {currentUser.username || 'there'} ! Welcome to your personal
        canvas.
      </p>
      <p>Email : {currentUser.email}</p>
      <p>Canvas Id : {currentUser.canvas_id} </p>
      <div className="p-0 m-0 flex flex-row items-start justify-start">
        <Canvas
          highlightedArt={highlightedArt}
          setHighlighted={(art: any) => {
            setHighlightedArt(art);
          }}
          currentUser={currentUser}
          enableEditor={() => {
            setToggleArtEditor(true);
          }}
          setRow={setCurrentRow}
          setColumn={setCurrentColumn}
          canvasData={canvasData}
        />
        {highlightedArt['image_src'] && (
          <HighlightPanel highlightedArt={highlightedArt} />
        )}
      </div>

      {toggleArtEditor && (
        <ArtEditor
          updateCanvas={updateCanvas}
          row={currentRow}
          column={currentColumn}
          user={currentUser.username}
          canvasId={currentUser.canvas_id}
          disableEditor={() => {
            setToggleArtEditor(false);
          }}
        />
      )}
    </div>
  );
}
