import ArtSlot from './ArtSlot';

type CanvasRowProps = {
  width: number;
  row: number;
  image_src: string | undefined;
  rowData: any[];
  enableEditor: () => void;
  setRow: (index: number) => void;
  setColumn: (index: number) => void;
};

export default function CanvasRow({
  width,
  row,
  image_src,
  rowData,
  enableEditor,
  setRow,
  setColumn,
}: CanvasRowProps) {
  // Defining a given row in the grid
  const gridRow = [];
  // Populating the row with artwork stored in the server
  for (let i = 0; i < width; i++) {
    const artData = rowData.find((artwork) => artwork.column === i);
    const imageUrl = artData ? artData['img_url'] : '';

    gridRow.push(
      <ArtSlot
        key={i}
        image_src={imageUrl}
        row={row}
        column={i}
        enableEditor={enableEditor}
        setRow={setRow}
        setColumn={setColumn}
      />
    );
  }
  return <div className="m-0 p-0 flex flex-row w-fit">{gridRow}</div>;
}
