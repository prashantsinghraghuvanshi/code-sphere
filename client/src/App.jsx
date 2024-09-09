import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login/loginPage"
import Register from "./pages/RegisterPage/Register"

function App() {

  return (
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
  )
}

export default App
