import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Collaborators() {
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    logoUrl: "",
    instituteName: "",
    collaborators: "",
    orderIndex: 0,
  });

  // Load institutes
  const loadData = async () => {
    const res = await api.get("/collaborators");
    setList(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // -------------------------------
  // IMAGE UPLOAD (Cloudinary)
  // -------------------------------
  const uploadLogo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    try {
      setUploading(true);

      const res = await api.post("/upload/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm((prev) => ({ ...prev, logoUrl: res.data.url }));
      alert("Logo uploaded!");

    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // Save or Update
  const save = async () => {
    if (uploading) {
      alert("Logo is still uploading...");
      return;
    }

    const payload = {
      logoUrl: form.logoUrl,
      instituteName: form.instituteName,
      collaborators: form.collaborators.split(",").map((c) => c.trim()),
      orderIndex: Number(form.orderIndex),
    };

    if (editingId) {
      await api.put(`/collaborators/update/${editingId}`, payload);
    } else {
      await api.post("/collaborators/add", payload);
    }

    setModalOpen(false);
    setEditingId(null);
    loadData();
  };

  // Delete
  const del = async (id) => {
    if (!window.confirm("Delete institute?")) return;

    await api.delete(`/collaborators/delete/${id}`);
    loadData();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#009E66]">Collaborators</h1>

      {/* ADD BTN */}
      <button
        onClick={() => {
          setEditingId(null);
          setForm({
            logoUrl: "",
            instituteName: "",
            collaborators: "",
            orderIndex: 0,
          });
          setModalOpen(true);
        }}
        className="px-4 py-2 bg-[#009E66] text-white rounded-lg hover:bg-[#007a4f]"
      >
        + Add Collaborator
      </button>

      {/* LIST */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {list.map((item) => (
          <div key={item._id} className="p-5 bg-white rounded shadow">
            <img
              src={item.logoUrl || "https://via.placeholder.com/100"}
              alt="logo"
              className="object-contain w-24 h-24 mx-auto"
            />

            <h2 className="mt-3 text-xl font-bold text-center">
              {item.instituteName}
            </h2>

            <div className="mt-2 text-sm text-gray-600">
              <strong>Collaborators:</strong>
              <ul className="mt-1 ml-5 list-disc">
                {item.collaborators.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Order: {item.orderIndex}
            </p>

            <div className="flex justify-center gap-3 mt-4">
              <button
                className="px-3 py-1 text-white bg-blue-600 rounded"
                onClick={() => {
                  setEditingId(item._id);
                  setForm({
                    logoUrl: item.logoUrl,
                    instituteName: item.instituteName,
                    collaborators: item.collaborators.join(", "),
                    orderIndex: item.orderIndex,
                  });
                  setModalOpen(true);
                }}
              >
                Edit
              </button>

              <button
                className="px-3 py-1 text-white bg-red-600 rounded"
                onClick={() => del(item._id)}
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
          <div className="w-full max-w-md p-5 space-y-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Institute" : "Add Institute"}
            </h2>

            {/* Logo Upload */}
            <div>
              <label className="font-semibold">Upload Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={uploadLogo}
                className="w-full p-2 border rounded"
              />

              {form.logoUrl && (
                <img
                  src={form.logoUrl}
                  alt="preview"
                  className="w-20 h-20 mt-2 mx-auto rounded border border-[#009E66]"
                />
              )}
            </div>

            <input
              placeholder="Institute Name"
              className="w-full p-2 border rounded"
              value={form.instituteName}
              onChange={(e) =>
                setForm({ ...form, instituteName: e.target.value })
              }
            />

            <textarea
              placeholder="Collaborators (comma separated)"
              className="w-full p-2 border rounded"
              value={form.collaborators}
              onChange={(e) =>
                setForm({ ...form, collaborators: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Order Index"
              className="w-full p-2 border rounded"
              value={form.orderIndex}
              onChange={(e) =>
                setForm({ ...form, orderIndex: e.target.value })
              }
            />

            <div className="flex justify-between gap-3 pt-3">
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
