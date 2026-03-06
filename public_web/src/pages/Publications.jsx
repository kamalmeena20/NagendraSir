import { useEffect, useState } from "react";
import api from "../api/api";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet-async";
import  PageAnimation  from "../components/PageAnimation";

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
   <PageAnimation>
     <div className="flex flex-col min-h-screen">

      <Helmet>
        <title>Publications | Dr Nagendra Kumar</title>

        <meta
          name="description"
          content="Research publications by Dr Nagendra Kumar including journal papers, conference papers and citations."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://nagendra-sir-xkun.vercel.app/#publications"
        />
      </Helmet>

      {/* Heading */}
      <h1
        className="
        text-2xl sm:text-3xl md:text-4xl
        font-semibold
        text-center
        text-[#009E66]
        mb-8
        border-2 border-[#009E66]
        p-3 sm:p-4
        w-fit
        mx-auto
        mt-3
        "
      >
        Publications
      </h1>

      {/* Scrollable Cards Container */}
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-6 sm:gap-8
        px-4 sm:px-6 lg:px-10
        max-h-[60vh] sm:max-h-[500px]
        overflow-y-scroll
        pr-2
        no-scrollbar
        "
        style={{ scrollbarWidth: "none" }}
      >

        {pubs.map((p) => (

          <div
            key={p._id}
            className="
            group
            mx-auto
            [perspective:1000px]
            w-full
            max-w-[300px] sm:max-w-[320px]
            h-[300px] sm:h-[320px]
            "
          >

            <div
              className={`
              relative
              w-full
              h-full
              duration-700
              [transform-style:preserve-3d]
              ${!lockFlip ? "group-hover:[transform:rotateY(180deg)]" : ""}
              `}
            >

              {/* FRONT */}
              <div
                className="
                absolute
                w-full
                h-full
                border-2 border-[#009E66]
                p-3
                [backface-visibility:hidden]
                flex flex-col justify-between
                "
              >

                <img
                  src={p.thumbnailUrl}
                  alt="thumbnail"
                  className="object-cover w-full h-44 sm:h-52"
                />

                <a
                  href={p.paperLink}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  w-full
                  mt-3
                  text-center
                  py-2
                  border border-[#009E66]
                  text-[#009E66]
                  font-semibold
                  transition-all duration-300
                  hover:bg-[#009E66]
                  hover:text-white
                  text-sm sm:text-base
                  "
                  onMouseEnter={() => setLockFlip(true)}
                  onMouseLeave={() => setLockFlip(false)}
                >
                  Paper Link
                </a>

              </div>

              {/* BACK */}
              <div
                className="
 absolute
 w-full
  h-full
 [transform:rotateY(180deg)]
[backface-visibility:hidden]
 overflow-y-auto
 border border-[#009E66]
 bg-white
flex flex-col
 "
              >

                {/* Citation header */}
                <div
                  className="
                  w-full
                  text-center
                  py-3
                  border-b border-[#009E66]
                  flex justify-center
                  "
                >
                  <h3
                    className="
                    px-6 sm:px-8
                    py-2
                    text-lg sm:text-xl
                    font-semibold
                    text-black
                    border
                    w-fit
                    border-[#009e66]
                    "
                  >
                    Citation
                  </h3>
                </div>

                {/* Green section */}
                <div
                  className="
                  bg-[#009E66]
                  text-white
                  p-3 sm:p-4
                  flex-1
                  text-xs sm:text-sm
                  leading-snug
                  text-start
                  "
                >

                  <p className="mb-3 font-semibold tracking-wide">
                    {p.title}
                  </p>

                  <p className="mb-3">
                    {p.authors}
                  </p>

                  <p>
                    {p.journal}
                  </p>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
   </PageAnimation>
  );
}