import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Customer from "./components/Customer";
import Product from "./components/Product";
import Home from "./components/Home";
import Header from "./components/Header";
import Hero from "./components/Hero"
import About from "./components/About"
import AboutCard from "./components/AboutCard.js";
import AIconcepts from "./components/AIconcepts.js";

function App() {
  return (
    <>
      {/* <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/customer" element={<Customer/>} />
      </Routes>
     
    </Router> */}
    <Header/>
    <Hero />
    <About />
    <AboutCard />
    <AIconcepts />


      {/* <div className="container">
        <h1>This is Appp</h1>
        <Customer CustomerName="Manisha" />
        <Customer CustomerName="Rashmi" />
        <Customer CustomerName="Tapan" />
        <br />
        <Product productName="Laptop" />
        
      </div> */}
    </>
  );
}

export default App;
