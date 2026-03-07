import { useEffect, useState } from "react";
import api from "../api/api";
import { Helmet } from "react-helmet-async";
import PageAnimation from "../components/PageAnimation";

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
      <div className="min-h-screen">

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
        <div className="flex justify-center mt-10 mb-20">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#009E66] py-2 px-10 border-2 border-[#009e66]">
            About
          </h1>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center lg:ml-[550px] md:justify-start mt-8 md:mt-10 md:ml-[280px] w-fit">

          {data?.image ? (
            <img
              src={data.image}
              alt="Profile"
              className="object-cover rounded-full shadow-lg w-28 h-28 md:w-40 md:h-40"
            />
          ) : (
            <div className="flex items-center justify-center text-sm text-gray-400 border rounded-full w-28 h-28 md:w-40 md:h-40">
              No image available
            </div>
          )}

        </div>

        {/* MAIN ROW */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-10 px-4 sm:px-6 md:px-20 mt-6 md:mt-[-40px]">

          {/* LEFT */}
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">

            <h1 className="text-[#009e66] font-semibold text-[60px] sm:text-[80px] md:text-[120px] leading-none">
              About
            </h1>

            <div className="w-[200px] sm:w-[260px] md:w-auto border-t-[3px] border-[#009e66] md:h-[270px] md:border-t-0 md:border-l-[3px]"></div>

          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-center max-w-3xl text-left">

            {data?.instituteName ? (
              <h2 className="text-[#009e66] font-semibold text-xl md:text-2xl mb-4">
                {data.instituteName}
              </h2>
            ) : (
              <p className="mb-4 text-gray-400">no institute name available</p>
            )}

            {data?.description ? (
              <p className="text-[16px] md:text-lg leading-relaxed text-white">
                {data.description}
              </p>
            ) : (
              <p className="text-gray-400">no description available</p>
            )}

          </div>

        </div>

      </div>
    </PageAnimation>
  );
}