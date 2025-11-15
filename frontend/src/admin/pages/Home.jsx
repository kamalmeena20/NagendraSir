import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    heroImage: "",
    secondImage: ""
  });

  // Load existing home content
  const loadData = async () => {
    try {
      const res = await api.get("/home");

      if (res.data) {
        setData({
          title: res.data.title || "",
          description: res.data.description || "",
          heroImage: res.data.heroImage || "",
          secondImage: res.data.secondImage || ""
        });
      }

    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Upload image to Cloudinary
  const uploadImage = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    const res = await api.post("/upload/image", fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setData(prev => ({ ...prev, [field]: res.data.url }));
  };

  // Save Home Content
  const saveData = async () => {
    setSaving(true);
    try {
      await api.post("/home/save", data);
      alert("Home content updated!");
    } catch (err) {
      console.log(err);
      alert("Save failed!");
    }
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-semibold text-[#009E66]">Home Page Content</h1>

      <input
        className="w-full p-2 border rounded"
        placeholder="Home Title"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <textarea
        className="w-full h-32 p-2 border rounded"
        placeholder="Home Description"
        value={data.description}
        onChange={(e) =>
          setData({ ...data, description: e.target.value })
        }
      />

      {/* Hero Image Upload */}
      <label className="block font-semibold">Hero Image</label>
      <input type="file" onChange={(e) => uploadImage(e, "heroImage")} />
      {data.heroImage && (
        <img src={data.heroImage} className="object-cover w-40 h-40 mt-2" alt="hero" />
      )}

      {/* Second Image Upload */}
      <label className="block mt-4 font-semibold">Second Image</label>
      <input type="file" onChange={(e) => uploadImage(e, "secondImage")} />
      {data.secondImage && (
        <img src={data.secondImage} className="object-cover w-40 h-40 mt-2" alt="second" />
      )}

      <button
        onClick={saveData}
        className="px-4 py-2 bg-[#009E66] text-white rounded"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
