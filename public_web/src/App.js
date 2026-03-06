import Navbar from "./components/Navbar";
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

export default function App() {
  return (
    <>
      <Navbar />

      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="publications"><UserPublications /></section>
      <section id="profile"><Profile /></section>
      <section id="team"><Team /></section>
      <section id="career"><CareerPublic /></section>
      <section id="gallery"><Gallery /></section>
      <section id="readings"><PublicGeneralReadings /></section>
      <section id="contact"><Contact /></section>
      <section id="collaborators"><Collaborators /></section>

      <Footer />
    </>
  );
}