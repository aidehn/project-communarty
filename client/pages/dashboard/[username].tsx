import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Canvas from '../../Components/Canvas';
import ArtEditor from '../../Components/ArtEditor';
import apiService from '../../utility/apiService';

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
    // Using a single canvas for now
    getAllCanvasData('test_canvas');
    // populate them into the canvas
  }, []);

  return (
    <div className="m-0 p-0 w-screen h-screen bg-offwhite">
      <Canvas
        enableEditor={() => {
          setToggleArtEditor(true);
        }}
        setRow={setCurrentRow}
        setColumn={setCurrentColumn}
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
