import { CloudWatchLogs } from 'aws-sdk';
import { useState, useEffect } from 'react';

type ArtSlotProps = {
  image_src: string | undefined;
  creator?: string;
  row: number;
  highlightedArt: any;
  setHighlighted: (art: any) => void;
  column: number;
  enableEditor: () => void;
  setRow: (index: number) => void;
  setColumn: (index: number) => void;
};

export default function ArtSlot({
  row,
  column,
  image_src,
  creator,
  enableEditor,
  setRow,
  setColumn,
  highlightedArt,
  setHighlighted,
}: ArtSlotProps) {
  const setStateOnClick = (row: number, column: number) => {
    // We want the editor to have access to the row and column the user clicks on, for data storage purposes.
    setRow(row);
    setColumn(column);
    enableEditor();
  };

  return (
    <div
      className="p-0 m-0 h-20 w-20 flex flex-col justify-center items-center bg-offwhite hover:cursor-pointer"
      onClick={() => {
        setHighlighted({ creator, image_src });
      }}
    >
      <img
        onClick={
          image_src
            ? () => {
                // testing
                console.log(creator);
              }
            : () => {
                setStateOnClick(row, column);
              }
        }
        className="h-full w-full hover:rounded-md hover:shadow-around hover:scale-150 ease-out duration-50"
        src={image_src || process.env.NEXT_PUBLIC_PLACEHOLDER_IMAGE}
      />
    </div>
  );
}
