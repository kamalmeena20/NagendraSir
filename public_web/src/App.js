import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import PhysicsBackground from "./components/PhysicsBackground";
import About from "./pages/About";
import CareerPublic from "./pages/CareerOpportunities";
import Collaborators from "./pages/Collaborators";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserPublications from "./pages/Publications";
import PublicGeneralReadings from "./pages/Readings";
import Team from "./pages/Team";
import Footer from "./components/Footer";
import AcademicActivities from "./pages/AcademicActivities";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PhysicsBackground />
      <div className="relative z-10">
        <Navbar />

        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="publications"><UserPublications /></section>
        <section id="profile"><Profile /></section>
        <section id="team"><Team /></section>
        <section id="career"><CareerPublic /></section>
        <section id="gallery"><Gallery /></section>
        <section id="readings"><PublicGeneralReadings /></section>
        <section id="academic-activities"><AcademicActivities /></section>
        <section id="collaborators"><Collaborators /></section>
        <section id="contact"><Contact /></section>
        <Footer />
      </div>
    </>
  );
}
