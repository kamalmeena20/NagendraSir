import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";
import { Helmet } from "react-helmet-async";
import PageAnimation, { ScrollReveal } from "../components/PageAnimation";

export default function Home() {
  const [data, setData] = useState(null);

  const loadData = async () => {
    try {
      const res = await api.get("/home");
      setData(res.data);
    } catch (err) {
      console.log("Error loading home content:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageAnimation>
      <div className="w-full text-white">

        <Helmet>
          <title>Dr Nagendra Kumar | Assistant Professor | IIIT Vadodara</title>

          <meta
            name="description"
            content="Official website of Dr Nagendra Kumar and Nagendra Lab research group. Research, publications, collaborators and academic activities."
          />

          <meta
            name="keywords"
            content="Dr Nagendra Kumar, Nagendra Lab, Research Lab, Computer Science Research"
          />

          <meta name="robots" content="index, follow" />

          <link
            rel="canonical"
            href="https://nagendra-sir-xkun.vercel.app/"
          />
        </Helmet>

        {/* TEXT SECTION — full admin description, no clipping */}
        <ScrollReveal>
          <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
            <p className="font-sans text-[14px] sm:text-[15px] md:text-[17px] lg:text-[18px] leading-7 sm:leading-8 md:leading-9 tracking-wide text-left text-white/90 whitespace-pre-wrap break-words overflow-visible w-full max-w-none">
              {data?.description}
            </p>
          </div>
        </ScrollReveal>

        {/* IMAGE SECTION */}
        <ScrollReveal delay={0.12}>
          <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 mt-6 sm:mt-8">

            <div className="flex flex-col overflow-hidden border shadow-2xl border-white/10 md:flex-row rounded-xl sm:rounded-2xl shadow-glow">

              {/* Hero Image */}
              <motion.div
                className="w-full md:w-1/2 h-[200px] xs:h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px] bg-black overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
              >

                {data?.heroImage && (
                  <img
                    src={data.heroImage}
                    alt="Hero"
                    className="object-cover w-full h-full transition duration-700 hover:scale-105"
                  />
                )}

              </motion.div>

              {/* Second Image */}
              <motion.div
                className="w-full md:w-1/2 h-[200px] sm:h-[260px] md:h-[300px] lg:h-[340px] bg-black overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
              >

                {data?.secondImage && (
                  <img
                    src={data.secondImage}
                    alt="Second"
                    className="object-cover w-full h-full transition duration-700 hover:scale-105"
                  />
                )}

              </motion.div>

            </div>

          </div>
        </ScrollReveal>

        {/* BUTTON */}
        <ScrollReveal delay={0.2}>
          <div className="w-full max-w-[1700px] mx-auto flex justify-center sm:justify-end px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 mt-4 sm:mt-6 pb-4">

            <a href="#about">

              <motion.button
                whileHover={{ scale: 1.04, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="brand-btn mt-4 sm:mt-6 w-full sm:w-auto"
              >
                Continue →
              </motion.button>

            </a>

          </div>
        </ScrollReveal>

      </div>
    </PageAnimation>
  );
}
