import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Common/Navbar";
import LandingPage from "./Pages/LandingPage";
import Footer from "./Components/Common/Footer";
const App = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
          <Routes>
            <Route path="/home" element={<LandingPage />} />
          </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
