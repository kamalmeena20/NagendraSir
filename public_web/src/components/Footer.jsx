export default function Footer() {
  return (
    <footer className="flex justify-center w-full px-4 mt-16">

      <div className="
        w-full
        max-w-[700px]
        border border-[#009E66]
       
        px-6
        py-5
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-4
        bg-black
      ">

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
            transition
            hover:bg-[#009E66]
            hover:text-black
          "
        >
          Portfolio
        </a>

      </div>

    </footer>
  );
}