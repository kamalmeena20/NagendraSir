import { useEffect, useState } from "react";
import api from "../../api/api";

export default function GeneralReadings() {
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await api.get("/readings");
    setList(res.data);
  };

  const save = async () => {
    if (editingId) {
      await api.put(`/readings/${editingId}`, form);
    } else {
      await api.post("/readings", form);
    }
    setModalOpen(false);
    setEditingId(null);
    loadData();
  };

  const del = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await api.delete(`/readings/${id}`);
    loadData();
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="admin-page-title">General Readings</h1>

        <button
          onClick={() => {
            setEditingId(null);
            setForm({ title: "", description: "", link: "" });
            setModalOpen(true);
          }}
          className="admin-btn-primary"
        >
          + Add Reading
        </button>
      </div>

      <div className="space-y-4">
        {list.map((item, index) => (
          <div key={item._id} className="admin-surface-card">
            <h3 className="font-semibold text-white">{index + 1}. {item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-brand underline-offset-2 transition hover:underline"
            >
              {item.link}
            </a>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setEditingId(item._id);
                  setForm(item);
                  setModalOpen(true);
                }}
                className="admin-btn-edit"
              >
                Edit
              </button>

              <button
                onClick={() => del(item._id)}
                className="admin-btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-panel">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              {editingId ? "Edit Reading" : "Add Reading"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              className="admin-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              placeholder="Description"
              rows={4}
              className="admin-input resize-y"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Link URL"
              className="admin-input"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />

            <div className="flex justify-between gap-3 pt-2">
              <button
                onClick={() => setModalOpen(false)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={save}
                className="admin-btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
