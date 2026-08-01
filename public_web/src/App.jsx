import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import PhysicsBackground from "./components/PhysicsBackground";

import Home from "./pages/Home";
import About from "./pages/About";
import Publications from "./pages/Publications";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import CareerOpportunities from "./pages/CareerOpportunities";
import Gallery from "./pages/Gallery";
import Readings from "./pages/Readings";
import Contact from "./pages/Contact";
import Collaborators from "./pages/Collaborators";
import Footer from "./components/Footer";
import AcademicActivities from "./pages/AcademicActivities";

export default function App() {

  const [loading,setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(()=>{
      setLoading(false);
    },4500);

    return ()=> clearTimeout(timer);

  },[]);

  if(loading){
    return <Loader/>
  }

  return (
    <>
      <PhysicsBackground />
      <div className="relative z-10">
        <Navbar />

        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="publications"><Publications /></section>
        <section id="profile"><Profile /></section>
        <section id="team"><Team /></section>
        <section id="career"><CareerOpportunities /></section>
        <section id="gallery"><Gallery /></section>
        <section id="readings"><Readings /></section>
        <section id="contact"><Contact /></section>
        <section id="collaborators"><Collaborators /></section>
        <section id="academic-activities"><AcademicActivities /></section>

        <Footer />
      </div>
    </>
  );
}
