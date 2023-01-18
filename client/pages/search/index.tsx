import Navbar from '../../Components/Navbar';
import Canvas from '../../Components/Canvas';
import ArtEditor from '../../Components/ArtEditor';
import { useEffect, useState } from 'react';
import apiService from '../../utility/apiService';
import HighlightPanel from '../../Components/HighlightPanel';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<any>({});
  const [canvasData, setCanvasData] = useState<any>([]);
  const [currentRow, setCurrentRow] = useState<undefined | number>(undefined);
  const [currentColumn, setCurrentColumn] = useState<undefined | number>(
    undefined
  );
  const [toggleArtEditor, setToggleArtEditor] = useState(false);
  const [highlightedArt, setHighlightedArt] = useState<any>({});

  useEffect(() => {
    // On load, we need to grab all canvas and art data from the server using the token
    // If the token is invalid, or there is no token, we must return to the home page**
    const getDataOnLoad = async () => {
      // Grabbing basic User Information { username, email, canvas_id }
      const userResponse = await apiService.retrieveUserInformation();
      setCurrentUser(userResponse);
    };
    getDataOnLoad();
  }, []);

  const handleSubmit = async () => {
    const contributions = await apiService.getAllArtworkById(searchTerm);
    setCanvasData(contributions);
  };

  const updateCanvas = async (canvasId: string) => {
    const newCanvas = await apiService.getAllArtworkById(canvasId);
    setCanvasData(newCanvas);
  };

  return (
    <div className="m-0 p-0 w-screen h-screen bg-offwhite">
      <Navbar canvasId={currentUser.canvas_id} />

      <div className="p-0 w-screen h-fit my-4 flex flex-col justify-center items-center">
        <p className="text-black font-bold text-3xl">
          Search for other Canvases
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-1/2"
        >
          <input
            className="py-2 px-4 mt-3 border-2 border-solid border-black outline-none text-md w-full rounded-lg focus:border-cobalt"
            placeholder="Search by Canvas ID"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
        </form>
      </div>

      <div className="p-0 m-0 flex flex-row items-start justify-center">
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
          canvasId={searchTerm}
          disableEditor={() => {
            setToggleArtEditor(false);
          }}
        />
      )}
    </div>
  );
}
