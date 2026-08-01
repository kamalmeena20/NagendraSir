import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ExperienceModal from "../components/profileModal/ExperienceModal";
import EducationModal from "../components/profileModal/EducationModal";
import TeachingModal from "../components/profileModal/TeachingModal";
import RecognitionModal from "../components/profileModal/RecognitionModal";
import api from "../api/api";
import { Helmet } from "react-helmet-async";
import PageAnimation, { ScrollReveal, StaggerContainer, StaggerItem } from "../components/PageAnimation";

export default function Profile() {

  const mainColor = "#009E66";

  const [data, setData] = useState({});

  const [showTeaching, setShowTeaching] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showRecognition, setShowRecognition] = useState(false);
  const [showExpModal, setShowExpModal] = useState(false);

  const loadProfile = async () => {
    try {
      const res = await api.get("/profile");
      setData(res.data?.data || {});
    } catch (err) {
      console.error("PROFILE LOAD ERROR:", err);
      setData({});
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <PageAnimation>
      <div className="flex flex-col items-center w-full">

        <Helmet>
          <title>Profile | Dr Nagendra Kumar | IIITV</title>
          <meta name="description" content="PhD, PDRF, internship and research opportunities in Nagendra Lab." />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://nagendra-sir-xkun.vercel.app/#profile" />
        </Helmet>

        {/* PAGE TITLE */}
        <ScrollReveal>
          <h1 className="section-title">
            Profile
          </h1>
        </ScrollReveal>

        <div className="w-full max-w-6xl px-6 mx-auto">

          {/* HEADER */}
          <ScrollReveal>
            <div className="flex flex-col items-center gap-10 glass-panel p-6 sm:p-8 md:flex-row md:items-start">

              {/* IMAGE */}
              <div className="flex-shrink-0">
                <motion.div
                  className="border-2 rounded-full w-36 h-36 md:w-44 md:h-44 overflow-hidden shadow-glow"
                  style={{ borderColor: mainColor }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <img
                    src={data?.profileImage || "https://via.placeholder.com/300"}
                    alt="profile"
                    className="object-cover w-full h-full rounded-full"
                  />
                </motion.div>
              </div>

              {/* TEXT */}
              <div className="flex flex-col items-center flex-1 gap-6 text-start md:flex-row md:items-start md:text-left">

                <div
                  className="hidden md:block w-[2px] h-36 rounded-full"
                  style={{ backgroundColor: mainColor }}
                />

                <div>
                  <h2 className="text-xl font-bold md:text-2xl tracking-tight">
                    {data?.name || <span className="text-base font-normal text-gray-400">Name not available</span>}
                  </h2>

                  <p className="text-lg text-white/85">
                    {data?.designation || <span className="text-sm text-gray-400">Designation not available</span>}
                  </p>

                  <p className="text-lg text-white/85">
                    {data?.department || <span className="text-sm text-gray-400">Department not available</span>}
                  </p>

                  <p className="text-lg text-white/85">
                    {data?.institute || <span className="text-sm text-gray-400">Institute not available</span>}
                  </p>
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* BIOGRAPHY */}
          <ScrollReveal delay={0.1}>
            <div className="mt-10 text-start md:text-left">

              <h3
                className="mb-4 text-2xl font-semibold text-left tracking-tight"
                style={{ color: mainColor }}
              >
                Brief Biography:
              </h3>

              <p className="leading-relaxed text-[15px] sm:text-[16px] md:text-[17px] max-w-3xl text-white/90 whitespace-pre-wrap break-words">
                {data?.biography || (
                  <span className="text-sm text-gray-400">
                    Biography not available.
                  </span>
                )}
              </p>

            </div>
          </ScrollReveal>

          {/* BUTTONS */}
          <StaggerContainer className="grid grid-cols-1 gap-6 mt-16 sm:grid-cols-3 md:grid-cols-3">

            <StaggerItem>
              <button
                className="brand-outline-btn w-full"
                onClick={() => setShowExpModal(true)}
              >
                Professional Experience
              </button>
            </StaggerItem>

            <StaggerItem>
              <button
                className="brand-outline-btn w-full"
                onClick={() => setShowTeaching(true)}
              >
                Teaching
              </button>
            </StaggerItem>

            <StaggerItem>
              <button
                className="brand-outline-btn w-full"
                onClick={() => setShowEducation(true)}
              >
                Education
              </button>
            </StaggerItem>

          </StaggerContainer>

          {/* RECOGNITION */}
          <ScrollReveal delay={0.15}>
            <div className="flex justify-center mt-6">

              <button
                className="w-full sm:w-auto px-8 sm:px-16 md:px-40 py-3 text-base sm:text-lg font-semibold border-2 transition-all duration-300 hover:bg-[#009E66] hover:!text-white hover:shadow-glow"
                style={{ borderColor: mainColor, color: mainColor }}
                onClick={() => setShowRecognition(true)}
              >
                Recognition
              </button>

            </div>
          </ScrollReveal>

        </div>

        {/* MODALS */}

        <ExperienceModal
          open={showExpModal}
          onClose={() => setShowExpModal(false)}
          mainColor={mainColor}
          experience={data?.professionalExperience || []}
        />

        <TeachingModal
          open={showTeaching}
          onClose={() => setShowTeaching(false)}
          mainColor={mainColor}
          teaching={data?.teaching || []}
        />

        <EducationModal
          open={showEducation}
          onClose={() => setShowEducation(false)}
          mainColor={mainColor}
          education={data?.education || []}
        />

        <RecognitionModal
          open={showRecognition}
          onClose={() => setShowRecognition(false)}
          mainColor={mainColor}
          recognition={data?.recognition || []}
        />

      </div>
    </PageAnimation>
  );
}
