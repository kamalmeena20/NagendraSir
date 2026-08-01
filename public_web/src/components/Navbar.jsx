import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

export default function Navbar() {

  const navRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass =
    "flex-1 text-center text-[12px] xl:text-[13px] 2xl:text-[14px] px-1 xl:px-1.5 2xl:px-2 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap relative z-10 text-white/90 hover:text-white hover:bg-white/10";

  const mobileNavLink =
    "text-base sm:text-lg py-2.5 px-3 rounded-xl transition-all duration-300 text-white hover:bg-white/20";

  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 z-40 flex items-center w-full gap-2.5 px-3 py-1.5 sm:px-5 sm:py-2 md:px-6 lg:px-8 bg-[#0b0f0d]/92 backdrop-blur-xl border-b border-white/5"
    >

      {/* LOGO — user's logo.png */}
      <motion.img
        src={logo}
        alt="logo"
        className="object-contain w-14 h-14 shrink-0 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px]"
        style={{ imageRendering: "auto" }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      />

      {/* HAMBURGER */}
      <button
        className="ml-auto xl:hidden text-white bg-[#009E66] px-3 py-1.5 rounded-lg shadow-glow transition hover:bg-[#007a4f] shrink-0"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* DESKTOP NAVBAR — full remaining width, links spread evenly */}
      <div
        ref={navRef}
        className="relative items-center hidden flex-1 min-w-0 px-2 py-1 rounded-full shadow-soft xl:flex xl:px-3 xl:py-1.5 border border-white/10"
        style={{
          background:
            "linear-gradient(90deg,#2a2a2a 0%,#1c1c1c 40%,#121212 68%,#009E66 100%)",
        }}
      >

        <div className="flex items-center justify-between w-full gap-0">

          <a href="#home" className={navLinkClass}>Home</a>
          <a href="#about" className={navLinkClass}>About</a>
          <a href="#publications" className={navLinkClass}>Publications</a>
          <a href="#profile" className={navLinkClass}>Profile</a>
          <a href="#team" className={navLinkClass}>Team</a>
          <a href="#career" className={navLinkClass}>Career</a>
          <a href="#gallery" className={navLinkClass}>Gallery</a>
          <a href="#readings" className={navLinkClass}>General Readings</a>
          <a href="#collaborators" className={navLinkClass}>Collaborators</a>
          <a href="#academic-activities" className={navLinkClass}>Activities</a>
          <a href="#contact" className={navLinkClass}>Contact Us</a>

        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex xl:hidden">

            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative w-[82%] max-w-[320px] bg-gradient-to-b from-[#009E66] to-[#005C3B] h-full p-6 pt-14 flex flex-col gap-2 sm:gap-3 overflow-y-auto shadow-glow"
            >

              <button
                className="absolute text-2xl text-white transition top-4 right-4 hover:scale-110"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="logo" className="object-contain w-12 h-12" />
              </div>

              <a href="#home" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#about" className={mobileNavLink} onClick={() => setMenuOpen(false)}>About</a>
              <a href="#publications" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Publications</a>
              <a href="#profile" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Profile</a>
              <a href="#team" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Team</a>
              <a href="#career" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Career opportunities</a>
              <a href="#gallery" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Gallery</a>
              <a href="#readings" className={mobileNavLink} onClick={() => setMenuOpen(false)}>General Readings</a>
              <a href="#contact" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Contact us</a>
              <a href="#collaborators" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Collaborators</a>
              <a href="#academic-activities" className={mobileNavLink} onClick={() => setMenuOpen(false)}>Academic Activities</a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
