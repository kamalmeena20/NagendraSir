import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/api";
import { Helmet } from "react-helmet-async";
import PageAnimation, { ScrollReveal, StaggerContainer, StaggerItem } from "../components/PageAnimation";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);

  const loadImages = async () => {
    try {
      const res = await api.get("/gallery");
      setImages(res.data || []);
    } catch (err) {
      console.error("Gallery Load Error:", err);
      setImages([]);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <PageAnimation>
      <div className="flex flex-col items-center w-full">

        <Helmet>
          <title>Gallery | Dr Nagendra Kumar | IIITV</title>

          <meta
            name="description"
            content="PhD, Events, internship and research opportunities in Nagendra Lab."
          />

          <meta name="robots" content="index, follow" />

          <link
            rel="canonical"
            href="https://nagendra-sir-xkun.vercel.app/#gallery"
          />
        </Helmet>

        {/* PAGE TITLE */}
        <ScrollReveal>
          <h1 className="section-title">
            Gallery
          </h1>
        </ScrollReveal>

        {/* GALLERY GRID */}
        <StaggerContainer
          className="grid w-full max-w-7xl gap-4 sm:gap-6 px-4 overflow-visible sm:overflow-y-auto
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          max-h-none sm:max-h-[70vh] lg:max-h-none"
          style={{ scrollbarWidth: "none" }}
        >

          {images.length === 0 && (
            <div className="py-20 text-center text-gray-400 col-span-full">
              No images available
            </div>
          )}

          {images.map((img) => (
            <StaggerItem
              key={img?._id || Math.random()}
              className="relative overflow-hidden shadow-lg cursor-pointer rounded-xl group
              h-[220px] sm:h-[240px] md:h-[260px] border border-white/10 hover:border-brand/50 transition duration-300 hover:shadow-glow"
              onClick={() => img?.imageUrl && setPreview(img)}
            >

              {/* IMAGE */}
              <img
                src={img?.imageUrl || "/defaultGallery.jpg"}
                alt={img?.title || "gallery"}
                loading="lazy"
                decoding="async"
                className="object-cover w-full h-full transition duration-500 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 transition duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:opacity-100">

                {img?.event && (
                  <p className="text-sm text-brand-400">
                    Event: {img.event}
                  </p>
                )}

                {img?.title && (
                  <h2 className="text-lg font-semibold text-white">
                    {img.title}
                  </h2>
                )}

                {img?.orderIndex && (
                  <p className="text-xs text-gray-200">
                    Order: {img.orderIndex}
                  </p>
                )}

              </div>

            </StaggerItem>
          ))}

        </StaggerContainer>

        {/* IMAGE PREVIEW MODAL */}
        <AnimatePresence>
          {preview?.imageUrl && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              <motion.div
                className="relative w-full max-w-4xl"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >

                <button
                  className="absolute text-3xl text-white transition top-2 right-2 hover:text-brand-400"
                  onClick={() => setPreview(null)}
                >
                  ✕
                </button>

                <img
                  src={preview.imageUrl}
                  alt="preview"
                  className="w-full shadow-glow rounded-xl border border-white/10"
                />

                {preview?.title && (
                  <p className="mt-4 text-xl text-center text-white">
                    {preview.title}
                  </p>
                )}

              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageAnimation>
  );
}
