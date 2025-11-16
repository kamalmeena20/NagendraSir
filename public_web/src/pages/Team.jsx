import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

export default function Team() {
  const mainColor = "#009E66";

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTeam = async () => {
    try {
      const res = await api.get("/team");
      setMembers(res.data || []);
    } catch (err) {
      console.error("TEAM LOAD ERROR:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTeam();
  }, []);

  if (loading) return <div className="p-10 text-xl text-center">Loading...</div>;

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />

      <h1 className="text-4xl font-semibold text-center text-[#009E66] mt-10 mb-12 py-2 px-10 border-2 border-[#009e66] w-fit">
        Team
      </h1>

      <div className="w-full px-4 ml-16 overflow-y-auto max-w-7xl"
  style={{
    maxHeight: "600px",   // 4 members fit perfectly
    scrollbarWidth: "none"
  }}
>
  <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
    {members.map((m) => (
      <div key={m._id} className="flex items-center gap-4">

        {/* IMAGE */}
        <div className="flex-shrink-0">
          <div
            className="border-2 rounded-full w-44 h-44"
            style={{ borderColor: mainColor }}
          >
            <img
              src={m.imageUrl || "https://via.placeholder.com/300"}
              alt={m.name}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </div>

        {/* VERTICAL LINE + TEXT */}
        <div className="flex items-start gap-4">
          <div
            className="w-[2px] h-36 rounded-full"
            style={{ backgroundColor: mainColor }}
          ></div>

          <div className="flex flex-col mt-4">
            <h2 className="text-xl font-bold">{m.name}</h2>
            <p className="text-lg font-semibold">{m.role}</p>
            <p className="text-lg font-medium">{m.department}</p>

            <p className="text-lg">
              <a href={`mailto:${m.email}`} className="text-blue-600 underline">
                {m.email}
              </a>
            </p>
          </div>
        </div>

      </div>
    ))}
  </div>
</div>

    </div>
  );
}
