import { useState } from 'react';
import { ChangeEvent } from 'react';
import apiService from '../utility/apiService';
import { useRouter } from 'next/router';

type LoginProps = {
  toggleRegister: () => void;
};

export default function Login({ toggleRegister }: LoginProps) {
  const [email, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async () => {
    const loginData = { email, password };
    const response = await apiService.loginUser(loginData);
    if (response && response.token) {
      // If there was a response from the server, and the token exists, set in local storage for future requests.
      localStorage.setItem('token', response.token);
      // Navigate to the dashboard
      router.push('/dashboard');
    }
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="m-0 p-5 flex flex-col items-center gap-3 w-96"
      >
        <input
          placeholder="Email"
          type="text"
          required
          onChange={handleUsername}
          className="p-2 px-4 border-3 border-solid border-black outline-none text-md w-full rounded-lg focus:border-cobalt"
        ></input>

        <input
          placeholder="Password"
          type="password"
          required
          onChange={handlePassword}
          className="p-2 px-4 border-3 border-solid border-black outline-none text-md w-full rounded-lg focus:border-cobalt"
        ></input>

        {/* <Link href={`dashboard/PLACEHOLDER`} className="w-full">
        </Link> */}
        <button
          type="submit"
          className="p-2 px-4 m-0 bg-black w-full border-black text-white border-3 border-solid rounded-lg font-bold hover:bottom-[2px] hover:relative"
        >
          Log in
        </button>
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
