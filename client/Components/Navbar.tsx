import Link from 'next/link';
import { AiOutlineForm } from 'react-icons/ai';

type NavbarProps = {
  canvasId: string;
};

export default function Navbar({ canvasId }: NavbarProps) {
  return (
    <div className="m-0 p-0 w-full h-16 sticky bg-black flex flex-row justify-between top-0 items-center shadow-xl px-5">
      <p className="text-3xl text-white font-semibold">
        <Link href="/dashboard">
          Commun/<span className="text-cobalt">art</span>/y.
        </Link>
      </p>

      <div className="p-0 m-0 h-full w-fit flex flex-row gap-4 items-center">
        <button
          className="p-0 m-0 text-white flex justify-center items-center bg-cobalt rounded-md w-9 h-9 shadow-md hover:bg-cobalt/80"
          onClick={() => {
            // Copies the users canvasId to the clipboard
            navigator.clipboard.writeText(canvasId);
          }}
        >
          <AiOutlineForm />
        </button>

        <Link href="/search">
          <button className="p-0 m-0 text-sm font-semibold text-white justify-center bg-cobalt rounded-md w-24 h-9 shadow-md hover:bg-cobalt/80">
            Explore
          </button>
        </Link>

        <Link href="/login">
          <button
            onClick={() => {
              localStorage.removeItem('token');
            }}
            className="p-0 m-0 text-sm font-semibold text-white justify-center bg-cobalt rounded-md w-24 h-9 shadow-md hover:bg-cobalt/80"
          >
            Log out
          </button>
        </Link>
      </div>
    </div>
  );
}
