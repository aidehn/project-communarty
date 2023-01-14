import { useState } from 'react';
import { MouseEvent } from 'react';
import { ChangeEvent } from 'react';
import Link from 'next/link';

type LoginProps = {
  toggleRegister: () => void;
};

export default function Login({ toggleRegister }: LoginProps) {
  const [email, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Submit name to server
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="m-0 p-5 flex flex-col items-center gap-3 w-96">
        <input
          placeholder="Email"
          type="text"
          onChange={handleUsername}
          className="p-2 px-4 border-3 border-solid border-black outline-none text-md w-full rounded-lg focus:border-cobalt"
        ></input>

        <input
          placeholder="Password"
          type="password"
          onChange={handlePassword}
          className="p-2 px-4 border-3 border-solid border-black outline-none text-md w-full rounded-lg focus:border-cobalt"
        ></input>

        <Link href={`dashboard/${email}`} className="w-full">
          <button
            onClick={handleClick}
            className="p-2 px-4 m-0 bg-black w-full border-black text-white border-3 border-solid rounded-lg hover:border-cobalt font-bold"
          >
            Login
          </button>
        </Link>
      </form>
      <p
        className="text-cobalt underline cursor-pointer"
        onClick={() => {
          toggleRegister();
        }}
      >
        Create an account
      </p>
    </div>
  );
}
