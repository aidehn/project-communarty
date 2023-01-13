import { CloudHSM } from "aws-sdk";

type ArtSlotProps = {
  image_src: string | undefined;
  creator?: string;
  row: number;
  column: number;
  enableEditor: () => void;
  setRow: (index: number) => void;
  setColumn: (index: number) => void;
}


// To each artslot we need to pass in a row and column, as well as an image that we retrieved from the server
// We access this data as on load we will fetch all images accociated with the canvas

export default function ArtSlot ({ row, column, image_src, creator, enableEditor, setRow, setColumn}: ArtSlotProps) {
  const setStateOnClick = (row: number, column: number) => {
    // We want the editor to have access to the row and column the user clicks on, for data storage purposes.
    setRow(row);
    setColumn(column);
    enableEditor();
  }
  return (
    <div onClick={() => { setStateOnClick(row, column) }} className="p-0 m-0 h-14 w-14 bg-offwhite">
      <img src={image_src} className="h-full w-full"/>
    </div>
  )
}