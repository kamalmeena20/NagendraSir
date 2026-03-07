import { useEffect, useState } from "react";
import api from "../api/api";
import { Helmet } from "react-helmet-async";
import PageAnimation from "../components/PageAnimation";

export default function Team() {

  const mainColor = "#009E66";
  const [members, setMembers] = useState([]);

  const loadTeam = async () => {
    try {
      const res = await api.get("/team");
      setMembers(res.data || []);
    } catch (err) {
      console.error("TEAM LOAD ERROR:", err);
      setMembers([]);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  return (
    <PageAnimation>
      <div className="flex flex-col items-center w-full">

        <Helmet>
          <title>Nagendra Lab Research Team | IIIT Vadodara | Nagendra Lab</title>

          <meta
            name="description"
            content="Meet the research team members of Nagendra Lab including researchers, students and collaborators."
          />

          <meta name="robots" content="index, follow" />

          <link rel="canonical" href="https://nagendra-sir-xkun.vercel.app/#team" />
        </Helmet>

        {/* TITLE */}
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

            {members.length === 0 && (
              <div className="py-20 text-center text-gray-400 col-span-full">
                No team members available
              </div>
            )}

            {members.map((m) => (

              <div
                key={m?._id || Math.random()}
                className="flex flex-col items-start gap-6 sm:flex-row"
              >

                {/* IMAGE */}
                <div className="flex-shrink-0">

                  <div
                    className="w-32 h-32 border-2 rounded-full md:w-40 md:h-40"
                    style={{ borderColor: mainColor }}
                  >
                    <img
                      src={m?.imageUrl || "/defaultProfile.png"}
                      alt={m?.name || "team member"}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>

                </div>

                {/* TEXT */}
                <div className="flex items-start gap-4 text-start sm:text-left">

                  <div
                    className="hidden sm:block w-[2px] h-32 md:h-36 rounded-full"
                    style={{ backgroundColor: mainColor }}
                  ></div>

                  <div className="flex flex-col">

                    <h2 className="text-lg font-bold md:text-xl">
                      {m?.name || (
                        <span className="text-sm text-gray-400">
                          Name not available
                        </span>
                      )}
                    </h2>

                    <p className="text-base font-semibold md:text-lg">
                      {m?.role || (
                        <span className="text-sm text-gray-400">
                          Role not available
                        </span>
                      )}
                    </p>

                    <p className="text-base md:text-lg">
                      {m?.department || (
                        <span className="text-sm text-gray-400">
                          Department not available
                        </span>
                      )}
                    </p>

                    <p className="text-base break-all md:text-lg">

                      {m?.email ? (
                        <a
                          href={`mailto:${m.email}`}
                          className="text-blue-500 underline"
                        >
                          {m.email}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">
                          Email not available
                        </span>
                      )}

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