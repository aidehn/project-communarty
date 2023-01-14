import Login from '../../Components/Login';
import Register from '../../Components/Register';
import { useState } from 'react';

export default function LoginPage() {
  const [register, setRegister] = useState(false);
  return (
    <div className="p-0 m-0 flex flex-col w-screen h-screen items-center justify-center">
      {!register ? (
        <Login
          toggleRegister={() => {
            setRegister(!register);
          }}
        />
      ) : (
        <Register
          toggleRegister={() => {
            setRegister(!register);
          }}
        />
      )}
    </div>
  );
}
