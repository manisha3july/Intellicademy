


import React, { useState } from "react"; // ✅ Fix: Removed duplicate import
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login.js";
import { Outlet } from "react-router-dom";

const Layout = ({  }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Header handleShow={handleShow} />
     
      <Outlet />
      <Footer />
      <Login show={show} handleClose={handleClose} />
    </>
  );
};

export default Layout;
