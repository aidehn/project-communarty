import ArtSlot from './ArtSlot'

type CanvasRowProps = {
  width: number;
  row: number;
  image_src: string | undefined;
  enableEditor: () => void;
  setRow: (index: number) => void;
  setColumn: (index: number) => void;
}

export default function CanvasRow ({ width, row, image_src, enableEditor, setRow, setColumn }: CanvasRowProps) {
  // Defining a given row in the grid
  const gridRow = [];
  // Populating the row with artwork stored in the server
  for (let i = 0; i < width; i++) {
    gridRow.push(<ArtSlot
      image_src={image_src}
      row={row} column={i}
      enableEditor={enableEditor}
      setRow={setRow}
      setColumn={setColumn}
    />);
  }
  return (
    <div className="m-0 p-0 flex flex-row">
      {gridRow}
    </div>
  )
}