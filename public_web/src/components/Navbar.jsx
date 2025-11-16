import React, { useRef, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const mainColor = "#009E66";
  const location = useLocation();
  const navRef = useRef(null);

  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0
  });

  // Move indicator on route change
  useEffect(() => {
    const activeLink = navRef.current?.querySelector(".active-link");
    if (activeLink) {
      setIndicatorStyle({
        width: activeLink.offsetWidth,
        left: activeLink.offsetLeft
      });
    }
  }, [location]);

  const navLinkClass = ({ isActive }) =>
  `text-[18px] font-regular px-4 py-1.5 rounded-full transition-all
   ${isActive ? "bg-white text-[#009E66]" : "text-white hover:bg-white hover:text-[#009E66]"}`;


  return (
    <div className="flex items-center w-full gap-8 px-10 py-4">

      {/* LOGO */}
      <img src={logo} alt="logo" className="w-24" />

      {/* NAVBAR */}
      <div
        ref={navRef}
        className="relative flex items-center justify-between w-full px-8 py-2.5 rounded-full shadow-md"
        style={{ backgroundColor: mainColor }}
      >
        {/* Sliding Indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[34px] bg-white rounded-full transition-all duration-300"
          style={{
            width: `${indicatorStyle.width}px`,
            left: `${indicatorStyle.left}px`
          }}
        />

        {/* LINKS */}
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
