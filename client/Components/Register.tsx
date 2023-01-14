import { FormEvent, useState } from 'react';
import { ChangeEvent } from 'react';
import apiService from '../utility/apiService';
import Link from 'next/link';
import { useRouter } from 'next/router';

// If I remember, make register and login one component i dont know why it is separate i am too far gone

type RegisterProps = {
  toggleRegister: () => void;
};

export default function Register({ toggleRegister }: RegisterProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [promptMessage, setPromptMessage] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async () => {
    const userData = { username, email, password };
    console.log('woo');
    // Don't want to return the user details. Returns the status of the account creation
    const response = await apiService.createAccount(userData);
    setPromptMessage(response.status);
    // Go back to the login page to sign-in
    router.push('/login');

    console.log(status);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        className="m-0 p-5 flex flex-col items-center gap-3 w-96"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Username */}
        <input
          required
          placeholder="Username"
          type="text"
          onChange={handleUsername}
          className="p-2 px-4 border-3 border-solid border-black outline-none text-md w-full rounded-lg focus:border-cobalt"
        ></input>

        {/* Email */}
        <input
          required
          placeholder="Email"
          type="text"
          onChange={handleEmail}
          className="p-2 px-4 border-3 border-solid border-black outline-none text-md w-full rounded-lg focus:border-cobalt"
        ></input>

        {/* Password */}
        <input
          required
          placeholder="Password"
          type="password"
          onChange={handlePassword}
          className="p-2 px-4 border-3 border-solid border-black outline-none text-md w-full rounded-lg focus:border-cobalt"
        ></input>
        <button
          type="submit"
          className="p-2 px-4 m-0 bg-black w-full border-black text-white border-3 border-solid rounded-lg font-bold hover:bottom-[2px] hover:relative"
        >
          Create Account
        </button>
      </form>
      <p className="text-gray-500">{promptMessage}</p>
      <p className="text-gray-500">
        Have an account?{' '}
        <span
          className="text-cobalt underline cursor-pointer"
          onClick={() => {
            toggleRegister();
          }}
        >
          Login here
        </span>
      </p>
    </div>
  );
}
