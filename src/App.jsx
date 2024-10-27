import  { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import './App.css'
import Login from './pages/login'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Weather from "./pages/Weather";



function App() {
  

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/weather/:location" element={<Weather />} />
                {/* Other routes can go here */}
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
