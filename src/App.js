import logo from "./logo.svg";
import "./App.css";

import Hero from "./components/Hero";
import About from "./components/About";
import AboutCard from "./components/AboutCard.js";
import AIconcepts from "./components/AIconcepts.js";
import LatestPost from "./components/LatestPost.js";
import Contact from "./components/Contact.js";
import AxiosEx from "./components/AxiosEx.js";


function App() {
  return (
    <>
     
    <Hero />
    <About />
    <AboutCard />
    <AIconcepts />
    <LatestPost />
   
    <Contact/>
    <AxiosEx />

    </>
  );
}

export default App;
