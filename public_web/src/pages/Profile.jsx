import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ExperienceModal from "../components/profileModal/ExperienceModal";
import EducationModal from "../components/profileModal/EducationModal";
import TeachingModal from "../components/profileModal/TeachingModal";
import RecognitionModal from "../components/profileModal/RecognitionModal";
import api from "../api/api";

export default function Profile() {
  const mainColor = "#009E66";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showTeaching, setShowTeaching] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showRecognition, setShowRecognition] = useState(false);
  const [showExpModal, setShowExpModal] = useState(false);

  // ---------------- LOAD PROFILE DATA ----------------
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

  if (loading || !data)
    return <div className="p-10 text-xl text-center">Loading...</div>;

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />

      <h1 className="text-4xl font-semibold text-center text-[#009E66] mt-10 mb-12 py-2 px-10 border-2 border-[#009e66] w-fit">
        Profile
      </h1>

      <div className="max-w-6xl px-6 mx-auto">
        {/* -------------------------------- HEADER -------------------------------- */}
        <div className="flex flex-col items-center gap-10 md:flex-row">
          {/* IMAGE */}
          <div className="flex-shrink-0">
            <div
              className="border-2 rounded-full w-44 h-44"
              style={{ borderColor: mainColor }}
            >
              <img
                src={data.profileImage || "https://via.placeholder.com/300"}
                alt="profile"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </div>

          {/* TEXT DETAILS */}
          <div className="flex flex-col items-start flex-1 gap-6 md:flex-row md:items-center">
            <div
              className="hidden md:block w-[2px] h-36 rounded-full"
              style={{ backgroundColor: mainColor }}
            />

            <div>
              <h2 className="text-2xl font-bold">{data.name}</h2>
              <p className="mt-1 text-lg">{data.designation}</p>
              <p className="text-lg">{data.department}</p>
              <p className="text-lg">{data.institute}</p>
            </div>
          </div>
        </div>

        {/* -------------------------------- BIOGRAPHY -------------------------------- */}
        <div className="flex flex-col mt-6">
          <h3
            className="mb-4 ml-[215px] text-2xl font-semibold"
            style={{ color: mainColor }}
          >
            Brief Biography:
          </h3>

          <p className="leading-relaxed text-[17px] ml-[215px]">
            {data.biography || "No biography available."}
          </p>
        </div>

        {/* -------------------------------- BUTTONS -------------------------------- */}
        <div className="grid grid-cols-1 gap-6 mt-16 text-center sm:grid-cols-3 ml-[215px]">
          <button
            className="py-3 text-lg font-semibold border-2"
            style={{ borderColor: mainColor, color: mainColor }}
            onClick={() => setShowExpModal(true)}
          >
            Professional Experience
          </button>

          <button
            className="py-3 text-lg font-semibold border-2"
            style={{ borderColor: mainColor, color: mainColor }}
            onClick={() => setShowTeaching(true)}
          >
            Teaching
          </button>

          <button
            className="py-3 text-lg font-semibold border-2"
            style={{ borderColor: mainColor, color: mainColor }}
            onClick={() => setShowEducation(true)}
          >
            Education
          </button>
        </div>

        <div className="mt-6 text-center ml-[230px]">
          <button
            className="px-40 py-3 text-lg font-semibold border-2"
            style={{ borderColor: mainColor, color: mainColor }}
            onClick={() => setShowRecognition(true)}
          >
            Recognition
          </button>
        </div>
      </div>

      {/* ---------------------- MODALS ---------------------- */}

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
  );
}
