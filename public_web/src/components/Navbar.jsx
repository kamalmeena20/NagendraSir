import React, { useRef, useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {

  const mainColor = "#009E66";
  const navRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass =
    "text-[16px] md:text-[18px] px-4 py-2 rounded-full transition-all whitespace-nowrap relative z-10 text-white hover:text-white";

  const mobileNavLink =
    "text-lg py-2 px-3 rounded-md transition-all text-white hover:bg-white/20";

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

        <a href="#home" className={navLinkClass}>Home</a>
        <a href="#about" className={navLinkClass}>About</a>
        <a href="#publications" className={navLinkClass}>Publications</a>
        <a href="#profile" className={navLinkClass}>Profile</a>
        <a href="#team" className={navLinkClass}>Team</a>
        <a href="#career" className={navLinkClass}>Career opportunities</a>
        <a href="#gallery" className={navLinkClass}>Gallery</a>
        <a href="#readings" className={navLinkClass}>General Readings</a>
        <a href="#contact" className={navLinkClass}>Contact us</a>
        <a href="#collaborators" className={navLinkClass}>Collaborators</a>

      </div>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">

          {/* BACKGROUND */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMenuOpen(false)}
          />

          {/* SIDE MENU */}
          <div className="relative w-[80%] max-w-[320px] bg-[#009E66] h-full p-6 flex flex-col gap-4 overflow-y-auto">

            {/* CLOSE BUTTON */}
            <button
              className="absolute text-2xl text-white top-4 right-4"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            <a href="#home" className={mobileNavLink} onClick={()=>setMenuOpen(false)}>Home</a>
            <a href="#about" className={mobileNavLink} onClick={()=>setMenuOpen(false)}>About</a>
            <a href="#publications" className={mobileNavLink} onClick={()=>setMenuOpen(false)}>Publications</a>
            <a href="#profile" className={mobileNavLink} onClick={()=>setMenuOpen(false)}>Profile</a>
            <a href="#team" className={mobileNavLink} onClick={()=>setMenuOpen(false)}>Team</a>
            <a href="#career" className={mobileNavLink} onClick={()=>setMenuOpen(false)}>Career opportunities</a>
            <a href="#gallery" className={mobileNavLink} onClick={()=>setMenuOpen(false)}>Gallery</a>
            <a href="#readings" className={mobileNavLink} onClick={()=>setMenuOpen(false)}>General Readings</a>
            <a href="#contact" className={mobileNavLink} onClick={()=>setMenuOpen(false)}>Contact us</a>
            <a href="#collaborators" className={mobileNavLink} onClick={()=>setMenuOpen(false)}>Collaborators</a>

          </div>
        </div>
      )}
    </div>
  );
}