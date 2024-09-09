import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login/loginPage"
import Register from "./pages/RegisterPage/Register"
import HomePage from "./pages/Home/HomePage"

function App() {

  return (
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
  )
}

export default App
