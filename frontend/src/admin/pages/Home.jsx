import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // const [data, setData] = useState({
  //   title: "",
  //   description: "",
  //   heroImage: "",
  //   secondImage: ""
  // });
  const [data, setData] = useState({
    description: "",
    heroImage: "",
    secondImage: ""
  });

  // Load existing home content
  const loadData = async () => {
    try {
      const res = await api.get("/home");

      if (res.data) {
        // setData({
        //   title: res.data.title || "",
        //   description: res.data.description || "",
        //   heroImage: res.data.heroImage || "",
        //   secondImage: res.data.secondImage || ""
        // });
        setData({
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

  if (loading) return <div className="py-10 text-sm font-medium text-white/50">Loading...</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      <h1 className="admin-page-title">Home Page Content</h1>

      <div className="admin-card space-y-6">

      {/* <input
        className="w-full p-2 border rounded"
        placeholder="Home Title"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      /> */}

      {/* <textarea
        className="w-full h-32 p-2 border rounded"
        placeholder="Home Description"
        value={data.description}
        onChange={(e) =>
          setData({ ...data, description: e.target.value })
        }
      /> */}
      <textarea
        className="admin-input h-40 resize-y"
        placeholder="Please Enter Your Home Description here..."
        value={data.description}
        onChange={(e) =>
          setData({ ...data, description: e.target.value })
        }
      />

      {/* Hero Image Upload */}
      <div>
        <label className="admin-label">Hero Image</label>
        <input type="file" onChange={(e) => uploadImage(e, "heroImage")} className="block w-full text-sm text-white/55 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand-100" />
        {data.heroImage && (
          <img src={data.heroImage} className="mt-3 h-40 w-40 rounded-xl object-cover shadow-soft ring-1 ring-white/15" alt="hero" />
        )}
      </div>

      {/* Second Image Upload */}
      <div>
        <label className="admin-label">Second Image</label>
        <input type="file" onChange={(e) => uploadImage(e, "secondImage")} className="block w-full text-sm text-white/55 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand-100" />
        {data.secondImage && (
          <img src={data.secondImage} className="mt-3 h-40 w-40 rounded-xl object-cover shadow-soft ring-1 ring-white/15" alt="second" />
        )}
      </div>

      <button
        onClick={saveData}
        className="admin-btn-primary"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
      </div>
    </div>
  );
}
