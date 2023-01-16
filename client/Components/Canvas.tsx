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
  //

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
    <div className="flex flex-col items-start w-fit p-2 py-4 gap-3 m-5 my-4">
      <div className="shadow-xl w-fit self-start">{grid}</div>
    </div>
  );
}
