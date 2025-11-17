import { useEffect, useState } from "react";
import api from "../../api/api";

export default function AdminGeneralReadings() {
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
      <h1 className="text-3xl font-semibold text-[#009E66]">General Readings</h1>

      <button
        onClick={() => {
          setEditingId(null);
          setForm({ title: "", description: "", link: "" });
          setModalOpen(true);
        }}
        className="px-4 py-2 bg-[#009E66] text-white rounded"
      >
        + Add Reading
      </button>

      <div className="space-y-6">
        {list.map((item, index) => (
          <div key={item._id} className="p-4 bg-white border rounded shadow">
            <h3 className="font-bold">{index + 1}. {item.title}</h3>
            <p className="mt-2">{item.description}</p>

            <a
              href={item.link}
              target="_blank"
              className="inline-block mt-3 text-blue-600 underline"

            >
              {item.link}
            </a>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setEditingId(item._id);
                  setForm(item);
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

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-md p-6 space-y-3 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Reading" : "Add Reading"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              placeholder="Description"
              rows={4}
              className="w-full p-2 border rounded"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Link URL"
              className="w-full p-2 border rounded"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
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
