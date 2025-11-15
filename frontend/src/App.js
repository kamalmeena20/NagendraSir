
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminSignup from "./admin/pages/AdminSignup";
import AdminLayout from "./admin/pages/AdminLayout";

import Dashboard from "./admin/pages/Dashboard";
import Profile from "./admin/pages/Profile";
import Team from "./admin/pages/Team";
import Publications from "./admin/pages/Publications";
import Gallery from "./admin/pages/Gallery";
import Readings from "./admin/pages/Readings";
import Contact from "./admin/pages/Contact";
import Collaborators from "./admin/pages/Collaborators";
import Home from "./admin/pages/Home";
import About from "./admin/pages/About";

function App() {
  return (
    <Router>
      <Routes>

        {/* Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* Admin Panel Layout + Nested Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="team" element={<Team />} />
          <Route path="publications" element={<Publications />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="readings" element={<Readings />} />
          <Route path="contact" element={<Contact />} />
          <Route path="collaborators" element={<Collaborators />} />
          <Route path="home" element={<Home/>}/>
          <Route path="about" element={<About/>}/>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
