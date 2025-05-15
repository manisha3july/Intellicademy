import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./loginSignup/Login.js";
import { Outlet } from "react-router-dom";
import LoginModalContext from "./loginSignup/LoginModalContext"; // ✅ Import your context

const Layout = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <LoginModalContext.Provider value={{ handleShow }}>
      <Header handleShow={handleShow} />
      <Outlet />
      <Footer />
      <Login show={show} handleClose={handleClose} />
    </LoginModalContext.Provider>
  );
};

export default Layout;
