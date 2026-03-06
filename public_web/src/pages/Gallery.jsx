import { useEffect, useState } from "react";
import api from "../api/api";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet-async";
import  PageAnimation  from "../components/PageAnimation";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [preview, setPreview] = useState(null);

  const loadImages = async () => {
    try {
      const res = await api.get("/gallery");
      setImages(res.data || []);
    } catch (err) {
      console.error("Gallery Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  if (loading) return <Loader />;

  return (
    <PageAnimation>
      <div className="flex flex-col items-center w-full">

      <Helmet>
        <title>Gallery | Dr Nagendra Kumar</title>

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
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-[#009E66] mt-10 mb-10 py-2 px-6 border-2 border-[#009e66]">
        Gallery
      </h1>

      {/* SCROLLABLE GALLERY */}
      <div
        className="grid w-full max-w-7xl gap-6 px-4 overflow-y-auto
        grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3
        h-[75vh] md:h-[80vh] lg:h-auto"
        style={{ scrollbarWidth: "none" }}
      >

        {images.map((img) => (
          <div
            key={img._id}
            className="relative overflow-hidden shadow-lg cursor-pointer rounded-xl group
            h-[35vh] md:h-[30vh] lg:h-[260px]"
            onClick={() => setPreview(img)}
          >

            {/* IMAGE */}
            <img
              src={img.imageUrl}
              alt={img.title || "gallery"}
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full transition duration-500 group-hover:scale-110"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 transition duration-300 opacity-0 bg-black/60 group-hover:opacity-100">

              {img.event && (
                <p className="text-sm text-green-300">
                  Event: {img.event}
                </p>
              )}

              {img.title && (
                <h2 className="text-lg font-semibold text-white">
                  {img.title}
                </h2>
              )}

              {img.orderIndex && (
                <p className="text-xs text-gray-200">
                  Order: {img.orderIndex}
                </p>
              )}

            </div>
          </div>
        ))}

      </div>

      {/* IMAGE PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">

          <div className="relative w-full max-w-4xl">

            <button
              className="absolute text-3xl text-white top-2 right-2"
              onClick={() => setPreview(null)}
            >
              ✕
            </button>

            <img
              src={preview.imageUrl}
              alt=""
              className="w-full shadow-lg rounded-xl"
            />

            {preview.title && (
              <p className="mt-4 text-xl text-center text-white">
                {preview.title}
              </p>
            )}

          </div>

        </div>
      )}

    </div>
    </PageAnimation>
  );
}