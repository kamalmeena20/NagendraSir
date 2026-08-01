import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";
import { Helmet } from "react-helmet-async";
import PageAnimation, { FadeInLeft, FadeInRight, ScrollReveal } from "../components/PageAnimation";

export default function About() {
  const [data, setData] = useState(null);

  const loadData = async () => {
    try {
      const res = await api.get("/about");
      setData(res.data);
    } catch (err) {
      console.log("Error loading about data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageAnimation>
      <div className="w-full">

        <Helmet>
          <title>About | Dr Nagendra Kumar</title>

          <meta
            name="description"
            content="About Dr Nagendra Kumar research lab, institute information and research activities."
          />

          <meta name="robots" content="index, follow" />

          <link
            rel="canonical"
            href="https://nagendra-sir-xkun.vercel.app/#about"
          />
        </Helmet>

        {/* Heading */}
        <ScrollReveal>
          <div className="flex justify-center mt-4 mb-8 sm:mt-8 sm:mb-12 md:mb-16">
            <h1 className="section-title mt-0 mb-0">
              About
            </h1>
          </div>
        </ScrollReveal>

        {/* Main Section */}
        <div className="flex flex-col items-center justify-center gap-8 px-4 sm:gap-10 sm:px-6 lg:flex-row lg:items-start lg:gap-12 md:px-12 xl:px-20">

          {/* Left */}
          <FadeInLeft>
            <div className="flex items-center gap-4 sm:gap-8">

              <h1 className="font-sans font-semibold text-[#009e66] text-[36px] sm:text-[52px] md:text-[72px] lg:text-[90px] xl:text-[100px] leading-none tracking-[0.04em]">
                About
              </h1>

              <div className="hidden lg:block h-[300px] xl:h-[430px] border-l-[3px] border-[#009e66]/80"></div>

            </div>
          </FadeInLeft>

          {/* Right */}
          <FadeInRight className="w-full max-w-4xl">
            <div className="w-full glass-panel p-4 sm:p-6 md:p-8">

              {/* Image + Institute */}
              <div className="flex flex-col items-center gap-5 mb-6 sm:mb-8 sm:flex-row sm:items-center sm:gap-6">

                {data?.image ? (
                  <motion.img
                    src={data.image}
                    alt="Profile"
                    className="object-cover rounded-full shadow-xl w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 ring-2 ring-brand/50 shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  />
                ) : (
                  <div className="flex items-center justify-center text-gray-400 border rounded-full border-white/20 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40">
                    No Image
                  </div>
                )}

                <div className="text-center sm:text-left">
                  <h2 className="text-[#009e66] text-xl sm:text-2xl md:text-3xl tracking-tight break-words">
                    {data?.instituteName}
                  </h2>
                </div>

              </div>

              {/* Description */}
              <p className="text-white/90 text-[15px] sm:text-[16px] md:text-lg leading-7 sm:leading-8 md:leading-9 tracking-wide whitespace-pre-wrap break-words">
                {data?.description}
              </p>

            </div>
          </FadeInRight>

        </div>

      </div>
    </PageAnimation>
  );
}
