import React, { useRef, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {

  const mainColor = "#009E66";
  const location = useLocation();
  const navRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0
  });

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
  `text-[16px] md:text-[18px] px-4 py-2 rounded-full transition-all whitespace-nowrap relative z-10
  ${isActive
    ? "text-[#009E66] active-link"
    : "text-white hover:text-[#ffff]"
  }`;
const mobileNavLink = ({ isActive }) =>
  `text-lg py-2 px-3 rounded-md transition-all
  ${isActive
    ? "bg-white text-[#009E66]"
    : "text-white hover:bg-white/20"
  }`;
  return (
    <div className="relative flex items-center justify-between w-full px-4 py-6 sm:px-6 md:px-10">

      {/* LOGO */}
      <img src={logo} alt="logo" className="w-20 md:w-24" />

      {/* HAMBURGER */}
      <button
        className="lg:hidden text-white bg-[#009E66] px-3 py-2 rounded-lg"
        onClick={() => setMenuOpen(true)}
      >
        ☰
      </button>

      {/* DESKTOP NAVBAR */}
      <div
        ref={navRef}
        className="relative hidden lg:flex items-center justify-between w-full px-6 lg:px-8 py-2.5 rounded-full shadow-md ml-6"
        style={{ backgroundColor: mainColor }}
      >

        {/* Sliding Indicator */}
        <div
         className="absolute top-1/2 -translate-y-1/2 h-[50px] px-2 bg-white rounded-full transition-all duration-300"
          style={{
            width: `${indicatorStyle.width}px`,
            left: `${indicatorStyle.left}px`
          }}
        />

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

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">

          {/* BACKGROUND BLUR */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMenuOpen(false)}
          />

          {/* SIDE MENU */}
          <div className="relative w-[80%] max-w-[320px] bg-[#009E66] h-full p-6 flex flex-col gap-4 
          overflow-y-auto transform transition-transform duration-300">

            {/* CLOSE BUTTON */}
            <button
              className="absolute text-2xl text-white top-4 right-4"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            <NavLink to="/"  className={mobileNavLink} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={mobileNavLink} onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/publications" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Publications</NavLink>
            <NavLink to="/profile" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Profile</NavLink>
            <NavLink to="/team" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Team</NavLink>
            <NavLink to="/career" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Career opportunities</NavLink>
            <NavLink to="/gallery" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Gallery</NavLink>
            <NavLink to="/readings" className={mobileNavLink} onClick={() => setMenuOpen(false)}>General Readings</NavLink>
            <NavLink to="/contact" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Contact us</NavLink>
            <NavLink to="/collaborators" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Collaborators</NavLink>

          </div>
        </div>
      )}
    </div>
  );
}