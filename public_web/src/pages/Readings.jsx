import { useEffect, useState } from "react";
import api from "../api/api";
import { Helmet } from "react-helmet-async";
import PageAnimation from "../components/PageAnimation";

export default function PublicGeneralReadings() {
  const [list, setList] = useState([]);

  const loadData = async () => {
    try {
      const res = await api.get("/readings");
      setList(res.data || []);
    } catch (err) {
      console.log("Readings Fetch error:", err);
      setList([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageAnimation>
      <>
        <Helmet>
          <title>General Readings | Nagendra Lab | IIITV</title>

          <meta
            name="description"
            content="General academic readings and recommended research resources from Nagendra Lab."
          />

          <meta name="robots" content="index, follow" />

          <link
            rel="canonical"
            href="https://nagendra-sir-xkun.vercel.app/#readings"
          />
        </Helmet>

        <div className="max-w-6xl px-4 py-10 mx-auto">

          {/* HEADING */}
          <div className="flex justify-center mb-12">
            <h1 className="border-2 border-[#009E66] text-[#009E66] text-2xl sm:text-3xl md:text-4xl font-semibold px-6 sm:px-10 py-3 sm:py-4 text-center">
              General Readings
            </h1>
          </div>

          {/* LIST */}
          <div className="space-y-8">

            {list.length === 0 && (
              <div className="py-20 text-center text-gray-400">
                No readings available
              </div>
            )}

            {list.map((item, index) => (
              <div
                key={item?._id || Math.random()}
                className="flex flex-col md:flex-row border-2 border-[#009E66] overflow-hidden"
              >

                {/* LEFT CONTENT */}
                <div className="flex flex-col flex-1 p-5 sm:p-6">

                  <h2 className="text-lg font-semibold text-white sm:text-xl">
                    {index + 1}.{" "}
                    {item?.title || (
                      <span className="text-sm text-gray-400">
                        Title not available
                      </span>
                    )}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                    {item?.description || (
                      <span className="text-sm text-gray-400">
                        Description not available
                      </span>
                    )}
                  </p>

                </div>

                {/* RIGHT BUTTON AREA */}
                <div className="w-full md:w-64 bg-[#009E66] flex items-center justify-center py-6 md:py-0">

                  {item?.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-white text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg hover:bg-white hover:text-[#009E66] transition"
                    >
                      Open Reading
                    </a>
                  ) : (
                    <span className="text-sm text-white">
                      Link not available
                    </span>
                  )}

                </div>

              </div>
            ))}

          </div>

        </div>
      </>
    </PageAnimation>
  );
}