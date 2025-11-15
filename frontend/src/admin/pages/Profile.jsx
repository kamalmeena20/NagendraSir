
// import { useEffect, useState } from "react";
// import api from "../../api/api";

// export default function Profile() {
//   const [data, setData] = useState({
//     name: "",
//     designation: "",
//     imageUrl: "",
//     shortBio: "",
//     longBio: "",
//     experience: [],
//     teaching: [],
//     education: [],
//     recognition: []
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const uploadImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await api.post("/upload/image", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setData({ ...data, imageUrl: res.data.url });

//       alert("Image uploaded!");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     }
//   };

//   // ---------- LOAD PROFILE ----------
//   const loadProfile = async () => {
//     try {
//       const res = await api.get("/profile");
//       if (res.data) {
//         setData({
//           name: res.data.name || "",
//           designation: res.data.designation || "",
//           imageUrl: res.data.imageUrl || "",
//           shortBio: res.data.shortBio || "",
//           longBio: res.data.longBio || "",
//           experience: res.data.experience || [],
//           teaching: res.data.teaching || [],
//           education: res.data.education || [],
//           recognition: res.data.recognition || [],
//         });
//       }
//     } catch (err) {
//       console.error("Profile load error:", err);
//     }
//     setLoading(false);
//   };

//   // ---------- SAVE PROFILE ----------
//   const saveProfile = async () => {
//     setSaving(true);

//     try {
//       await api.post("/profile/save", data); // 🔥 NO headers needed
//       alert("Profile Updated Successfully!");
//     } catch (err) {
//       console.error("Profile save error:", err);
//       alert("Failed to save!");
//     }

//     setSaving(false);
//   };

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-semibold text-[#009E66]">Profile</h1>

//       <div className="p-6 space-y-4 bg-white rounded-lg shadow">

//         {/* ---------- IMAGE URL INPUT ---------- */}
//         <div>
//           <label className="font-semibold">Upload your Profile Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={uploadImage}
//             className="w-full p-2 border rounded"
//           />


//           <img
//             src={data.imageUrl || "https://via.placeholder.com/150"}
//             className="w-32 h-32 mt-3 rounded-full border-2 border-[#009E66] object-cover"
//             alt=""
//           />
//         </div>

//         {/* ---------- NAME ---------- */}
//         <div>
//           <label className="font-semibold">Name</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={data.name}
//             onChange={(e) => setData({ ...data, name: e.target.value })}
//           />
//         </div>

//         {/* ---------- DESIGNATION ---------- */}
//         <div>
//           <label className="font-semibold">Designation</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={data.designation}
//             onChange={(e) => setData({ ...data, designation: e.target.value })}
//           />
//         </div>

//         {/* ---------- SHORT BIO ---------- */}
//         <div>
//           <label className="font-semibold">Short Bio</label>
//           <textarea
//             className="w-full h-24 p-2 border rounded"
//             value={data.shortBio}
//             onChange={(e) => setData({ ...data, shortBio: e.target.value })}
//           />
//         </div>

//         {/* ---------- LONG BIO ---------- */}
//         <div>
//           <label className="font-semibold">Detailed Bio</label>
//           <textarea
//             className="w-full h-32 p-2 border rounded"
//             value={data.longBio}
//             onChange={(e) => setData({ ...data, longBio: e.target.value })}
//           />
//         </div>

//         {/* ---------- EDUCATION ---------- */}
//         <div>
//           <label className="font-semibold">Education (comma separated)</label>
//           <input
//             className="w-full p-2 border rounded"
//             value={data.education.join(", ")}
//             onChange={(e) =>
//               setData({ ...data, education: e.target.value.split(",") })
//             }
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Experience (comma separated)</label>
//           <input
//             className="w-full p-2 border rounded"
//             value={data.experience.join(", ")}
//             onChange={(e) =>
//               setData({ ...data, experience: e.target.value.split(",") })
//             }
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Teaching (comma separated)</label>
//           <input
//             className="w-full p-2 border rounded"
//             value={data.teaching.join(", ")}
//             onChange={(e) =>
//               setData({ ...data, teaching: e.target.value.split(",") })
//             }
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Recognition (comma separated)</label>
//           <input
//             className="w-full p-2 border rounded"
//             value={data.recognition.join(", ")}
//             onChange={(e) =>
//               setData({ ...data, recognition: e.target.value.split(",") })
//             }
//           />
//         </div>

//         {/* ---------- SAVE BUTTON ---------- */}
//         <button
//           onClick={saveProfile}
//           className="px-4 py-2 bg-[#009E66] text-white rounded-lg hover:bg-[#007a4f]"
//           disabled={saving}
//         >
//           {saving ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Profile() {
  const [data, setData] = useState({
    name: "",
    designation: "",
    imageUrl: "",
    shortBio: "",
    longBio: "",
    experience: [],
    teaching: [],
    education: [],
    recognition: []
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ---------- Upload Image ----------
  // const uploadImage = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const res = await api.post("/upload/image", formData, {
  //       headers: { "Content-Type": "multipart/form-data" }
  //     });

  //     setData({ ...data, imageUrl: res.data.url });
  //     alert("Image uploaded!");
  //   } catch (err) {
  //     console.error("UPLOAD FAILED:", err);
  //     alert("Image upload failed");
  //   }
  // };

const uploadImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    // 1 - Upload to cloudinary
    const res = await api.post("/upload/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const imageUrl = res.data.url;

    // 2 - Update UI instantly
    setData((prev) => ({ ...prev, imageUrl }));

    // 3 - Immediately save to MongoDB (NO BUTTON NEEDED)
    await api.post("/profile/save", {
      ...data,
      imageUrl: imageUrl,
    });

    alert("Image saved successfully!");
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    alert("Upload failed!");
  }
};


  // ---------- Load Profile ----------
  const loadProfile = async () => {
    try {
      const res = await api.get("/profile");
      if (res.data) {
        setData({
          name: res.data.name || "",
          designation: res.data.designation || "",
          imageUrl: res.data.imageUrl || "",
          shortBio: res.data.shortBio || "",
          longBio: res.data.longBio || "",
          experience: res.data.experience || [],
          teaching: res.data.teaching || [],
          education: res.data.education || [],
          recognition: res.data.recognition || []
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
      alert("Profile Updated Successfully!");
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
          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="w-full p-2 border rounded"
          />

          <img
            src={data.imageUrl || "https://via.placeholder.com/150"}
            className="w-32 h-32 mt-3 rounded-full border-2 border-[#009E66] object-cover"
            alt="profile"
          />
        </div>

        {/* Name */}
        <div>
          <label className="font-semibold">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>

        {/* Designation */}
        <div>
          <label className="font-semibold">Designation</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={data.designation}
            onChange={(e) => setData({ ...data, designation: e.target.value })}
          />
        </div>

        {/* Short Bio */}
        <div>
          <label className="font-semibold">Short Bio</label>
          <textarea
            className="w-full h-24 p-2 border rounded"
            value={data.shortBio}
            onChange={(e) => setData({ ...data, shortBio: e.target.value })}
          />
        </div>

        {/* Detailed Bio */}
        <div>
          <label className="font-semibold">Detailed Bio</label>
          <textarea
            className="w-full h-32 p-2 border rounded"
            value={data.longBio}
            onChange={(e) => setData({ ...data, longBio: e.target.value })}
          />
        </div>

        {/* Education */}
        <div>
          <label className="font-semibold">Education (comma separated)</label>
          <input
            className="w-full p-2 border rounded"
            value={data.education.join(", ")}
            onChange={(e) =>
              setData({ ...data, education: e.target.value.split(",") })
            }
          />
        </div>

        {/* Experience */}
        <div>
          <label className="font-semibold">Experience (comma separated)</label>
          <input
            className="w-full p-2 border rounded"
            value={data.experience.join(", ")}
            onChange={(e) =>
              setData({ ...data, experience: e.target.value.split(",") })
            }
          />
        </div>

        {/* Teaching */}
        <div>
          <label className="font-semibold">Teaching (comma separated)</label>
          <input
            className="w-full p-2 border rounded"
            value={data.teaching.join(", ")}
            onChange={(e) =>
              setData({ ...data, teaching: e.target.value.split(",") })
            }
          />
        </div>

        {/* Recognition */}
        <div>
          <label className="font-semibold">Recognition (comma separated)</label>
          <input
            className="w-full p-2 border rounded"
            value={data.recognition.join(", ")}
            onChange={(e) =>
              setData({ ...data, recognition: e.target.value.split(",") })
            }
          />
        </div>

        <button
          onClick={saveProfile}
          className="px-4 py-2 bg-[#009E66] text-white rounded-lg hover:bg-[#007a4f]"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
