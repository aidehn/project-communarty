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

  useEffect(() => {
    // grab all photos for this canvas_id : test_canvas
    const getAllCanvasData = async (canvasId: string) => {
      const data = await apiService.getAllArtworkById(canvasId);
      setCanvasData(data);
    };
    getAllCanvasData('canvas_id');
  }, []);

  return (
    <div className="m-0 p-0 w-screen h-screen bg-offwhite">
      <Navbar />
      {/* Purely for testing purposes */}
      <div id="testing-suite" className="flex flex-row gap-4 w-screen">
        {canvasData.map((artwork: any) => (
          <div className="flex flex-col">
            <img className="h-10 w-10" src={artwork.img_url} />
            <p>
              ROW: {artwork.row} COLUMN: {artwork.column}
            </p>
          </div>
        ))}
      </div>

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
          user={inputName}
          disableEditor={() => {
            setToggleArtEditor(false);
          }}
        />
      )}
    </div>
  );
}
