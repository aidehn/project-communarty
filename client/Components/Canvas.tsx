import CanvasRow from './CanvasRow';
import { useState } from 'react';

type UserDetails = {
  username: string;
  email: string;
  canvas_id: string;
};

type CanvasProps = {
  canvasData: any[];
  currentUser: UserDetails;
  highlightedArt: any;
};

export default function Canvas({ canvasData, highlightedArt }: CanvasProps) {
  // Hard Coded Dimensions for the Canvas
  const HEIGHT = 12;
  const WIDTH = 24;
  const grid = [];

  // Populating the Grid
  for (let i = 0; i < HEIGHT; i++) {
    const rowData = canvasData.filter((artwork: any) => artwork.row === i);
    grid.push(
      <CanvasRow
        key={i}
        width={WIDTH}
        row={i}
        rowData={rowData}
        highlightedArt={highlightedArt}
      />
    );
  }

  return (
    <div className="flex flex-col items-start w-fit gap-3 h-fit">
      <div className="shadow-md w-fit self-start">{grid}</div>
    </div>
  );
}
