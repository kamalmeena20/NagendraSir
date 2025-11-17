import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from '../components/Navbar'

export default function PublicGeneralReadings() {
  const [list, setList] = useState([]);

  const loadData = async () => {
    try {
      const res = await api.get("/readings");
      setList(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar/>
    <div className="max-w-6xl px-4 py-16 mx-auto">
      {/* Heading */}
      <div className="flex justify-center mb-16">
        <h1 className="border-2 border-[#009E66] text-[#009E66] text-4xl font-semibold px-10 py-4 ">
          General Readings
        </h1>
      </div>

      {/* List */}
      <div className="space-y-12">
        {list.map((item, index) => (
          <div
            key={item._id}
            className="flex border-2 border-[#009E66]  overflow-hidden"
          >
            {/* Left */}
            <div className="flex-1 p-6 bg-white">
              <h2 className="text-xl font-semibold">
                {index + 1}. {item.title}
              </h2>
              <p className="mt-3 leading-relaxed text-gray-700">
                {item.description}
              </p>
            </div>

            {/* Right */}
            <div className="w-64 bg-[#009E66] flex items-center justify-center">
              <a
                href={item.link}
                target="_blank"
                className="border border-white text-white px-8 py-3 text-lg  hover:bg-white hover:text-[#009E66] transition"
              >
                Open Reading 
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
    </>
  );
}
