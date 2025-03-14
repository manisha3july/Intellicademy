import React from "react";
import logo from "../assests/logo-1.png"
const Header = () => {
  return (
    <header className=" text-white fixed-top">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <img src={logo}  className="logo-img" />
          </a>

          <ul className="nav nav-pills">
            <li><a href="#" className="nav-link px-2 ">Home</a></li>
            <li><a href="#" className="nav-link px-2 ">About</a></li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">AI Concepts</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Machine Learning</a></li>
                <li><a class="dropdown-item" href="#">Deep Learning</a></li>
                <li><a class="dropdown-item" href="#">Generative AI</a></li>
                <li><a class="dropdown-item" href="#">Data Analytics</a></li>
                <li><a class="dropdown-item" href="#">Neural Networks</a></li>
              </ul>
            </li>
            <li><a href="#" className="nav-link px-2 ">Blog</a></li>
            <li><a href="#" className="nav-link px-2 ">Contact Us</a></li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">Login</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
