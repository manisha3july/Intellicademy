import React, { useState, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./loginSignup/Login.js";
import { Outlet, useLocation } from "react-router-dom";
import ProfilePage from "./dashboard/ProfilePage.js";
import LoginModalContext from "./loginSignup/LoginModalContext"; // ✅ Import your context

const Layout = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  
  
  return (
    <LoginModalContext.Provider value={{ handleShow }}>
      <Header handleShow={handleShow} />
      
     

      {/* The Outlet is where nested routes will render */}
      <Outlet />
      
      <Footer />
      
      {/* Login Modal */}
      <Login show={show} handleClose={handleClose} />
    </LoginModalContext.Provider>
  );
};

export default Layout;
