import logo from "./logo.svg";
import "./App.css";

import Hero from "./components/Hero";
import AboutTextImg from "./components/AboutTextImg.js";
import AboutInfoCard from "./components/AboutInfoCard.js";
import AIconcepts from "./components/AIconcepts.js";
import LatestPost from "./components/LatestPost.js";
import Contact from "./components/Contact.js";



function App() {
  return (
    <>
     
    <Hero />
    <AboutTextImg />
    <AboutInfoCard />
    <AIconcepts />
    <LatestPost />
   
    <Contact/>
    

    </>
  );
}

export default App;
