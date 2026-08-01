import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";
import { Helmet } from "react-helmet-async";
import PageAnimation, { ScrollReveal, StaggerContainer, StaggerItem } from "../components/PageAnimation";

export default function Collaborators() {
  const [list, setList] = useState([]);

  const loadData = async () => {
    try {
      const res = await api.get("/collaborators");
      setList(res.data || []);
    } catch (err) {
      console.error(err);
      setList([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageAnimation>
      <div className="flex flex-col items-center w-full">

        <Helmet>
          <title>Collaborators | Dr Nagendra Kumar | IIITV</title>

          <meta
            name="description"
            content="Research collaborators and partner institutions working with Dr Nagendra Kumar and Nagendra Lab."
          />

          <meta name="robots" content="index, follow" />

          <link
            rel="canonical"
            href="https://nagendra-sir-xkun.vercel.app/#collaborators"
          />
        </Helmet>

        {/* PAGE TITLE */}
        <ScrollReveal>
          <h1 className="section-title">
            Collaborators
          </h1>
        </ScrollReveal>

        {/* CONTENT */}
        <StaggerContainer className="w-full max-w-4xl px-4 pb-10 space-y-8">

          {list.length === 0 && (
            <div className="py-10 text-center text-gray-400">
              No collaborators added yet.
            </div>
          )}

          {list.map((inst) => (
            <StaggerItem key={inst?._id || Math.random()} className="space-y-6 p-5 sm:p-6 glass-panel hover:border-brand/40 transition duration-300">

              {/* TOP SECTION */}
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">

                {/* LOGO */}
                <motion.img
                  src={inst?.logoUrl || "/defaultLogo.png"}
                  alt="logo"
                  className="object-contain w-20 h-20 sm:w-24 sm:h-24"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                />

                {/* INSTITUTE NAMES */}
                <div className="text-center sm:text-left">

                  <h2 className="text-lg font-semibold sm:text-xl tracking-tight">
                    {inst?.hindiInstituteName || "Institute name not available"}
                  </h2>

                  <p className="text-gray-300 mt-1 text-sm sm:text-[17px]">
                    {inst?.instituteName || "English institute name not available"}
                  </p>

                </div>
              </div>

              {/* COLLABORATORS TITLE */}
              <h3 className="text-base font-semibold sm:text-lg text-brand-400">
                Collaborators :
              </h3>

              {/* COLLABORATORS LIST */}
              {inst?.collaborators?.length > 0 ? (
                <ul className="pl-6 space-y-2 text-sm text-gray-300 list-disc sm:text-base">
                  {inst.collaborators.map((c, index) => (
                    <li key={index}>{c || "Unnamed collaborator"}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">
                  No collaborators listed.
                </p>
              )}

            </StaggerItem>
          ))}

        </StaggerContainer>
      </div>
    </PageAnimation>
  );
}
