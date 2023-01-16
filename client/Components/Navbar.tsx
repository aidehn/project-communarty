import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="m-0 p-0 w-full h-16 sticky bg-black flex flex-row justify-between top-0 items-center shadow-xl px-5">
      <p className="text-3xl text-white font-semibold">
        <Link href="/dashboard">
          Commun/<span className="text-cobalt">art</span>/y.
        </Link>
      </p>

      <Link href="/search">
        <div className="h-full w-fit px-10 py-1 font-semibold flex flex-col justify-center items-center bg-white/90 rounded-full">
          <p className="text-gray-500">Explore</p>
        </div>
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
  );
}
