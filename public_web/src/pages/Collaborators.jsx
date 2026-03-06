import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet-async";
import { PageAnimation } from "../components/PageAnimation";

export default function Collaborators() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await api.get("/collaborators");
      setList(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loader />;

  return (
    <PageAnimation>
      <div className="flex flex-col items-center w-full">
      <Helmet>
        <title>Collaborators | Dr Nagendra Kumar</title>

        <meta
          name="description"
          content="Research collaborators and partner institutions working with Dr Nagendra Kumar and Nagendra Lab."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://nagendra-sir-xkun.vercel.app/collaborators"
        />
      </Helmet>

      <Navbar />

      {/* PAGE TITLE */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mt-10 mb-10 py-2 px-6 border-2 border-[#009E66] text-[#009E66]">
        Collaborators
      </h1>

      {/* CONTENT */}
      <div className="w-full max-w-4xl px-4 pb-10 space-y-12">

        {list.length === 0 ? (
          <div className="py-10 text-center text-gray-400">
            No collaborators found.
          </div>
        ) : (
          list.map((inst) => (
            <div key={inst._id} className="space-y-6">

              {/* TOP SECTION */}
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">

                {/* LOGO */}
                <img
                  src={inst.logoUrl || "/defaultLogo.png"}
                  alt="logo"
                  className="object-contain w-20 h-20 sm:w-24 sm:h-24"
                />

                {/* INSTITUTE NAMES */}
                <div className="text-center sm:text-left">
                  {inst.hindiInstituteName && (
                    <h2 className="text-lg font-semibold sm:text-xl">
                      {inst.hindiInstituteName}
                    </h2>
                  )}

                  <p className="text-gray-300 mt-1 text-sm sm:text-[17px]">
                    {inst.instituteName}
                  </p>
                </div>
              </div>

              {/* COLLABORATORS */}
              <h3 className="text-base font-semibold sm:text-lg">
                Collaborators :
              </h3>

              <ul className="pl-6 space-y-2 text-sm text-gray-300 list-disc sm:text-base">
                {inst.collaborators.map((c, index) => (
                  <li key={index}>{c}</li>
                ))}
              </ul>

            </div>
          ))
        )}

      </div>
    </div>
    </PageAnimation>
  );
}