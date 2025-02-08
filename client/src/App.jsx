import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Common/Navbar";
import LandingPage from "./Pages/LandingPage";
import Footer from "./Components/Common/Footer";
import AuthPage from "./Pages/Auth/AuthPage";
import TableReservation from "./Pages/Table Reservation";
import Profile from "./Pages/Profile";
import { AuthProvider } from './context/auth.context'; // Import AuthProvider
import UpdateProfile from "./Components/Profile/updateProfile";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider> {/* Wrap Routes with AuthProvider */}
          <Navbar />
          <Routes>
            <Route path="/home" element={<LandingPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reserveTable" element={<TableReservation />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/update/:id" element={<UpdateProfile/>}/>
            <Route path="/reserveTable" element={<TableReservation />} />
            <Route path="/browseMenu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
