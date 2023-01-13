import CanvasRow from "./CanvasRow";

type CanvasProps = {
  enableEditor: () => void;
  setRow: (index: number) => void;
  setColumn: (index: number) => void;
}

export default function Canvas ({ enableEditor, setRow, setColumn}: CanvasProps) {
  // Hard Coded Dimensions for the Canvas, here it will 32x16?
  const image_src = 'https://res.cloudinary.com/deq8mjrh3/image/upload/v1673549518/communarty/jhnr6gfur2m88vmuphrn.jpg';
  const HEIGHT = 12;
  const WIDTH = 24;
  const grid = [];

  // Populating the Grid
  for (let i = 0; i < HEIGHT; i++) {
    grid.push(<CanvasRow
      width={WIDTH}
      image_src={image_src}
      row={i}
      enableEditor={enableEditor}
      setRow={setRow}
      setColumn={setColumn}
    />);
  }

  return (<div className="p-2 m-2">
    {grid}
  </div>)
}