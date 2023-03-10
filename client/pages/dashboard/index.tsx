import { useState, useEffect } from 'react';
import Canvas from '../../Components/Canvas';
import ArtEditor from '../../Components/ArtEditor';
import apiService from '../../utility/apiService';
import Navbar from '../../Components/Navbar';
import HighlightPanel from '../../Components/HighlightPanel';
import ContributionList from '../../Components/ContributionList';
import {
  selectToggleEditorState,
  setToggleEditorState,
} from '../../store/toggleEditorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectHighlightedArtState } from '../../store/highlightedArtSlice';

export default function Dashboard() {
  const toggleArtEditor = useSelector(selectToggleEditorState);

  // Canvas data needs a type
  const [canvasData, setCanvasData] = useState<any>([]);

  // Define types for these things, current user can also be in a redux store? Maybe not since using JWT
  const [currentUser, setCurrentUser] = useState<any>({});
  const [artworkList, setArtworkList] = useState<any>([]);

  // Maybe also in a redux store?
  // const [highlightedArt, setHighlightedArt] = useState<any>({});
  const highlightedArt = useSelector(selectHighlightedArtState);

  useEffect(() => {
    const getAllCanvasData = async (canvasId: string) => {
      const data = await apiService.getAllArtworkById(canvasId);
      setCanvasData(data);
    };

    // On load, we need to grab all canvas and art data from the server using the token
    // If the token is invalid, or there is no token, we must return to the home page
    const getDataOnLoad = async () => {
      // Grabbing basic User Information { username, email, canvas_id }
      const userResponse = await apiService.retrieveUserInformation();
      setCurrentUser(userResponse);
      // This somehow fixed a loading issue
      getAllCanvasData(userResponse.canvas_id);
      // Get all contribution data
      const contributions = await apiService.retrieveUserArt();
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
      <Navbar canvasId={currentUser.canvas_id} />

      <div className="p-0 m-0 w-screen h-fit my-4 flex flex-row justify-center items-center">
        <p className="text-black font-bold text-3xl">
          Hello /
          <span className="text-cobalt hover:underline">
            {currentUser.username || 'there'}
          </span>
          / ! Welcome to your Personal Canvas.
        </p>
      </div>

      <div className="p-0 m-0 flex flex-row items-start justify-center h-screen">
        <ContributionList contributionData={artworkList} />
        <Canvas
          highlightedArt={highlightedArt}
          currentUser={currentUser}
          canvasData={canvasData}
        />
        {highlightedArt['image_src'] && (
          <HighlightPanel highlightedArt={highlightedArt} />
        )}
      </div>

      {toggleArtEditor && (
        <ArtEditor
          updateCanvas={updateCanvas}
          user={currentUser.username}
          canvasId={currentUser.canvas_id}
        />
      )}
    </div>
  );
}
