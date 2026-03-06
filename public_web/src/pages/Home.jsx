import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";
import Lottie from "lottie-react";
import Robot3D from "../assets/RobotBot3D.json";
import aiDigital from "../assets/aiDigital.json";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader";
import { PageAnimation } from "../components/PageAnimation";

export default function Home() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await api.get("/home");
      setData(res.data);
    } catch (err) {
      console.log("Error loading home content:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loader />;

  return (
      <PageAnimation>
    <div className="w-full min-h-screen text-white">

      <Helmet>
        <title>Dr Nagendra Kumar</title>
        <meta
          name="description"
          content="Official website of Dr Nagendra Kumar and Nagendra Lab research group. Research, publications, collaborators and academic activities."
        />
        <meta
          name="keywords"
          content="Dr Nagendra Kumar, Nagendra Lab, Research Lab, Computer Science Research"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://nagendra-sir-xkun.vercel.app/" />
      </Helmet>

      <Navbar />

      {/* TEXT SECTION */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto mt-4">

        <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-left">

          The Nagendra Lab is part of the Department of Physical Sciences,

          <span className="font-semibold text-[#009e66]">
            {" "} {data?.title},{" "}
          </span>

          {data?.description}

        </p>

      </div>


      {/* LOTTIE SECTION */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-12 px-4 sm:px-6 md:px-20 mt-6 max-w-[1300px] mx-auto">

        {/* aiDigital animation (always visible) */}
        <div className="w-full md:w-[60%] flex justify-center">

          <Lottie
            animationData={aiDigital}
            loop={true}
            style={{ width: "100%", maxWidth: "500px" }}
          />

        </div>

        {/* Robot animation (only ≥768px) */}
        <div className="hidden md:flex w-[40%] justify-center">

          <Lottie
            animationData={Robot3D}
            loop={true}
            style={{ width: "100%", maxWidth: "400px" }}
          />

        </div>

      </div>


      {/* BUTTON */}
      <div className="w-full flex justify-center md:justify-end px-4 sm:px-6 md:px-20 mt-6 max-w-[1300px] mx-auto">

        <button
          onClick={() => navigate("/about")}
          className="bg-[#009e66] transition text-white text-[16px] md:text-xl px-8 md:px-14 py-3 flex items-center gap-4"
        >
          Continue →
        </button>

      </div>

    </div>
    </PageAnimation>
  );
}