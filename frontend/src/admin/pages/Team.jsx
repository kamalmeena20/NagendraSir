

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

  // upload state to prevent saving before upload completes
  const [uploading, setUploading] = useState(false);

  // -----------------------
  // Load Data
  // -----------------------
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
    // console.log("TEAM DATA:", members);
  }, [members]);

  // -----------------------
  // Image Upload
  // -----------------------
  const uploadTeamImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      // console.log("No file selected");
      return;
    }

    // console.log("Selected File:", file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      // console.log("TOKEN:", token);

      const res = await api.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("UPLOAD RESULT:", res.data);
      // console.log("IMAGE URL RECEIVED:", res.data.url);

      // set the returned url into the form
      setForm((prev) => ({ ...prev, imageUrl: res.data.url }));
    } catch (err) {
      console.error("UPLOAD FAILED:", err.response?.data || err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // -----------------------
  // Open Add/Edit Modal
  // -----------------------
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

  // -----------------------
  // Save (Add / Edit)
  // -----------------------
  const saveMember = async () => {
    try {
      if (uploading) {
        alert("Image is still uploading. Please wait a moment and then save.");
        return;
      }

      // debug log: what's being sent
      console.log("FORM BEFORE SENDING:", form);

      let dataToSend = { ...form };

      if (editId) {
        // Get old member data
        const old = members.find((m) => m._id === editId);

        // If user did NOT upload a new image -> keep old imageUrl
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
      // small delay is optional but can help UI consistency
      await loadTeam();
    } catch (err) {
      console.error("SAVE FAILED:", err.response?.data || err);
      alert("Save failed");
    }
  };

  // -----------------------
  // Delete
  // -----------------------
  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await api.delete(`/team/delete/${id}`);
      loadTeam();
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-[#009E66]">Team Members</h1>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-[#009E66] text-white rounded-lg hover:bg-[#007a4f]"
        >
          + Add Member
        </button>
      </div>

      {/* TEAM LIST */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <div
            key={m._id}
            className="p-4 transition bg-white border rounded-lg shadow hover:shadow-lg"
          >
            <img
              src={m.imageUrl || undefined}
              alt={m.name || "profile"}
              className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#009E66]"
            />

            <h3 className="mt-3 text-xl font-semibold text-center">{m.name}</h3>

            {/* ROLE */}
            {m.role && (
              <p className="text-center text-gray-600">{m.role}</p>
            )}

            {/* DEPARTMENT */}
            {m.department && (
              <p className="text-sm text-center text-gray-500">
                Department: {m.department}
              </p>
            )}

            {/* EMAIL */}
            {m.email && (
              <p className="text-sm text-center text-gray-500">
                Email: {m.email}
              </p>
            )}

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => openEditModal(m)}
                className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => deleteMember(m._id)}
                className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="p-6 space-y-4 bg-white rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-[#009E66]">
              {editId ? "Edit Member" : "Add Member"}
            </h2>

            <input
              className="w-full p-2 border rounded"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="w-full p-2 border rounded"
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="Department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />

            <input
              className="w-full p-2 border rounded"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />


            {/* FILE UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={uploadTeamImage}
              className="w-full p-2 border rounded"
            />

            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="preview"
                className="w-20 h-20 mt-2 mx-auto rounded-full border border-[#009E66]"
              />
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveMember}
                disabled={uploading}
                className={`px-3 py-1 text-white rounded ${uploading ? "bg-gray-400 cursor-not-allowed" : "bg-[#009E66] hover:bg-[#007a4f]"
                  }`}
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
