import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function UserPublications() {
  const [pubs, setPubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lockFlip, setLockFlip] = useState(false);

  const loadData = async () => {
    try {
      const res = await api.get("/publications");
      setPubs(res.data);
    } catch (err) {
      console.log("Error loading publications");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div className="text-xl text-center ">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <h1 className="text-4xl font-semibold text-center text-[#009E66] mb-12 border border-2 border-[#009E66] p-4 w-fit m-auto mt-[10px] ">
        Publications
      </h1>

      {/* Scrollable Cards Container */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 
        max-h-[400px] overflow-y-scroll pr-3 no-scrollbar  p-8"
        style={{ scrollbarWidth: "none" }}
      >

        {pubs.map((p) => (
          <div
            key={p._id}
            className="group mx-auto [perspective:1000px] w-full max-w-[320px] h-[320px] "
          >
            <div
              className={`relative w-full h-full duration-700 [transform-style:preserve-3d] 
              ${!lockFlip ? "group-hover:[transform:rotateY(180deg)]" : ""}
            `}
            >
              {/* FRONT */}
              <div className="absolute w-full h-full  border-2 border-[#009E66]  p-3 [backface-visibility:hidden] flex flex-col justify-between">

                <img
                  src={p.thumbnailUrl}
                  alt="thumbnail"
                  className="object-cover w-full h-52"
                />

                <a
                  href={p.paperLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full mt-3 text-center py-2  border border-[#009E66]  text-[#009E66] font-semibold transition-all duration-300  hover:bg-[#009E66] hover:text-white"
                  onMouseEnter={() => setLockFlip(true)}
                  onMouseLeave={() => setLockFlip(false)}
                >
                  Paper Link
                </a>

              </div>

              {/* BACK */}
              <div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-y-auto border border-[#009E66] bg-white flex flex-col">

                {/* Citation header */}
                <div className="w-full text-center py-3 border-b border-[#009E66] flex justify-center">
                  <h3 className="px-8 py-2 text-xl font-semibold text-black border w-fit border-[#009e66]">Citation</h3>
                </div>

                {/* Green section */}
                <div className="bg-[#009E66] text-white p-4 flex-1 text-sm leading-snug text-start">
                  <p className="mb-3 font-semibold tracking-wide">
                    {p.title}
                  </p>
                  <p className="mb-3">
                    {p.authors}
                  </p>


                  <p>{p.journal}</p>

                </div>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
