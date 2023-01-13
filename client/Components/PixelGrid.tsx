import { MutableRefObject, RefObject } from 'react';
import Row from './Row';

type PixelGridProps = {
  currentColor: string;
  exportRef: RefObject<HTMLDivElement>;
};

export default function PixelGrid({ currentColor, exportRef }: PixelGridProps) {
  // Hard Coded Dimensions for the PixelArt, here it will 16x16
  const HEIGHT = 16;
  const WIDTH = 16;
  const grid = [];

  // Populating the Grid
  for (let i = 0; i < HEIGHT; i++)
    grid.push(<Row key={i} width={WIDTH} currentColor={currentColor} />);

  return (
    <div className="p-0 m-0 shadow-xl">
      <div id="pixel-grid" ref={exportRef} className="p-0 m-0">
        {grid}
      </div>
    </div>
  );
}
