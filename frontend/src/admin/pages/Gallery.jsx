import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    event: "",
    orderIndex: 0
  });

  // Load gallery images
  const loadImages = async () => {
    const res = await api.get("/gallery");
    setImages(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadImages();
  }, []);

  // Upload Image to Cloudinary
  const uploadGalleryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    try {
      setUploading(true);
      const res = await api.post("/upload/image", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setForm({ ...form, imageUrl: res.data.url });
    } catch (err) {
      alert("Upload failed!");
    }
    setUploading(false);
  };

  // Save (Add or Update)
  const saveImage = async () => {
    if (uploading) return alert("Please wait, image uploading...");

    const payload = {
      ...form,
      orderIndex: Number(form.orderIndex),
    };

    if (editId) {
      await api.put(`/gallery/update/${editId}`, payload);
    } else {
      await api.post("/gallery/add", payload);
    }

    setShowModal(false);
    loadImages();
  };

  // Delete
  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    await api.delete(`/gallery/delete/${id}`);
    loadImages();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-[#009E66]">Gallery</h1>

        <button
          onClick={() => {
            setForm({ title: "", imageUrl: "", event: "", orderIndex: 0 });
            setEditId(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-[#009E66] text-white rounded-lg hover:bg-[#007a4f]"
        >
          + Add Image
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {images.map((img) => (
          <div key={img._id} className="p-3 bg-white rounded-lg shadow">
            <img
              src={img.imageUrl}
              className="object-cover w-full h-48 rounded"
            />

            <h2 className="mt-2 text-lg font-semibold">{img.title}</h2>

            {img.event && (
              <p className="text-sm text-gray-600">Event: {img.event}</p>
            )}

            <p className="text-sm text-gray-500">Order: {img.orderIndex}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => {
                  setEditId(img._id);
                  setForm(img);
                  setShowModal(true);
                }}
                className="px-3 py-1 text-white bg-blue-600 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteImage(img._id)}
                className="px-3 py-1 text-white bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="p-6 space-y-4 bg-white rounded-lg shadow w-96">

            <h2 className="text-xl font-semibold text-[#009E66]">
              {editId ? "Edit Image" : "Add Image"}
            </h2>

            <input
              type="file"
              onChange={uploadGalleryImage}
              className="w-full p-2 border rounded"
            />

            {form.imageUrl && (
              <img
                src={form.imageUrl}
                className="object-cover w-full h-40 border rounded"
              />
            )}

            <input
              className="w-full p-2 border rounded"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              className="w-full p-2 border rounded"
              placeholder="Event Name"
              value={form.event}
              onChange={(e) => setForm({ ...form, event: e.target.value })}
            />

            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Order Index"
              value={form.orderIndex}
              onChange={(e) =>
                setForm({ ...form, orderIndex: Number(e.target.value) })
              }
            />

            <button
              onClick={saveImage}
              className="px-3 py-1 bg-[#009E66] text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
