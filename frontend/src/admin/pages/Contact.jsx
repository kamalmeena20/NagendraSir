
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

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#009E66]">Contact Info</h1>

      <div className="p-6 space-y-4 bg-white rounded-lg shadow">

        {/* PHOTO UPLOAD */}
        <div>
          <label className="font-semibold">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={uploadContactImage}
            className="w-full p-2 border rounded"
          />

          <img
            src={data.photoUrl || "https://via.placeholder.com/120"}
            className="w-32 h-32 mt-3 rounded-full border-2 border-[#009E66] object-cover"
            alt="loading"
          />

          {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
        </div>

        {/* NAME */}
        <div>
          <label className="font-semibold">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* PROFESSION */}
        <div>
          <label className="font-semibold">Profession</label>
          <input
            type="text"
            value={data.profession}
            onChange={(e) => setData({ ...data, profession: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* DEPARTMENT */}
        <div>
          <label className="font-semibold">Department</label>
          <input
            type="text"
            value={data.department}
            onChange={(e) => setData({ ...data, department: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* EMAILS */}
        <div>
          <label className="font-semibold">Primary Email</label>
          <input
            type="text"
            value={data.emailPrimary}
            onChange={(e) => setData({ ...data, emailPrimary: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Secondary Email</label>
          <input
            type="text"
            value={data.emailSecondary}
            onChange={(e) => setData({ ...data, emailSecondary: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label className="font-semibold">Address Line 1</label>
          <input
            type="text"
            value={data.addressLine1}
            onChange={(e) =>
              setData({ ...data, addressLine1: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">City</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">State</label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => setData({ ...data, state: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Pincode</label>
          <input
            type="text"
            value={data.pincode}
            onChange={(e) => setData({ ...data, pincode: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Landmark</label>
          <input
            type="text"
            value={data.landmark}
            onChange={(e) => setData({ ...data, landmark: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveContact}
          className="px-4 py-2 bg-[#009E66] text-white rounded-lg hover:bg-[#007a4f]"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

