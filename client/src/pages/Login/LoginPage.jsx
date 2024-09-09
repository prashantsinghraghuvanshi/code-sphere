import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin"; 
// import axios from "axios";

const Login = () => {
  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");

  const {login, loading}=useLogin();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    await login(username, password);
    // const data = await axios.post("http://localhost:5001/api/auth/signIn",{
    //     username, 
    //     password
    // })
    // console.log(data,"data");
  }

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <div className="my-5 mb-10 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Log in on Code-Sphere
          </p>
        </div>
        <form onSubmit={handleSubmit}>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Username"
          onChange={(e)=>setUsername(e.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center md:text-left">
          <button
            disabled={loading}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            Login
          </button>
        </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            to="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;