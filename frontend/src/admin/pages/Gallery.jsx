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

  if (file.size > 10 * 1024 * 1024) {
    alert("Max image size is 10MB");
    return;
  }

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

  if (loading) return <div className="py-10 text-sm font-medium text-white/50">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="admin-page-title">Gallery</h1>

        <button
          onClick={() => {
            setForm({ title: "", imageUrl: "", event: "", orderIndex: 0 });
            setEditId(null);
            setShowModal(true);
          }}
          className="admin-btn-primary"
        >
          + Add Image
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {images.map((img) => (
          <div key={img._id} className="overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-3 shadow-soft backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-elev">
            <img
              alt=""
              src={`${img.imageUrl}?f_auto,q_auto`}
              className="h-48 w-full rounded-xl object-cover"
            />

            <h2 className="mt-3 px-1 text-base font-semibold text-white">{img.title}</h2>

            {img.event && (
              <p className="px-1 text-sm text-white/55">Event: {img.event}</p>
            )}

            <p className="px-1 text-xs text-white/40">Order: {img.orderIndex}</p>

            <div className="mt-3 flex gap-2 px-1 pb-1">
              <button
                onClick={() => {
                  setEditId(img._id);
                  setForm(img);
                  setShowModal(true);
                }}
                className="admin-btn-edit"
              >
                Edit
              </button>

              <button
                onClick={() => deleteImage(img._id)}
                className="admin-btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-panel">

            {/* HEADER */}
            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold tracking-tight text-brand">
                {editId ? "Edit Image" : "Add Image"}
              </h2>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setShowModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-rose-500"
              >
                ✕
              </button>

            </div>

            <input
              type="file"
              onChange={uploadGalleryImage}
              className="block w-full text-sm text-white/55 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand-100"
            />

            {form.imageUrl && (
              <img
                alt=""
                src={form.imageUrl}
                className="h-40 w-full rounded-xl object-cover shadow-soft ring-1 ring-white/15"
              />
            )}

            <input
              className="admin-input"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              className="admin-input"
              placeholder="Event Name"
              value={form.event}
              onChange={(e) => setForm({ ...form, event: e.target.value })}
            />

            <input
              type="number"
              className="admin-input"
              placeholder="Order Index"
              value={form.orderIndex}
              onChange={(e) =>
                setForm({ ...form, orderIndex: Number(e.target.value) })
              }
            />

            <button
              onClick={saveImage}
              disabled={uploading}
              className="admin-btn-primary w-full"
            >

              {uploading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Uploading...
                </>
              ) : (
                "Save"
              )}

            </button>
          </div>
        </div>
      )}
    </div>
  );
}
