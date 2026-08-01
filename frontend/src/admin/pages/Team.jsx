
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    imageUrl: "",
    department: "",
    email: "",

  });


  const [uploading, setUploading] = useState(false);


  const loadTeam = async () => {
    try {
      const res = await api.get("/team");
      setMembers(res.data || []);
    } catch (err) {
      console.error("Team load error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTeam();
  }, []);

  useEffect(() => {
  }, [members]);

const uploadTeamImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    setUploading(true);

    const res = await api.post("/upload/image", formData);

    setForm((prev) => ({ ...prev, imageUrl: res.data.url }));

  } catch (err) {
    console.error("UPLOAD FAILED:", err.response?.data || err);
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};

  const openAddModal = () => {
setForm({
  name: "",
  role: "",
  imageUrl: "",
  department: "",
  email: "",
});
    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (member) => {
    setForm({
      name: member.name || "",
      role: member.role || "",
      imageUrl: member.imageUrl || "",
      department: member.department || "",
      email: member.email || "",
    });
    setEditId(member._id);
    setShowModal(true);
  };
  const saveMember = async () => {
    try {
      if (uploading) {
        alert("Image is still uploading. Please wait a moment and then save.");
        return;
      }

      console.log("FORM BEFORE SENDING:", form);

      let dataToSend = { ...form };

      if (editId) {
    
        const old = members.find((m) => m._id === editId);
        if ((!form.imageUrl || form.imageUrl === "") && old?.imageUrl) {
          dataToSend.imageUrl = old.imageUrl;
        }
      }

      console.log("FORM SENDING TO BACKEND:", dataToSend);

      if (editId) {
        await api.put(`/team/update/${editId}`, dataToSend);
      } else {
        await api.post("/team/add", dataToSend);
      }

      setShowModal(false);
      await loadTeam();
    } catch (err) {
      console.error("SAVE FAILED:", err.response?.data || err);
      alert("Save failed");
    }
  };
  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await api.delete(`/team/delete/${id}`);
      loadTeam();
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <div className="py-10 text-sm font-medium text-white/50">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="admin-page-title">Team Members</h1>

        <button
          onClick={openAddModal}
          className="admin-btn-primary"
        >
          + Add Member
        </button>
      </div>

   
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <div
            key={m._id}
            className="admin-surface-card"
          >
            <img
              src={m.imageUrl || undefined}
              alt={m.name || "profile"}
              className="mx-auto h-24 w-24 rounded-full object-cover shadow-soft ring-2 ring-brand/25"
            />

            <h3 className="mt-4 text-center text-lg font-semibold text-white">{m.name}</h3>

            {/* ROLE */}
            {m.role && (
              <p className="mt-1 text-center text-sm text-white/70">{m.role}</p>
            )}

            {/* DEPARTMENT */}
            {m.department && (
              <p className="mt-1 text-center text-xs text-white/55">
                Department: {m.department}
              </p>
            )}

            {/* EMAIL */}
            {m.email && (
              <p className="mt-1 text-center text-xs text-white/55">
                Email: {m.email}
              </p>
            )}

            <div className="mt-5 flex justify-center gap-2">
              <button
                onClick={() => openEditModal(m)}
                className="admin-btn-edit"
              >
                Edit
              </button>

              <button
                onClick={() => deleteMember(m._id)}
                className="admin-btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-panel">
        
             <div className="flex items-center justify-between">

               <h2 className="text-xl font-semibold tracking-tight text-brand">
              {editId ? "Edit Member" : "Add Member"}
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
              className="admin-input"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="admin-input"
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
            <input
              className="admin-input"
              placeholder="Department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />

            <input
              className="admin-input"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />


            {/* FILE UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={uploadTeamImage}
              className="block w-full text-sm text-white/55 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand-100"
            />

            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="preview"
                className="mx-auto mt-1 h-20 w-20 rounded-full object-cover shadow-soft ring-2 ring-brand/25"
              />
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={saveMember}
                disabled={uploading}
                className="admin-btn-primary"
              >
                {uploading ? "Uploading..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
