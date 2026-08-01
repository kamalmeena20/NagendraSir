import { useEffect, useState } from "react";
import api from "../api/api";
import { Helmet } from "react-helmet-async";
import PageAnimation, { ScrollReveal, StaggerContainer, StaggerItem } from '../components/PageAnimation'

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
    } finally {
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <PageAnimation>
        <Helmet>
          <title>Career Opportunities | Dr Nagendra Kumar</title>

          <meta
            name="description"
            content="PhD, PDRF, internship and research opportunities in Nagendra Lab."
          />

          <meta name="robots" content="index, follow" />

          <link
            rel="canonical"
            href="https://nagendra-sir-xkun.vercel.app/#career"
          />
        </Helmet>


        <div className="flex flex-col items-center w-full max-w-6xl px-4 py-10 mx-auto">

          {/* PAGE TITLE */}
          <ScrollReveal>
            <h1 className="section-title mb-10 mt-0">
              Career Opportunities
            </h1>
          </ScrollReveal>

          <div className="w-full space-y-10">

            {list.length === 0 ? (
              <div className="py-20 text-lg text-center text-gray-400">
                No data available
              </div>
            ) : (

              categories.map((cat) => {
                const catItems = list.filter((i) => i.category === cat.value);

                if (catItems.length === 0) return null;

                return (
                  <ScrollReveal key={cat.value}>
                    <div className="space-y-4 glass-panel p-5 sm:p-6">

                      <div className="inline-block px-4 py-2 text-base sm:text-lg font-bold text-[#009e66] border border-[#009e66]/80 rounded-lg bg-brand/10">
                        {cat.label}
                      </div>

                      <StaggerContainer className="space-y-4">
                        {catItems.map((item) => (
                          <StaggerItem key={item._id} className="space-y-2">

                            <h2 className="inline-block max-w-full px-4 py-2 text-sm font-semibold leading-relaxed tracking-wide text-white break-words bg-brand sm:text-base rounded-lg shadow-glow font-sans">
                              {item?.title || "No title available"}
                            </h2>

                            <p className="text-sm leading-7 tracking-wide text-white/90 sm:text-base sm:leading-8">
                              {item?.description || "No description available"}
                            </p>

                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  </ScrollReveal>
                );
              })

            )}

          </div>
          {/* CONTACT */}
          <ScrollReveal>
            <div className="mt-16 text-sm text-center text-white sm:text-base">
              <p className="font-semibold text-brand-400">
                ✉ nagendra_kumar@iiitvadodara.ac.in
              </p>
            </div>
          </ScrollReveal>

        </div>
      </PageAnimation>
    </>
  );
}
