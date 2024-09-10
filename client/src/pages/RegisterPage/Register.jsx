import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";

const Register = () => {
  const [username, setUsername]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const navigate = useNavigate();

  const {register}=useRegister();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const result=await register(username, email, password);

    if (result.status === 201) {
      navigate('/');
    }
  }

  return (
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <div className="my-5 mb-10 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
              Register on Code-Sphere
            </p>
          </div>
          <form onSubmit={handleSubmit}>
          <input
            className="text-sm w-full mb-5 px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Username"
            onChange={(e)=>setUsername(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Email Address"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Register
            </button>
          </div>
          </form>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Already have an account?{" "}
            <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            to="/"
          >
            Sign in 
          </Link>
          </div>
        </div>
      </section>
    );
  };

  
export default Register;