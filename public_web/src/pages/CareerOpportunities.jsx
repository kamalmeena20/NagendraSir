import { useEffect, useState } from "react";
import api from "../api/api";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet-async";
import PageAnimation from '../components/PageAnimation'

export default function CareerPublic() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
     <PageAnimation>
       <Helmet>
        <title>Career | Dr Nagendra Kumar</title>

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
        <h1 className="px-6 py-2 mb-10 text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#009e66] border-2 border-[#009e66]">
          Career Opportunities
        </h1>

        <div className="w-full space-y-10">

          {categories.map((cat) => {
            const catItems = list.filter((i) => i.category === cat.value);

            if (catItems.length === 0) return null;

            return (
              <div key={cat.value} className="space-y-4">

                {/* CATEGORY TITLE */}
                <div className="inline-block px-4 py-2 text-base sm:text-lg font-bold text-[#009e66] border border-[#009e66]">
                  {cat.label}
                </div>

                {/* ITEMS */}
                {catItems.map((item) => (
                  <div key={item._id} className="space-y-2">

                    <h2 className="inline-block px-3 py-1 text-sm font-semibold text-white bg-red-600 sm:text-base">
                      {item.title}
                    </h2>

                    <p className="text-sm leading-7 text-white sm:text-base">
                      {item.description}
                    </p>

                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* CONTACT */}
        <div className="mt-16 text-sm text-center text-white sm:text-base">
          <p className="font-semibold">
            ✉ nagendra_kumar@iiitvadodara.ac.in
          </p>
        </div>

      </div>
     </PageAnimation>
    </>
  );
}