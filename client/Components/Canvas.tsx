import CanvasRow from './CanvasRow';
import { useState } from 'react';

type UserDetails = {
  username: string;
  email: string;
  canvas_id: string;
};

type CanvasProps = {
  enableEditor: () => void;
  setRow: (index: number) => void;
  setColumn: (index: number) => void;
  canvasData: any[];
  currentUser: UserDetails;
  highlightedArt: any;
  setHighlighted: (art: any) => void;
};

export default function Canvas({
  enableEditor,
  setRow,
  setColumn,
  canvasData,
  currentUser,
  highlightedArt,
  setHighlighted,
}: CanvasProps) {
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
        enableEditor={enableEditor}
        setRow={setRow}
        setColumn={setColumn}
        rowData={rowData}
        highlightedArt={highlightedArt}
        setHighlighted={setHighlighted}
      />
    );
  }

  return (
    <div className="flex flex-col items-start w-fit gap-3 h-fit">
      <div className="shadow-md w-fit self-start">{grid}</div>
    </div>
  );
}
