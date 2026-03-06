import React, { useEffect, useState } from "react";
import ExperienceModal from "../components/profileModal/ExperienceModal";
import EducationModal from "../components/profileModal/EducationModal";
import TeachingModal from "../components/profileModal/TeachingModal";
import RecognitionModal from "../components/profileModal/RecognitionModal";
import api from "../api/api";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet-async";
import  PageAnimation  from "../components/PageAnimation";

export default function Profile() {

  const mainColor = "#009E66";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showTeaching, setShowTeaching] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showRecognition, setShowRecognition] = useState(false);
  const [showExpModal, setShowExpModal] = useState(false);

  const loadProfile = async () => {
    try {
      const res = await api.get("/profile");
      setData(res.data.data);
    } catch (err) {
      console.error("PROFILE LOAD ERROR:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading || !data) return <Loader />;

  return (
    <PageAnimation>
      <div className="flex flex-col items-center w-full">

      <Helmet>
        <title>Profile | Dr Nagendra Kumar</title>
        <meta name="description" content="PhD, PDRF, internship and research opportunities in Nagendra Lab." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://nagendra-sir-xkun.vercel.app/#profile" />
      </Helmet>

      {/* PAGE TITLE */}
      <h1 className="text-3xl md:text-4xl font-semibold text-center text-[#009E66] mt-10 mb-12 py-2 px-10 border-2 border-[#009e66] w-fit">
        Profile
      </h1>

      <div className="w-full max-w-6xl px-6 mx-auto">

        {/* HEADER */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">

          {/* IMAGE */}
          <div className="flex-shrink-0">
            <div
              className="border-2 rounded-full w-36 h-36 md:w-44 md:h-44"
              style={{ borderColor: mainColor }}
            >
              <img
                src={data.profileImage || "https://via.placeholder.com/300"}
                alt="profile"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="flex flex-col items-center flex-1 gap-6 text-start md:flex-row md:items-start md:text-left">

            <div
              className="hidden md:block w-[2px] h-36 rounded-full"
              style={{ backgroundColor: mainColor }}
            />

            <div>
              <h2 className="text-xl font-bold md:text-2xl">{data.name}</h2>
              <p className="text-lg">{data.designation}</p>
              <p className="text-lg">{data.department}</p>
              <p className="text-lg">{data.institute}</p>
            </div>

          </div>

        </div>

        {/* BIOGRAPHY */}
        <div className="mt-10 text-start md:text-left">

          <h3
            className="mb-4 text-2xl font-semibold text-left"
            style={{ color: mainColor }}
          >
            Brief Biography:
          </h3>

          <p className="leading-relaxed text-[16px] md:text-[17px] max-w-3xl">
            {data.biography || "No biography available."}
          </p>

        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-1 gap-6 mt-16 sm:grid-cols-3 md:grid-cols-3">

          <button
            className="w-full py-3 text-lg font-semibold border-2 text-[#009E66] border-[#009E66] transition-all duration-300 hover:bg-[#009E66] hover:text-white"
            onClick={() => setShowTeaching(true)}
          >
            Professional Experience
          </button>

          <button
            className="w-full py-3 text-lg font-semibold border-2 text-[#009E66] border-[#009E66] transition-all duration-300 hover:bg-[#009E66] hover:text-white"
            onClick={() => setShowTeaching(true)}
          >
            Teaching
          </button>

          <button
            className="w-full py-3 text-lg font-semibold border-2 text-[#009E66] border-[#009E66] transition-all duration-300 hover:bg-[#009E66] hover:text-white"
            onClick={() => setShowEducation(true)}
          >
            Education
          </button>

        </div>

        {/* RECOGNITION */}
        <div className="flex justify-center mt-6">

          <button
            className="px-10 md:px-40 py-3 text-lg font-semibold border-2 transition-all duration-300 hover:bg-[#009E66] hover:!text-white"
            style={{ borderColor: mainColor, color: mainColor }}
            onClick={() => setShowRecognition(true)}
          >
            Recognition
          </button>

        </div>

      </div>

      {/* MODALS */}

      <ExperienceModal
        open={showExpModal}
        onClose={() => setShowExpModal(false)}
        mainColor={mainColor}
        experience={data.professionalExperience}
      />

      <TeachingModal
        open={showTeaching}
        onClose={() => setShowTeaching(false)}
        mainColor={mainColor}
        teaching={data.teaching}
      />

      <EducationModal
        open={showEducation}
        onClose={() => setShowEducation(false)}
        mainColor={mainColor}
        education={data.education}
      />

      <RecognitionModal
        open={showRecognition}
        onClose={() => setShowRecognition(false)}
        mainColor={mainColor}
        recognition={data.recognition}
      />

    </div>
    </PageAnimation>
  );
}