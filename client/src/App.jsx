import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import ForgotPassword from "./pages/ForgottenPassword";
import EditPost from "./components/editPost/EditPost";
import ProfileUpdate from "./pages/user/profile/ProfileUpdate";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/profile/update" element={<ProfileUpdate />} />

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:_id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
