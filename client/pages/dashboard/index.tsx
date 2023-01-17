import { useState, useEffect } from 'react';
import Canvas from '../../Components/Canvas';
import ArtEditor from '../../Components/ArtEditor';
import apiService from '../../utility/apiService';
import Navbar from '../../Components/Navbar';
import HighlightPanel from '../../Components/HighlightPanel';
import { image } from 'html2canvas/dist/types/css/types/image';
import ContributionList from '../../Components/ContributionList';

export default function Dashboard() {
  const [toggleArtEditor, setToggleArtEditor] = useState(false);
  const [canvasData, setCanvasData] = useState<any>([]);
  const [currentRow, setCurrentRow] = useState<undefined | number>(undefined);
  const [currentColumn, setCurrentColumn] = useState<undefined | number>(
    undefined
  );
  const [currentUser, setCurrentUser] = useState<any>({});
  const [artworkList, setArtworkList] = useState<any>([]);
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

      // Get all contribution data
      const contributions = await apiService.retrieveUserArt();
      console.log(contributions);
      setArtworkList(contributions.reverse());
    };
    getDataOnLoad();
  }, []);

  const updateCanvas = async (canvasId: string) => {
    const newCanvas = await apiService.getAllArtworkById(canvasId);
    const newContributions = await apiService.retrieveUserArt();
    setCanvasData(newCanvas);
    setArtworkList(newContributions.reverse());
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
      <div className="p-0 m-0 h-screen flex flex-row items-start justify-start">
        <div>
          <p className="m-4 mt-0 p-0 font-bold text-xl">
            /<span className="text-cobalt">art</span>/{' '}
            {highlightedArt['creator']}
          </p>
          <ContributionList contributionData={artworkList} />
        </div>
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

      {/* PLACE ARTWORK LIST HERE */}

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
