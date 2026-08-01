import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Profile() {
  const [data, setData] = useState({
    profileImage: "",
    name: "",
    designation: "",
    department: "",
    institute: "",
    biography: "",
    professionalExperience: [],
    education: [],
    teaching: [],
    recognition: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ---------- Upload Image ----------
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const profileImage = res.data.url;

      setData((prev) => ({ ...prev, profileImage }));

      await api.post("/profile/save", { ...data, profileImage });

      alert("Image saved!");
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Upload failed");
    }
  };

  // ---------- Load Profile ----------
  const loadProfile = async () => {
    try {
      const res = await api.get("/profile");
      if (res.data?.data) {
        const p = res.data.data;

        setData({
          profileImage: p.profileImage || "",
          name: p.name || "",
          designation: p.designation || "",
          department: p.department || "",
          institute: p.institute || "",
          biography: p.biography || "",
          professionalExperience: p.professionalExperience || [],
          education: p.education || [],
          teaching: p.teaching || [],
          recognition: p.recognition || [],
        });
      }
    } catch (err) {
      console.error("Profile load error:", err);
    }
    setLoading(false);
  };

  // ---------- Save Profile ----------
  const saveProfile = async () => {
    setSaving(true);

    try {
      await api.post("/profile/save", data);
      alert("Profile Updated!");
    } catch (err) {
      console.error("Profile save error:", err);
      alert("Failed to save profile");
    }

    setSaving(false);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) return <div className="py-10 text-sm font-medium text-white/50">Loading...</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="admin-page-title">Profile</h1>

      <div className="admin-card space-y-5">

        {/* Image Upload */}
        <div>
          <label className="admin-label">Profile Image</label>
          <input type="file" accept="image/*" onChange={uploadImage} className="block w-full text-sm text-white/55 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand-100" />
          <img src={data.profileImage || "https://via.placeholder.com/150"} className="mt-4 h-32 w-32 rounded-full object-cover shadow-soft ring-2 ring-brand/30" alt="profile" />
        </div>

        {/* Name */}
        <div>
          <label className="admin-label">Name</label>
          <input type="text" className="admin-input" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        </div>

        {/* Designation */}
        <div>
          <label className="admin-label">Designation</label>
          <input type="text" className="admin-input" value={data.designation} onChange={(e) => setData({ ...data, designation: e.target.value })} />
        </div>

        {/* Department */}
        <div>
          <label className="admin-label">Department</label>
          <input type="text" className="admin-input" value={data.department} onChange={(e) => setData({ ...data, department: e.target.value })} />
        </div>

        {/* Institute */}
        <div>
          <label className="admin-label">Institute</label>
          <input type="text" className="admin-input" value={data.institute} onChange={(e) => setData({ ...data, institute: e.target.value })} />
        </div>

        {/* Biography */}
        <div>
          <label className="admin-label">Biography</label>
          <textarea className="admin-input h-32 resize-y" value={data.biography} onChange={(e) => setData({ ...data, biography: e.target.value })} />
        </div>

        {/* Education */}
        <div>
          <label className="admin-label">Education (comma separated)</label>
          <input className="admin-input" value={data.education.join(", ")} onChange={(e) => setData({ ...data, education: e.target.value.split(",") })} />
        </div>

        {/* Professional Experience */}
        <div>
          <label className="admin-label">Professional Experience (comma separated)</label>
          <input className="admin-input" value={data.professionalExperience.join(", ")} onChange={(e) => setData({ ...data, professionalExperience: e.target.value.split(",") })} />
        </div>

        {/* Teaching */}
        <div>
          <label className="admin-label">Teaching (comma separated)</label>
          <input className="admin-input" value={data.teaching.join(", ")} onChange={(e) => setData({ ...data, teaching: e.target.value.split(",") })} />
        </div>

        {/* Recognition */}
        <div>
          <label className="admin-label">Recognition (comma separated)</label>
          <input className="admin-input" value={data.recognition.join(", ")} onChange={(e) => setData({ ...data, recognition: e.target.value.split(",") })} />
        </div>

        <button onClick={saveProfile} className="admin-btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
