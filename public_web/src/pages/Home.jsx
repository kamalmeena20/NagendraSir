import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";
import Lottie from "lottie-react";
import Robot3D from '../assets/RobotBot3D.json'
import aiDigital from '../assets/aiDigital.json'

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-screen ">
      <Navbar />

      {/* TEXT SECTION */}
      <div className="px-20  max-w-[1300px] mx-auto">
        <p className="text-[20px] leading-relaxed ">
          The Nagendra Lab is part of the Department of Physical Sciences,
          <span className="font-semibold text-green-700">
            {" "}{data?.title},{" "}
          </span>
          {data?.description}
        </p>
      </div>

      {/* IMAGES SECTION */}
      <div className="flex justify-center items-center gap-12 px-20 mt-[-40px] max-w-[1300px] mx-auto">

        <div className="w-[60%] flex justify-center">
          {/* aiDigital BIG (100%) */}
          <Lottie
            animationData={aiDigital}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="w-[39%] flex justify-center">
          {/* Robot SMALL (50%) */}
          <Lottie
            animationData={Robot3D}
            loop={true}
            style={{ width: "100%", height: "50%" }}
          />
        </div>


      </div>

      {/* CONTINUE BUTTON */}
      <div className="w-full flex justify-end mt-[-40px] max-w-[1300px] mx-auto">
        <button
          onClick={() => navigate("/about")}
          className="bg-[#009e66]  transition text-white text-xl font-regular px-14 py-3  flex items-center gap-4"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
