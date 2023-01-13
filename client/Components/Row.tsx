import Pixel from './Pixel'

type RowProps = {
  width: number;
  currentColor: string;
}

export default function Row ({ width, currentColor }: RowProps) {
  // Defining a given row in the grid
  const row = [];
  // Populating the row with "pixels"
  for (let i = 0; i < width; i++) row.push(<Pixel key={i} currentColor={currentColor}/>)

  return (
    <div className="m-0 p-0 flex flex-row">
      {row}
    </div>
  )
}