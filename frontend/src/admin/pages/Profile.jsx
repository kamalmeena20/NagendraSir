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

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#009E66]">Profile</h1>

      <div className="p-6 space-y-4 bg-white rounded-lg shadow">

        {/* Image Upload */}
        <div>
          <label className="font-semibold">Profile Image</label>
          <input type="file" accept="image/*" onChange={uploadImage} className="w-full p-2 border rounded" />
          <img src={data.profileImage || "https://via.placeholder.com/150"} className="w-32 h-32 mt-3 rounded-full border-2 border-[#009E66] object-cover" alt="profile" />
        </div>

        {/* Name */}
        <div>
          <label className="font-semibold">Name</label>
          <input type="text" className="w-full p-2 border rounded" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        </div>

        {/* Designation */}
        <div>
          <label className="font-semibold">Designation</label>
          <input type="text" className="w-full p-2 border rounded" value={data.designation} onChange={(e) => setData({ ...data, designation: e.target.value })} />
        </div>

        {/* Department */}
        <div>
          <label className="font-semibold">Department</label>
          <input type="text" className="w-full p-2 border rounded" value={data.department} onChange={(e) => setData({ ...data, department: e.target.value })} />
        </div>

        {/* Institute */}
        <div>
          <label className="font-semibold">Institute</label>
          <input type="text" className="w-full p-2 border rounded" value={data.institute} onChange={(e) => setData({ ...data, institute: e.target.value })} />
        </div>

        {/* Biography */}
        <div>
          <label className="font-semibold">Biography</label>
          <textarea className="w-full h-32 p-2 border rounded" value={data.biography} onChange={(e) => setData({ ...data, biography: e.target.value })} />
        </div>

        {/* Education */}
        <div>
          <label className="font-semibold">Education (comma separated)</label>
          <input className="w-full p-2 border rounded" value={data.education.join(", ")} onChange={(e) => setData({ ...data, education: e.target.value.split(",") })} />
        </div>

        {/* Professional Experience */}
        <div>
          <label className="font-semibold">Professional Experience (comma separated)</label>
          <input className="w-full p-2 border rounded" value={data.professionalExperience.join(", ")} onChange={(e) => setData({ ...data, professionalExperience: e.target.value.split(",") })} />
        </div>

        {/* Teaching */}
        <div>
          <label className="font-semibold">Teaching (comma separated)</label>
          <input className="w-full p-2 border rounded" value={data.teaching.join(", ")} onChange={(e) => setData({ ...data, teaching: e.target.value.split(",") })} />
        </div>

        {/* Recognition */}
        <div>
          <label className="font-semibold">Recognition (comma separated)</label>
          <input className="w-full p-2 border rounded" value={data.recognition.join(", ")} onChange={(e) => setData({ ...data, recognition: e.target.value.split(",") })} />
        </div>

        <button onClick={saveProfile} className="px-4 py-2 bg-[#009E66] text-white rounded-lg hover:bg-[#007a4f]" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
