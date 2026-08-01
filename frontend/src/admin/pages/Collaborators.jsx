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
    hindiInstituteName: "",
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

  // Upload logo
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
    } catch (err) {
      console.error("LOGO UPLOAD FAILED", err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // SAVE
  const save = async () => {
    if (uploading) return alert("Logo is uploading...");

    const payload = {
      logoUrl: form.logoUrl,
      instituteName: form.instituteName,
      hindiInstituteName: form.hindiInstituteName,
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

  // DELETE
  const del = async (id) => {
    if (!window.confirm("Delete this institute?")) return;
    await api.delete(`/collaborators/delete/${id}`);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="admin-page-title">Collaborators</h1>

        <button
          onClick={() => {
            setEditingId(null);
            setForm({
              logoUrl: "",
              instituteName: "",
              hindiInstituteName: "",
              collaborators: "",
              orderIndex: 0,
            });
            setModalOpen(true);
          }}
          className="admin-btn-primary"
        >
          + Add Collaborator
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {list.map((inst) => (
          <div key={inst._id} className="admin-surface-card">
            <img
              src={inst.logoUrl}
              className="mx-auto h-24 w-24 object-contain"
              alt="loading"
            />

            <h2 className="mt-4 text-center text-xl font-bold text-white">
              {inst.instituteName}
            </h2>

            {inst.hindiInstituteName && (
              <p className="mt-1 text-center text-base text-white/70">
                {inst.hindiInstituteName}
              </p>
            )}

            <ul className="mt-3 ml-5 list-disc text-sm text-white/70">
              {inst.collaborators.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>

            <p className="mt-3 text-xs text-white/40">
              Order: {inst.orderIndex}
            </p>

            <div className="mt-4 flex justify-center gap-2">
              <button
                className="admin-btn-edit"
                onClick={() => {
                  setEditingId(inst._id);
                  setForm({
                    logoUrl: inst.logoUrl,
                    instituteName: inst.instituteName,
                    hindiInstituteName: inst.hindiInstituteName,
                    collaborators: inst.collaborators.join(", "),
                    orderIndex: inst.orderIndex,
                  });
                  setModalOpen(true);
                }}
              >
                Edit
              </button>

              <button
                className="admin-btn-danger"
                onClick={() => del(inst._id)}
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
              {editingId ? "Edit Institute" : "Add Institute"}
            </h2>

            {/* LOGO UPLOAD */}
            <input type="file" accept="image/*" onChange={uploadLogo} className="block w-full text-sm text-white/55 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand-100" />
            {form.logoUrl && (
              <img
                src={form.logoUrl}
                className="mx-auto mt-1 h-20 w-20 rounded-xl object-contain shadow-soft ring-1 ring-white/15"
                alt="loading"
              />
            )}

            <input
              className="admin-input"
              placeholder="Institute Name (English)"
              value={form.instituteName}
              onChange={(e) =>
                setForm({ ...form, instituteName: e.target.value })
              }
            />

            <input
              className="admin-input"
              placeholder="Institute Name (Hindi)"
              value={form.hindiInstituteName}
              onChange={(e) =>
                setForm({ ...form, hindiInstituteName: e.target.value })
              }
            />

            <textarea
              className="admin-input resize-y"
              placeholder="Collaborators (comma separated)"
              value={form.collaborators}
              onChange={(e) =>
                setForm({ ...form, collaborators: e.target.value })
              }
            />

            <input
              type="number"
              className="admin-input"
              placeholder="Order Index"
              value={form.orderIndex}
              onChange={(e) =>
                setForm({ ...form, orderIndex: e.target.value })
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
