import { useState } from "react";
import { useOtpVerification } from "../../hooks/useOtpVerification";


const Login = () => {
  const [otp, setOtp]=useState("");

  const {otpVerification, loading}=useOtpVerification();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    // need to get userId here
    await otpVerification(otp);
  }

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <div className="my-5 mb-10 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            An OTP has been sent to your email
          </p>
        </div>
        <form onSubmit={handleSubmit}>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="number"
          placeholder="Enter OTP"
          onChange={(e)=>setOtp(e.target.value)}
        />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Resend the OTP?
          </a>
        </div>
        <div className="text-center md:text-left">
          <button
            disabled={loading}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            Submit
          </button>
        </div>
        </form>
      </div>
    </section>
  );
};

export default Login;