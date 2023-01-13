import CanvasRow from './CanvasRow';

type CanvasProps = {
  enableEditor: () => void;
  setRow: (index: number) => void;
  setColumn: (index: number) => void;
  canvasData: any[];
};

export default function Canvas({
  enableEditor,
  setRow,
  setColumn,
  canvasData,
}: CanvasProps) {
  // Hard Coded Dimensions for the Canvas, here it will 32x16?
  const image_src =
    'https://res.cloudinary.com/deq8mjrh3/image/upload/v1673599780/communarty/qdq6q36jtrjfjxqkyecl.jpg';
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
        image_src={''}
        row={i}
        enableEditor={enableEditor}
        setRow={setRow}
        setColumn={setColumn}
        rowData={rowData}
      />
    );
  }

  return (
    <div className="p-0 m-2 mx-4 shadow-xl w-fit border-black">{grid}</div>
  );
}
