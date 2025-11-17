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

  // Load all
const loadData = async () => {
  try {
    const res = await api.get("/career");
    setList(res.data);
  } catch (err) {
    console.log("LOAD ERROR:", err);
  }
};

// Save or Update
const save = async () => {
  try {
    if (editingId) {
      await api.put(`/career/${editingId}`, form); // FIXED update (we create update)
    } else {
      await api.post("/career", form); // FIXED (no /add)
    }

    setModalOpen(false);
    setEditingId(null);
    loadData();
  } catch (err) {
    alert("Error saving!");
  }
};

// Delete
const del = async (id) => {
  if (!window.confirm("Delete this item?")) return;
  await api.delete(`/career/${id}`); // FIXED (no /delete)
  loadData();
};


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#009E66]">Career</h1>

      <button
        onClick={() => {
          setEditingId(null);
          setForm({ category: "", title: "", description: "" });
          setModalOpen(true);
        }}
        className="px-4 py-2 bg-[#009E66] text-white rounded"
      >
        + Add Career
      </button>

      <div className="space-y-6">
        {list.map((item) => (
          <div key={item._id} className="p-5 bg-white rounded shadow">
            <p className="font-bold text-[#009E66]">
              {categories.find((c) => c.value === item.category)?.label}
            </p>

            <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
            <p className="mt-1 text-gray-700">{item.description}</p>

            <div className="flex gap-3 mt-4">
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
                className="px-3 py-1 text-white bg-blue-600 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => del(item._id)}
                className="px-3 py-1 text-white bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Career" : "Add Career"}
            </h2>

            <select
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={save}
                className="px-4 py-2 text-white bg-green-600 rounded"
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
