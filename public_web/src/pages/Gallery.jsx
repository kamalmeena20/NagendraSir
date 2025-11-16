import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

export default function Gallery() {
  const mainColor = "#009E66";
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [preview, setPreview] = useState(null);

  const loadImages = async () => {
    try {
      const res = await api.get("/gallery");
      setImages(res.data || []);
    } catch (err) {
      console.error("Gallery Load Error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadImages();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-xl text-center">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />

      <h1 className="text-4xl font-semibold text-center text-[#009E66] mt-10 mb-12 py-2 px-10 border-2 border-[#009e66] w-fit">
        Gallery
      </h1>

      {/* ----------- COLLAGE BLOCKS GRID ----------- */}
      <div className="grid w-full gap-6 px-6 max-w-7xl"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {images.map((img, index) => (
          <div
            key={img._id}
            className={`relative overflow-hidden rounded-xl shadow-md cursor-pointer group`}
            onClick={() => setPreview(img)}
            style={{
              height:
                index % 7 === 0
                  ? "260px"
                  : index % 5 === 0
                  ? "340px"
                  : index % 3 === 0
                  ? "200px"
                  : "300px",
            }}
          >
            <img
              src={img.imageUrl}
              alt={img.title || "gallery"}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* ----------- IMAGE PREVIEW MODAL ----------- */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
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
  );
}
