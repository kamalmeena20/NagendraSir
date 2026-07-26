import { useEffect, useState } from "react";
import api from "../api/api";
import { Helmet } from "react-helmet-async";
import PageAnimation from "../components/PageAnimation";

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
      <div className="w-full min-h-screen text-white">

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

        {/* TEXT SECTION */}
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 max-w-[1700px] mx-auto mt-[-45px]">

          <p className="text-[15px] sm:text-[16px] md:text-[18px] leading-8 text-left">

            The Nagendra Lab is part of the Department of Physical Sciences,

            <span className="font-semibold text-[#009e66]">
              {" "}
              {data?.title},{" "}
            </span>

            {data?.description}

          </p>

        </div>

        {/* IMAGE SECTION */}
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 max-w-[1700px] mx-auto mt-5">

          <div className="flex flex-col overflow-hidden shadow-2xl md:flex-row">

            {/* Hero Image */}
            <div className="w-full md:w-1/2 h-[240px] sm:h-[280px] md:h-[330px] bg-black">

              {data?.heroImage && (
                <img
                  src={data.heroImage}
                  alt="Hero"
                  className="object-cover w-full h-full"
                />
              )}

            </div>

            {/* Second Image */}
            <div className="w-full md:w-1/2 h-[240px] sm:h-[280px] md:h-[330px] bg-black">

              {data?.secondImage && (
                <img
                  src={data.secondImage}
                  alt="Second"
                  className="object-cover w-full h-full"
                />
              )}

            </div>

          </div>

        </div>

        {/* BUTTON */}
        <div className="w-full flex justify-end px-4 sm:px-6 md:px-20 mt-5 max-w-[1700px] mx-auto">

          <a href="#about">

            <button
              className="bg-[#009e66] mt-8 hover:bg-[#008756] transition text-white text-[15px] md:text-[17px] px-10 py-3 flex items-center gap-3"
            >
              Continue →
            </button>

          </a>

        </div>

      </div>
    </PageAnimation>
  );
}