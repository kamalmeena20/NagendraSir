import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Collaborators() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const mainColor = "#009E66";

  // Load data from backend
  const loadData = async () => {
    try {
      const res = await api.get("/collaborators");
      setList(res.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-screen overflow-hidden">
      <Navbar />

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-semibold text-center mt-6 mb-4 py-2 px-8 border-2 border-[#009E66] text-[#009E66]">
        Collaborators
      </h1>

      {/* 🟢 SCROLLABLE AREA */}
      {/* Scrollable container */}
      <div className="flex-1 w-full max-w-4xl px-4 pb-10 overflow-y-auto snap-y snap-mandatory" style={{scrollbarWidth:"none"}}>

        {loading ? (
          <div className="py-10 text-center">Loading...</div>
        ) : list.length === 0 ? (
          <div className="py-10 text-center text-gray-600">No collaborators found.</div>
        ) : (
          list.map((inst) => (
            <div
              key={inst._id}
              className="flex flex-col justify-start min-h-screen pt-10 snap-start"
            >
              {/* -------- TOP: LOGO + NAMES ---------- */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={inst.logoUrl || "/defaultLogo.png"}
                  alt="logo"
                  className="object-contain w-24 h-24"
                />

                <div>
                  {inst.hindiInstituteName && (
                    <h2 className="text-xl font-semibold">
                      {inst.hindiInstituteName}
                    </h2>
                  )}

                  <p className="text-gray-700 mt-1 text-[17px]">
                    {inst.instituteName}
                  </p>
                </div>
              </div>

              {/* Collaborators */}
              <h3 className="mb-3 text-lg font-semibold">Collaborators :</h3>

              <ul className="pl-6 space-y-2 text-gray-800 list-disc">
                {inst.collaborators.map((c, index) => (
                  <li key={index}>{c}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
