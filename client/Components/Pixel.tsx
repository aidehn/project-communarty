import { useState } from 'react';

type PixelProps = {
  currentColor: string;
};

export default function Pixel({ currentColor }: PixelProps) {
  // Setting the default color of the canvas to white
  const [pixelColor, setPixelColor] = useState('#FFFFFF');
  const [prevColor, setPrevColor] = useState(currentColor);
  const [canEditColor, setCanEditColor] = useState(true);

  // onClick change the color of the pixel
  const changeColor = () => {
    setPixelColor(currentColor);
    setCanEditColor(false);
  };

  // Upon entering the pixel, preview the new color
  const previewColor = () => {
    // Set the previous colour
    setPrevColor(pixelColor);
    // Set the new preview colour
    setPixelColor(currentColor);
  };

  // Upon leaving the pixel, remove the preview and return to the old colour
  const returnColor = () => {
    if (canEditColor) setPixelColor(prevColor);
    setCanEditColor(true);
  };

  // Tailwind doesn't support dynamic class names, using inline styling instead
  return (
    <div
      className="h-7 w-7 hover:cursor-pointer"
      style={{ backgroundColor: pixelColor }}
      onClick={changeColor}
      onMouseEnter={previewColor}
      onMouseLeave={returnColor}
    ></div>
  );
}
