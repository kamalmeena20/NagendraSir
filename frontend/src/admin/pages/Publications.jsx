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

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">

      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-[#009E66]">Publications</h1>

        <button
          className="px-4 py-2 bg-[#009E66] text-white rounded"
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
          <div key={p._id} className="p-4 bg-white border rounded shadow">

            <div className="flex gap-6">

              {/* Thumbnail */}
              <img
                src={p.thumbnailUrl}
                className="object-cover border rounded w-28 h-28"
                alt="paper"
              />

              <div className="space-y-2">

                {/* Title */}
                <p>
                  <b>Title:</b> {p.title}
                </p>

                {/* Authors */}
                <p>
                  <b>Authors:</b> {p.authors}
                </p>

                {/* Journal */}
                {p.journal && (
                  <p className="pb-2">
                    <b>Journals:</b> {p.journal}
                  </p>
                )}

                {/* Paper Link */}
                {p.paperLink && (
                  <a
                    href={p.paperLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1  font-medium text-[#009E66] border border-1 border-[#009E66]"
                  >
                    Paper Link
                  </a>
                )}

              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                className="px-3 py-1 text-white bg-blue-600 rounded"
                onClick={() => {
                  setEditId(p._id);
                  setForm(p);
                  setShowModal(true);
                }}
              >
                Edit
              </button>

              <button
                className="px-3 py-1 text-white bg-red-600 rounded"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="p-6 space-y-4 bg-white rounded shadow w-96">

            <h2 className="text-xl font-semibold">
              {editId ? "Edit Publication" : "Add Publication"}
            </h2>

            <input type="file" onChange={uploadThumb} />

            {form.thumbnailUrl && (
              <img src={form.thumbnailUrl} className="w-24 h-24 mt-2 border rounded" alt="loading" />
            )}

            <input
              className="w-full p-2 border rounded"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              className="w-full p-2 border rounded"
              placeholder="Authors"
              value={form.authors}
              onChange={(e) => setForm({ ...form, authors: e.target.value })}
            />

            <input
              className="w-full p-2 border rounded"
              placeholder="Journal Info"
              value={form.journal}
              onChange={(e) => setForm({ ...form, journal: e.target.value })}
            />

            <input
              className="w-full p-2 border rounded"
              placeholder="Paper Link"
              value={form.paperLink}
              onChange={(e) => setForm({ ...form, paperLink: e.target.value })}
            />


            <button
              className="px-4 py-2 bg-[#009E66] text-white rounded"
              onClick={save}
            >
              Save
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
