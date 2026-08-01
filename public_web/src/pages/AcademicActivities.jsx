import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";
import PageAnimation, { ScrollReveal, StaggerContainer, StaggerItem } from "../components/PageAnimation";

export default function AcademicActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  //   const loadActivities = async () => {
  //     try {
  //       const res = await api.get("/academic-activities");
  //       setActivities(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const loadActivities = async () => {
    try {
      console.log("Calling API...");

      const res = await api.get("/academic-activities");

      console.log("API Response:", res);

      console.log("Data:", res.data);

      setActivities(res.data);
    } catch (err) {
      console.log("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log("Activities State:", activities);
  if (loading) {
    return (
      <div className="py-20 mx-auto text-center max-w-7xl text-white/70">
        Loading Academic Activities...
      </div>
    );
  }

  return (
    <PageAnimation>
      <div className="px-4 sm:px-6 py-6 sm:py-8 mx-auto max-w-7xl">

        <ScrollReveal>
          <h1 className="section-title">
            Academic Activities
          </h1>
        </ScrollReveal>

        {/* Scroll when more than ~2 cards; scrollbar hidden */}
        <div
          className="hide-scrollbar mt-4 max-h-[70vh] overflow-y-auto pr-1 sm:max-h-[620px]"
        >
          <StaggerContainer className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">

            {activities.map((item) => (

              <StaggerItem
                key={item._id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1A1A1A]/95 to-[#121816]/95 shadow-soft hover:border-[#009E66]/70 hover:shadow-glow transition-all duration-300 h-full backdrop-blur-sm"
              >

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] xl:grid-cols-[200px_1fr]">

                  {/* LEFT IMAGE */}
                  <div className="overflow-hidden bg-black/80">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[200px] sm:h-[230px] md:h-full md:min-h-[260px] md:w-[180px] xl:w-[200px] object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.45 }}
                    />
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="flex flex-col justify-between gap-4 p-4 sm:p-5">

                    <div>
                      <span className="inline-flex px-3 py-1 mb-3 text-xs font-semibold tracking-wide rounded-full bg-[#009E66]/20 text-[#00D48A] sm:text-sm">
                        {item.type}
                      </span>

                      <h2 className="font-sans text-lg sm:text-xl font-semibold leading-snug tracking-wide text-white line-clamp-2 break-words">
                        {item.title}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300 tracking-wide">
                      <div className="space-y-3">
                        <p>
                          <span className="font-semibold text-[#00D48A]">Role</span>
                          <br />
                          <span className="text-white/80">{item.role}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-[#00D48A]">Organizer</span>
                          <br />
                          <span className="text-white/80">{item.organizer}</span>
                        </p>
                      </div>

                      <div className="space-y-3">
                        <p>
                          <span className="font-semibold text-[#00D48A]">Venue</span>
                          <br />
                          <span className="text-white/80">{item.venue}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-[#00D48A]">Country</span>
                          <br />
                          <span className="text-white/80">{item.country}</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <p className="font-semibold tracking-wide text-[#00D48A]">Date</p>
                      <p className="mt-1 text-sm tracking-wide text-gray-300">
                        {new Date(item.startDate).toLocaleDateString()}{" "}
                        {item.endDate &&
                          ` - ${new Date(item.endDate).toLocaleDateString()}`}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <p className="font-semibold tracking-wide text-[#00D48A] mb-1.5">
                        Description
                      </p>
                      <p className="text-sm leading-7 tracking-wide text-gray-300 line-clamp-4">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </div>
              </StaggerItem>

            ))}

          </StaggerContainer>
        </div>

      </div>
    </PageAnimation>
  );
}
