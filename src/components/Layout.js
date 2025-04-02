


import React, { useState } from "react"; // ✅ Fix: Removed duplicate import
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login.js";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Header handleShow={handleShow} />
      {children}
      <Outlet />
      <Footer />
      <Login show={show} handleClose={handleClose} />
    </>
  );
};

export default Layout;
