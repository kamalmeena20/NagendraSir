import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Contact() {
  const [data, setData] = useState({
    photoUrl: "",
    name: "",
    profession: "",
    department: "",
    emailPrimary: "",
    emailSecondary: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
    landmark: ""
  });

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // -----------------------
  // Load Data
  // -----------------------
  const loadContact = async () => {
    try {
      const res = await api.get("/contact");
      if (res.data) {
        setData((prev) => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.error("Load error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadContact();
  }, []);

  // -----------------------
  // Upload Image to Cloudinary + Auto Save
  // -----------------------
  const uploadContactImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      // 1️⃣ Upload to cloudinary
      const res = await api.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedUrl = res.data.url;

      // 2️⃣ Update UI
      setData((prev) => ({ ...prev, photoUrl: uploadedUrl }));

      // 3️⃣ Auto save in DB
      await api.post("/contact/save", {
        ...data,
        photoUrl: uploadedUrl,
      });

      alert("Photo updated successfully!");

    } catch (err) {
      console.error("UPLOAD FAILED:", err);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // -----------------------
  // Save all text fields
  // -----------------------
  const saveContact = async () => {
    setSaving(true);
    try {
      await api.post("/contact/save", data);
      alert("Contact Info Updated Successfully!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save!");
    }
    setSaving(false);
  };

  if (loading) return <div className="py-10 text-sm font-medium text-white/50">Loading...</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="admin-page-title">Contact Info</h1>

      <div className="admin-card space-y-5">

        {/* PHOTO UPLOAD */}
        <div>
          <label className="admin-label">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={uploadContactImage}
            className="block w-full text-sm text-white/55 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand-100"
          />

          <img
            src={data.photoUrl || "https://via.placeholder.com/120"}
            className="mt-4 h-32 w-32 rounded-full object-cover shadow-soft ring-2 ring-brand/30"
            alt="loading"
          />

          {uploading && <p className="mt-2 text-sm font-medium text-sky-600">Uploading...</p>}
        </div>

        {/* NAME */}
        <div>
          <label className="admin-label">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="admin-input"
          />
        </div>

        {/* PROFESSION */}
        <div>
          <label className="admin-label">Profession</label>
          <input
            type="text"
            value={data.profession}
            onChange={(e) => setData({ ...data, profession: e.target.value })}
            className="admin-input"
          />
        </div>

        {/* DEPARTMENT */}
        <div>
          <label className="admin-label">Department</label>
          <input
            type="text"
            value={data.department}
            onChange={(e) => setData({ ...data, department: e.target.value })}
            className="admin-input"
          />
        </div>

        {/* EMAILS */}
        <div>
          <label className="admin-label">Primary Email</label>
          <input
            type="text"
            value={data.emailPrimary}
            onChange={(e) => setData({ ...data, emailPrimary: e.target.value })}
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label">Secondary Email</label>
          <input
            type="text"
            value={data.emailSecondary}
            onChange={(e) => setData({ ...data, emailSecondary: e.target.value })}
            className="admin-input"
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label className="admin-label">Address Line 1</label>
          <input
            type="text"
            value={data.addressLine1}
            onChange={(e) =>
              setData({ ...data, addressLine1: e.target.value })
            }
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label">City</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label">State</label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => setData({ ...data, state: e.target.value })}
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label">Pincode</label>
          <input
            type="text"
            value={data.pincode}
            onChange={(e) => setData({ ...data, pincode: e.target.value })}
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label">Landmark</label>
          <input
            type="text"
            value={data.landmark}
            onChange={(e) => setData({ ...data, landmark: e.target.value })}
            className="admin-input"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveContact}
          className="admin-btn-primary"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
