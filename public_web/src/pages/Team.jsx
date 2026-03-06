import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet-async";
import { PageAnimation } from "../components/PageAnimation";

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

  if (loading) return <Loader />;

  return (
    <PageAnimation>
      <div className="flex flex-col items-center w-full">

      <Helmet>
        <title>Research Team | Nagendra Lab</title>

        <meta
          name="description"
          content="Meet the research team members of Nagendra Lab including researchers, students and collaborators."
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://nagendra-sir-xkun.vercel.app/team" />
      </Helmet>

      <Navbar />

      <h1 className="text-3xl md:text-4xl font-semibold text-center text-[#009E66] mt-10 mb-12 py-2 px-8 md:px-10 border-2 border-[#009e66] w-fit">
        Team
      </h1>

      <div
        className="w-full px-4 overflow-y-auto max-w-7xl"
        style={{
          maxHeight: "600px",
          scrollbarWidth: "none"
        }}
      >

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">

          {members.map((m) => (

            <div
              key={m._id}
              className="flex flex-col items-start gap-6 sm:flex-row"
            >

              <div className="flex-shrink-0">

                <div
                  className="w-32 h-32 border-2 rounded-full md:w-40 md:h-40"
                  style={{ borderColor: mainColor }}
                >
                  <img
                    src={m.imageUrl || "Image not available"}
                    alt={m.name}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>

              </div>

              <div className="flex items-start gap-4 text-start sm:text-left">

                <div
                  className="hidden sm:block w-[2px] h-32 md:h-36 rounded-full"
                  style={{ backgroundColor: mainColor }}
                ></div>

                <div className="flex flex-col">

                  <h2 className="text-lg font-bold md:text-xl">
                    {m.name}
                  </h2>

                  <p className="text-base font-semibold md:text-lg">
                    {m.role}
                  </p>

                  <p className="text-base md:text-lg">
                    {m.department}
                  </p>

                  <p className="text-base break-all md:text-lg">

                    <a
                      href={`mailto:${m.email}`}
                      className="text-blue-500 underline"
                    >
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
    </PageAnimation>
  );
}