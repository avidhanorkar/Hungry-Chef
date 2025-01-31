import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Common/Navbar";
import LandingPage from "./Pages/LandingPage";
import Footer from "./Components/Common/Footer";
import LoginPage from "./Pages/Auth/LoginPage";
import Register from "./Pages/Auth/Register";
import AuthPage from "./Pages/Auth/AuthPage";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
