import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="flex justify-center w-full px-4 pb-10 mt-10">

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
        w-full
        max-w-[700px]
        border border-[#009E66]/70
        px-6
        py-5
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-4
        bg-black/60
        backdrop-blur-md
        shadow-glow
        rounded-2xl
      "
      >

        {/* LEFT TEXT */}
        <p className="text-xs tracking-widest text-center text-white sm:text-sm md:text-base md:text-left">
          Design & Developed by{" "}
          <span className="text-[#009E66] font-semibold">
            Kamal Meena (IIITV-Vadodara)
          </span>
        </p>

        {/* RIGHT BUTTON */}
        <a
          href="https://kamalmeena.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            px-6
            py-2
            border-2
            border-[#009E66]
            text-[#009E66]
            text-xs
            sm:text-sm
            font-semibold
            tracking-wide
            transition duration-300
            hover:bg-[#009E66]
            hover:text-black
            hover:shadow-glow
            rounded-lg
          "
        >
          Portfolio
        </a>

      </motion.div>

    </footer>
  );
}
