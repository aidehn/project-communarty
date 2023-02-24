type CreateCanvasProps = {
  username: string;
  toggleCreateCanvas: () => void;
};

export default function CreateCanvas({
  username,
  toggleCreateCanvas,
}: CreateCanvasProps) {
  const handleSubmit = () => {
    // disable the editor
    // send the canvas data to the database
  };

  return (
    <div className="m-0 p-0 w-screen h-screen bg-black/70 flex items-center justify-center top-0 absolute z-10 backdrop-blur-sm">
      <div className="p-2 pt-4 flex flex-col items-center justify-center rounded-lg absolute bg-offwhite shadow-md z-20">
        <p className="font-semibold">New Canvas</p>
        <form
          className="m-0 p-5 flex flex-col items-center gap-3 w-96"
          onSubmit={() => {
            handleSubmit;
          }}
        >
          <input
            type="text"
            placeholder="Name"
            className="p-2 px-4 border-3 border-solid border-black outline-none text-md w-full rounded-lg focus:border-cobalt"
          ></input>
          <button
            type="submit"
            className="p-2 px-4 m-0 bg-black w-full border-black text-white border-3 border-solid rounded-lg font-bold hover:border-3 hover:border-cobalt "
          >
            Create
          </button>
        </form>
        <button
          onClick={() => {
            toggleCreateCanvas();
          }}
        >
          close it
        </button>
      </div>
    </div>
  );
}
