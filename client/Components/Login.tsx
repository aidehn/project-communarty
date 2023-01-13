import { useState } from 'react';
import { MouseEvent } from 'react';
import { ChangeEvent } from 'react';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState<string>('');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Submit name to server
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <form className="m-0 p-5 flex flex-col items-center gap-4 w-96">
      <input
        placeholder="username"
        onChange={handleChange}
        className="p-2 px-4 border-3 border-solid border-black outline-none text-md w-full rounded focus:border-cobalt"
      ></input>

      <Link href={`dashboard/${username}`} className="w-full">
        <button
          onClick={handleClick}
          className="py-1 px-5 bg-black w-full border-black text-white border-3 border-solid rounded-lg hover:border-cobalt"
        >
          Start
        </button>
      </Link>
    </form>
  );
}
