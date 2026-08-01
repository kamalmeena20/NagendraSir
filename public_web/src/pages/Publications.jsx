import { useEffect, useState } from "react";
import api from "../api/api";
import { Helmet } from "react-helmet-async";
import PageAnimation, { ScrollReveal, StaggerContainer, StaggerItem } from "../components/PageAnimation";

export default function UserPublications() {

  const [pubs, setPubs] = useState([]);
  const [lockFlip, setLockFlip] = useState(false);

  const loadData = async () => {
    try {
      const res = await api.get("/publications");
      setPubs(res.data || []);
    } catch (err) {
      console.log("Error loading publications");
      setPubs([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageAnimation>
      <div className="flex flex-col min-h-screen">

        <Helmet>
          <title>Research Publications | Dr Nagendra Kumar | IIITV</title>

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
        <ScrollReveal>
          <h1 className="section-title">
            Publications
          </h1>
        </ScrollReveal>

        {/* Scrollable Cards */}
        <StaggerContainer
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-5 sm:gap-6 lg:gap-8
          px-4 sm:px-6 lg:px-10
          max-h-none sm:max-h-[520px]
          overflow-visible sm:overflow-y-auto
          pr-0 sm:pr-2
          no-scrollbar
          "
          style={{ scrollbarWidth: "none" }}
        >

          {pubs.length === 0 && (
            <div className="py-20 text-center text-gray-400 col-span-full">
              No publications available
            </div>
          )}

          {pubs.map((p) => (

            <StaggerItem
              key={p?._id || Math.random()}
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
                  border-2 border-[#009E66]/80
                  p-3
                  [backface-visibility:hidden]
                  flex flex-col justify-between
                  bg-black/40
                  backdrop-blur-sm
                  rounded-xl
                  shadow-soft
                  "
                >

                  <img
                    src={p?.thumbnailUrl || "/defaultPublication.jpg"}
                    alt="thumbnail"
                    className="object-cover w-full h-44 sm:h-52 rounded-lg"
                  />

                  {p?.paperLink ? (
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
                      rounded-lg
                      "
                      onMouseEnter={() => setLockFlip(true)}
                      onMouseLeave={() => setLockFlip(false)}
                    >
                      Paper Link
                    </a>
                  ) : (
                    <p className="mt-3 text-sm text-center text-gray-400">
                      Link not available
                    </p>
                  )}

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
                  rounded-xl
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

                  {/* Citation content */}
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
                      {p?.title || (
                        <span className="text-gray-200">
                          Title not available
                        </span>
                      )}
                    </p>

                    <p className="mb-3">
                      {p?.authors || (
                        <span className="text-gray-200">
                          Authors not available
                        </span>
                      )}
                    </p>

                    <p>
                      {p?.journal || (
                        <span className="text-gray-200">
                          Journal not available
                        </span>
                      )}
                    </p>

                  </div>

                </div>

              </div>

            </StaggerItem>

          ))}

        </StaggerContainer>

      </div>
    </PageAnimation>
  );
}
