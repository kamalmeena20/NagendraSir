import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";

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
      <div className="flex justify-center items-center gap-12 px-20 mt-10 max-w-[1300px] mx-auto">

        <div className="w-[45%]">
          <img
            src={data?.heroImage}
            className="w-full  shadow-[0_3px_10px_rgba(0,0,0,0.15)]"
            alt="main"
          />
        </div>

        <div className="w-[39%]">
          <img
            src={data?.secondImage}
            className="w-full shadow-[0_3px_10px_rgba(0,0,0,0.15)]"
            alt="secondary"
          />
        </div>
      </div>

      {/* CONTINUE BUTTON */}
      <div className="w-full flex justify-end  mt-12 max-w-[1300px] mx-auto">
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
