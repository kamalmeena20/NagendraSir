import { useEffect, useState } from "react";
import api from "../../api/api";

export default function About() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState({
    description: "",
    instituteName: "",
    image: ""
  });

  // Load existing about content
  const loadData = async () => {
    try {
      const res = await api.get("/about");

      if (res.data) {
        setData({
          instituteName: res.data.instituteName || "",
          description: res.data.description || "",
          image: res.data.image || ""
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

  // useEffect(() => {
  //   console.log("🔥 ABOUT PAGE DATA STORED:", data);
  // }, [data]);
  
  // Upload image via cloudinary
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    const res = await api.post("/upload/image", fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setData(prev => ({ ...prev, image: res.data.url }));
  };

  const saveData = async () => {
    setSaving(true);
    try {
      await api.post("/about/save", data);
      alert("About updated!");
    } catch (err) {
      console.log(err);
      alert("Save failed!");
    }
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#009E66]">
        About Page Content
      </h1>

      <input
        className="w-full p-2 border rounded"
        placeholder="Heading or Title"
        value={data.instituteName}
        onChange={(e) =>
          setData({ ...data, instituteName: e.target.value })
        }
      />

      <textarea
        className="w-full h-32 p-2 border rounded"
        placeholder="About Description"
        value={data.description}
        onChange={(e) =>
          setData({ ...data, description: e.target.value })
        }
      />

      <label className="block font-semibold">Image</label>
      <input type="file" onChange={uploadImage} />

      {data.image && (
        <img
          src={data.image}
          className="object-cover w-40 h-40 mt-2"
          alt="about"
        />
      )}

      <button
        onClick={saveData}
        className="px-4 py-2 bg-[#009E66] text-white rounded"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
