import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Career() {
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
  });

  const categories = [
    { value: "phd", label: "Ph.D. Positions" },
    { value: "pdrf", label: "Post Doctoral Research Fellow (PDRF)" },
    { value: "btech_mtech", label: "BTech - MTech Project" },
    { value: "internship", label: "Internship Opportunities" },
  ];

  // Load data from backend
  const loadData = async () => {
    try {
      const res = await api.get("/career");
      setList(res.data);
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  };

  // VERY IMPORTANT: Load data on first render
  useEffect(() => {
    loadData();
  }, []);

  // Save or Update
  const save = async () => {
    try {
      if (editingId) {
        await api.put(`/career/${editingId}`, form);
      } else {
        await api.post("/career", form);
      }

      setModalOpen(false);
      setEditingId(null);
      loadData();
    } catch (err) {
      alert("Error saving!");
    }
  };

  // Delete item
  const del = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await api.delete(`/career/${id}`);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="admin-page-title">Career</h1>

        <button
          onClick={() => {
            setEditingId(null);
            setForm({ category: "", title: "", description: "" });
            setModalOpen(true);
          }}
          className="admin-btn-primary"
        >
          + Add Career
        </button>
      </div>

      <div className="space-y-4">
        {list.map((item) => (
          <div key={item._id} className="admin-surface-card">
            <p className="text-sm font-semibold text-brand">
              {categories.find((c) => c.value === item.category)?.label}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-white/70">{item.description}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setEditingId(item._id);
                  setForm({
                    category: item.category,
                    title: item.title,
                    description: item.description,
                  });
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

      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-panel">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              {editingId ? "Edit Career" : "Add Career"}
            </h2>

            <select
              className="admin-input"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Title"
              className="admin-input"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              className="admin-input resize-y"
              rows={4}
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
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
