import { useEffect, useState, createRef } from 'react';
import { TwitterPicker } from 'react-color';
import PixelGrid from './PixelGrid';
import convertCanvasToImageUrl from '../utility/imageConversion';
import apiService from '../utility/apiService';

type ArtEditorProps = {
  row?: number;
  column?: number;
  user: string;
  canvasId: string;
  disableEditor: () => void;
};

export default function ArtEditor({
  user,
  disableEditor,
  row,
  column,
  canvasId,
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
    const imageBase64 = await convertCanvasToImageUrl(exportRef.current);
    const data = { imageBase64, user, row, column, canvasId };
    console.log(data);

    // Currently it contains all information on the image given by Cloudinary
    const response = await apiService.postImageToServer(data);
    console.log(response);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="m-0 p-0 w-screen h-screen bg-black/70 flex items-center justify-center top-0 absolute z-10 backdrop-blur-sm">
        <div className="pt-5 flex flex-col items-center justify-center w-1/3 rounded-lg absolute bg-offwhite shadow-md z-20">
          {/* The Pixel Art canvas */}
          <PixelGrid
            exportRef={exportRef}
            currentColor={currentColor}
          ></PixelGrid>

          {/* A div containing the color picker and the button which on click sends the canvas to be saved in Cloudinary  */}
          <div className="px-5 py-5 flex justify-center flex-row w-full gap-4">
            {/* Colour Picker */}
            <TwitterPicker
              className="border-2 border-black rounded-lg"
              color={currentColor}
              onChangeComplete={(color) => {
                setCurrentColor(color.hex);
              }}
            />
            {/* Div Containing the Buttons */}
            <div className="flex flex-col items-center w-1/3 gap-2">
              <button
                className="p-0 m-0 bg-black w-full h-1/2 border-black text-white border-2 border-solid rounded-md hover:border-cobalt font-bold shadow-md"
                onClick={() => {
                  submitArtwork();
                }}
              >
                Submit
              </button>
              <button
                className="p-0 m-0 bg-black w-full h-1/2 border-black text-white border-2 border-solid rounded-md hover:border-cobalt font-bold shadow-md"
                onClick={() => {
                  disableEditor();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
