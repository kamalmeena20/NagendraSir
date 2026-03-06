import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet-async";
import { PageAnimation } from "../components/PageAnimation";

export default function About() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await api.get("/about");
      setData(res.data);
    } catch (err) {
      console.log("Error loading about data:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading || !data) return <Loader />;

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
          href="https://nagendra-sir-xkun.vercel.app/about"
        />
      </Helmet>

      <Navbar />

      {/* IMAGE */}
      {data.image && (
        <div className="flex justify-center md:justify-start mt-8 md:mt-10 md:ml-[280px] w-full">
          <img
            src={data.image}
            alt="Profile"
            className="object-cover rounded-full shadow-lg w-28 h-28 md:w-40 md:h-40"
          />
        </div>
      )}

      {/* MAIN ROW */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-10 px-4 sm:px-6 md:px-20 mt-6 md:mt-[-40px]">

        {/* LEFT - ABOUT + LINE */}
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">

          <h1 className="text-[#009e66] font-semibold text-[60px] sm:text-[80px] md:text-[120px]  leading-none">
            About
          </h1>

          <div className="w-[200px] sm:w-[260px] md:w-auto border-t-[3px] border-[#009e66] md:h-[270px] md:border-t-0 md:border-l-[3px]"></div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-center max-w-3xl text-left">

          <h2 className="text-[#009e66] font-semibold text-xl md:text-2xl mb-4">
            {data.instituteName}
          </h2>

          <p className="text-[16px] md:text-lg leading-relaxed text-white">
            {data.description}
          </p>

        </div>

      </div>

    </div>
    </PageAnimation>
  );
}