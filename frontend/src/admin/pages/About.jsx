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

  if (loading) return <div className="py-10 text-sm font-medium text-white/50">Loading...</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="admin-page-title">
        About Page Content
      </h1>

      <div className="admin-card space-y-5">
      <input
        className="admin-input"
        placeholder="Heading or Title"
        value={data.instituteName}
        onChange={(e) =>
          setData({ ...data, instituteName: e.target.value })
        }
      />

      <textarea
        className="admin-input h-32 resize-y"
        placeholder="About Description"
        value={data.description}
        onChange={(e) =>
          setData({ ...data, description: e.target.value })
        }
      />

      <div>
        <label className="admin-label">Image</label>
        <input type="file" onChange={uploadImage} className="block w-full text-sm text-white/55 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand-100" />

        {data.image && (
          <img
            src={data.image}
            className="mt-3 h-40 w-40 rounded-xl object-cover shadow-soft ring-1 ring-white/15"
            alt="about"
          />
        )}
      </div>

      <button
        onClick={saveData}
        className="admin-btn-primary"
      >
        {saving ? "Saving..." : "Save"}
      </button>
      </div>
    </div>
  );
}
