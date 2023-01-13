import { useEffect, useState, createRef } from 'react';
import { CompactPicker } from 'react-color';
import PixelGrid from './PixelGrid';
import convertCanvasToImageUrl from '../utility/imageConversion';
import apiService from '../utility/apiService';

type ArtEditorProps = {
  row?: number;
  column?: number;
  user: string;
  disableEditor: () => void;
};

export default function ArtEditor({
  user,
  disableEditor,
  row,
  column,
}: ArtEditorProps) {
  // Set the initial color chosen to be black
  const [currentColor, setCurrentColor] = useState('#000000');

  // Make a reference to the PixelGrid Component
  const exportRef = createRef<HTMLDivElement>();

  // Submit to the Cloudinary Store
  const submitArtwork = async () => {
    // Close the editor
    disableEditor();

    // Base64 Image URL
    const imageUrl = await convertCanvasToImageUrl(exportRef.current);
    const data = { image: imageUrl, username: user };

    // Currently it contains all information on the image given by Cloudinary
    const response = await apiService.postImageToServer(data);
    console.log(response);
  };

  return (
    <div className="m-0 p-0 w-screen h-screen bg-black/70 flex justify-center relative items-center z-10">
      <div className="border-3 border-black flex flex-col items-center justify-center w-1/3 rounded-lg bg-white z-20">
        <h1>
          Hello {user} ROW:{row || 'no row'} COLUMN:{column || 'no column'}
        </h1>

        {/* The Pixel Art canvas */}
        <PixelGrid
          exportRef={exportRef}
          currentColor={currentColor}
        ></PixelGrid>

        {/* A div containing the color picker and the button which on click sends the canvas to be saved in Cloudinary  */}
        <div className="flex flex-row gap-3">
          <CompactPicker
            className="border-2 border-black rounded-lg"
            color={currentColor}
            onChangeComplete={(color) => {
              setCurrentColor(color.hex);
            }}
          />
          <button
            onClick={() => {
              submitArtwork();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
