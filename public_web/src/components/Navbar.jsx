import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const mainColor = "#009E66";

  const navLinkClass = ({ isActive }) =>
    `text-white text-[16px] font-regular px-4 py-1.5 rounded-full transition-all
     ${isActive ? "bg-white text-[#009E66]" : "hover:bg-white/20"}`;

  return (
    <div className="flex items-center w-full gap-8 px-10 py-4 bg-white">

      {/* LOGO */}
      <img src={logo} alt="logo" className="w-24" />

      {/* GREEN BAR (SLIM HEIGHT) */}
      <div
        className="flex items-center justify-between w-full px-8 py-2.5 rounded-full shadow-md"
        style={{ backgroundColor: mainColor }}
      >
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/about" className={navLinkClass}>About</NavLink>
        <NavLink to="/publications" className={navLinkClass}>Publications</NavLink>
        <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
        <NavLink to="/team" className={navLinkClass}>Team</NavLink>
        <NavLink to="/career" className={navLinkClass}>Career opportunities</NavLink>
        <NavLink to="/gallery" className={navLinkClass}>Gallery</NavLink>
        <NavLink to="/readings" className={navLinkClass}>General Readings</NavLink>
        <NavLink to="/contact" className={navLinkClass}>Contact us</NavLink>
        <NavLink to="/collaborators" className={navLinkClass}>Collaborators</NavLink>
      </div>
    </div>
  );
}
