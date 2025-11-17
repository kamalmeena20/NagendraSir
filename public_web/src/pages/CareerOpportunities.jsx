import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from '../components/Navbar'

export default function CareerPublic() {
  const [list, setList] = useState([]);

  const categories = [
    { value: "phd", label: "Ph.D. positions:" },
    { value: "pdrf", label: "Post Doctoral Research Fellow (PDRF) positions" },
    { value: "btech_mtech", label: "BTech - MTech Project:" },
    { value: "internship", label: "Internship Opportunities" },
  ];

  const loadData = async () => {
    try {
      const res = await api.get("/career");
      setList(res.data);
    } catch (err) {
      console.log("PUBLIC LOAD ERROR:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    
    <>
    <Navbar/>
    <div className="flex flex-col items-center max-w-6xl px-4 py-10 mx-auto">
      <h1 className="inline-block w-fit  px-10 py-2 mb-10 text-4xl font-bold text-center text-[#009e66] border-2 border-[#009e66]">
        Career Opportunities
      </h1>

      <div className="space-y-10">
        {categories.map((cat) => {
          const catItems = list.filter((i) => i.category === cat.value);

          if (catItems.length === 0) return null;

          return (
            <div key={cat.value} className="space-y-5">

              {/* Category Title Box */}
              <div className="inline-block px-4 py-2 text-lg font-bold text-[#009e66] border border-[#009e66]">
                {cat.label}
              </div>

              {/* LOOP THROUGH CAREER ITEMS */}
              {catItems.map((item) => (
                <div key={item._id} className="space-y-2">
                  <h2 className="inline-block px-4 py-1 font-semibold text-white bg-red-600 ">
                    {item.title}
                  </h2>

                  <p className="leading-7 text-gray-700">{item.description}</p>
                </div>
              ))}

            </div>
          );
        })}
      </div>

      {/* Contact Section */}
      <div className="mt-16 text-center text-gray-700">
        <p className="font-semibold">
          ✉ nagendra_kumar@iiitvadodara.ac.in
        </p>
      </div>
    </div>
    </>
  );
}
