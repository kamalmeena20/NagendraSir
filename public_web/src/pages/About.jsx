import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

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

  if (loading || !data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* IMAGE CENTERED */}
      {data.image && (
        <div className="flex justify-start mt-10 ml-[280px]  w-fit">
          <img
            src={data.image}
            alt="Profile"
            className="object-cover w-40 h-40 rounded-full shadow-lg"
          />
        </div>
      )}

      {/* MAIN ROW */}
      <div className="flex justify-center gap-10 px-20 mt-[-40px]">

        {/* LEFT - ABOUT + LINE */}
        <div className="flex items-center gap-8">
          <h1 className="text-[#009e66] font-semibold text-[120px] leading-none mb-6">
            About
          </h1>

          {/* THIN LINE */}
          <div className="h-[270px] border-l-[3px] border-[#009e66]"></div>
        </div>

        {/* RIGHT - CENTERED CONTENT */}
        <div className="flex flex-col justify-center max-w-3xl">

          {/* Institute Name Centered */}
          <h2 className="text-[#009e66] font-semibold text-2xl mb-4">
            {data.instituteName}
          </h2>

          {/* Description */}
          <p className="text-lg leading-relaxed text-gray-800">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
