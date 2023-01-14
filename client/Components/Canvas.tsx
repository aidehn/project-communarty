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
    <div className="flex flex-col items-start w-screen p-5 py-4 gap-3 m-5 my-4">
      <p className="text-3xl font-semibold">Canvas Name</p>
      <div className="shadow-xl w-fit self-start">{grid}</div>
    </div>
  );
}
