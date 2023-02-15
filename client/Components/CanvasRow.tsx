import ArtSlot from './ArtSlot';

type CanvasRowProps = {
  width: number;
  row: number;
  rowData: any[];
  highlightedArt: any;
  setHighlighted: (art: any) => void;
};

export default function CanvasRow({
  width,
  row,
  rowData,
  highlightedArt,
  setHighlighted,
}: CanvasRowProps) {
  // Defining a given row in the grid
  const gridRow = [];
  // Populating the row with artwork stored in the server
  for (let i = 0; i < width; i++) {
    const artData = rowData.find((artwork) => artwork.column === i);
    const imageUrl = artData ? artData['img_url'] : '';

    gridRow.push(
      <ArtSlot
        highlightedArt={highlightedArt}
        setHighlighted={setHighlighted}
        key={i}
        image_src={imageUrl}
        row={row}
        column={i}
        creator={(artData && artData['owner_id']) || ''}
      />
    );
  }
  return <div className="m-0 p-0 flex flex-row w-fit">{gridRow}</div>;
}
