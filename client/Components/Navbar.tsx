import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="m-0 p-0 w-full h-16 sticky bg-black flex flex-row justify-between top-0 items-center shadow-xl px-5">
      <p className="text-3xl text-white font-semibold">
        <Link href="/">
          Commun/<span className="text-cobalt">art</span>/y.
        </Link>
      </p>

      <Link href="/login">
        <button className="p-0 m-0 text-sm text-white justify-center bg-cobalt rounded-md w-24 h-9 shadow-md font-semibold hover:bg-cobalt/80">
          Logout
        </button>
      </Link>
    </div>
  );
}
