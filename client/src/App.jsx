import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/Login/loginPage"
import Register from "./pages/RegisterPage/Register"
import HomePage from "./pages/Home/HomePage"
import OtpVerification from './pages/OtpVerification/OtpVerification';

function App() {

  return (
        <div>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/otpVerification" element={<OtpVerification />} />
          </Routes>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
  )
}

export default App
