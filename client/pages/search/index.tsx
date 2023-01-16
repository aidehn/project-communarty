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

  return (
    <div className="m-0 p-0 w-screen h-screen bg-offwhite">
      <Navbar />
      <p className="text-3xl font-semibold">Search for other Canvases</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          className="p-2 px-4 border-3 border-solid border-black outline-none text-md w-1/3 rounded-lg focus:border-cobalt"
          placeholder="Search by Canvas ID"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
      </form>

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
      {toggleArtEditor && (
        <ArtEditor
          row={currentRow}
          column={currentColumn}
          user={currentUser.username}
          canvasId={searchTerm}
          disableEditor={() => {
            setToggleArtEditor(false);
          }}
        />
      )}
      {highlightedArt['image_src'] && (
        <HighlightPanel highlightedArt={highlightedArt} />
      )}
    </div>
  );
}
