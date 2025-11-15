import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Team from "../pages/Team";
import Publications from "../pages/Publications";
import Gallery from "../pages/Gallery";
import Readings from "../pages/Readings";
import Collaborators from "../pages/Collaborators";
import Contact from "../pages/Contact";
import CareerOpportunities from "../pages/CareerOpportunities";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/team" element={<Team />} />
        <Route path="/Career" element={<CareerOpportunities />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/readings" element={<Readings />} />
        <Route path="/collaborators" element={<Collaborators />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
} 
