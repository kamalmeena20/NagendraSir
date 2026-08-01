import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Publications() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    thumbnailUrl: "",
    title: "",
    authors: "",
    citation: "",
    linkUrl: "",
    orderIndex: 0
  });

  // Load publications
  const loadData = async () => {
    const res = await api.get("/publications");
    setList(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Upload image
  const uploadThumb = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    try {
      setUploading(true);
      const res = await api.post("/upload/image", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setForm({ ...form, thumbnailUrl: res.data.url });
    } catch (err) {
      alert("Upload failed");
    }
    setUploading(false);
  };

  // Save
  const save = async () => {
    if (uploading) return alert("Please wait for image upload");

    if (editId) {
      await api.put(`/publications/update/${editId}`, form);
    } else {
      await api.post("/publications/add", form);
    }

    setShowModal(false);
    loadData();
  };

  // Delete
  const remove = async (id) => {
    if (!window.confirm("Delete publication?")) return;
    await api.delete(`/publications/delete/${id}`);
    loadData();
  };

  if (loading) return <div className="py-10 text-sm font-medium text-white/50">Loading...</div>;

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="admin-page-title">Publications</h1>

        <button
          className="admin-btn-primary"
          onClick={() => {
            setEditId(null);
            setForm({
              thumbnailUrl: "",
              title: "",
              authors: "",
              citation: "",
              linkUrl: "",
              orderIndex: 0
            });
            setShowModal(true);
          }}
        >
          + Add Publication
        </button>
      </div>

      {/* LIST */}

      <div className="space-y-4">
        {list.map((p) => (
          <div key={p._id} className="admin-surface-card">

            <div className="flex flex-col gap-5 sm:flex-row">

              {/* Thumbnail */}
              <img
                src={p.thumbnailUrl}
                className="h-28 w-28 shrink-0 rounded-xl object-cover shadow-soft ring-1 ring-white/15"
                alt="paper"
              />

              <div className="min-w-0 space-y-2 text-sm text-white/80">

                {/* Title */}
                <p>
                  <b className="font-semibold text-white">Title:</b> {p.title}
                </p>

                {/* Authors */}
                <p>
                  <b className="font-semibold text-white">Authors:</b> {p.authors}
                </p>

                {/* Journal */}
                {p.journal && (
                  <p>
                    <b className="font-semibold text-white">Journals:</b> {p.journal}
                  </p>
                )}

                {/* Paper Link */}
                {p.paperLink && (
                  <a
                    href={p.paperLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-lg border border-brand/40 px-2.5 py-1 text-sm font-medium text-brand transition hover:bg-brand-50"
                  >
                    Paper Link
                  </a>
                )}

              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                className="admin-btn-edit"
                onClick={() => {
                  setEditId(p._id);
                  setForm(p);
                  setShowModal(true);
                }}
              >
                Edit
              </button>

              <button
                className="admin-btn-danger"
                onClick={() => remove(p._id)}
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

              <h2 className="text-xl font-semibold tracking-tight text-white">
                {editId ? "Edit Publication" : "Add Publication"}
              </h2>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setShowModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-rose-500"
              >
                ✕
              </button>

            </div>

            <input type="file" onChange={uploadThumb} className="block w-full text-sm text-white/55 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand-100" />

            {form.thumbnailUrl && (
              <img src={form.thumbnailUrl} className="mt-1 h-24 w-24 rounded-xl object-cover shadow-soft ring-1 ring-white/15" alt="loading" />
            )}

            <input
              className="admin-input"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              className="admin-input"
              placeholder="Authors"
              value={form.authors}
              onChange={(e) => setForm({ ...form, authors: e.target.value })}
            />

            <input
              className="admin-input"
              placeholder="Journal Info"
              value={form.journal}
              onChange={(e) => setForm({ ...form, journal: e.target.value })}
            />

            <input
              className="admin-input"
              placeholder="Paper Link"
              value={form.paperLink}
              onChange={(e) => setForm({ ...form, paperLink: e.target.value })}
            />

            <button
              className="admin-btn-primary w-full"
              onClick={save}
              disabled={uploading}
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
