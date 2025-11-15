

// import { useEffect, useState } from "react";
// import api from "../../api/api";

// export default function Readings() {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [form, setForm] = useState({
//     title: "",
//     link: "",
//     description: "",
//   });

//   // ---------- Load Readings ----------
//   const loadReadings = async () => {
//     try {
//       const res = await api.get("/readings");
//       setList(res.data || []);
//     } catch (err) {
//       console.error("Load error:", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadReadings();
//   }, []);

//   // ---------- Add Modal ----------
//   const openAdd = () => {
//     setForm({ title: "", link: "", description: "" });
//     setEditId(null);
//     setShowModal(true);
//   };

//   // ---------- Edit Modal ----------
//   const openEdit = (item) => {
//     setForm({
//       title: item.title,
//       link: item.link,
//       description: item.description,
//     });
//     setEditId(item._id);
//     setShowModal(true);
//   };

//   // ---------- Save ----------
//   const saveReading = async () => {
//     try {
//       if (editId) {
//         await api.put(`/readings/update/${editId}`, form);
//       } else {
//         await api.post("/readings/add", {
//           title: form.title,
//           description: form.description,
//           linkUrl: form.link   // <-- FIX
//         });

//       }

//       setShowModal(false);
//       loadReadings();
//     } catch (err) {
//       alert("Save failed!");
//     }
//   };

//   // ---------- Delete ----------
//   const deleteReading = async (id) => {
//     if (!window.confirm("Delete this reading?")) return;

//     try {
//       await api.delete(`/readings/delete/${id}`);
//       loadReadings();
//     } catch (err) {
//       alert("Delete failed!");
//     }
//   };

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between">
//         <h1 className="text-3xl font-semibold text-[#009E66]">Readings</h1>

//         <button
//           onClick={openAdd}
//           className="px-4 py-2 bg-[#009E66] text-white rounded-lg hover:bg-[#007a4f]"
//         >
//           + Add Reading
//         </button>
//       </div>

//       {/* LIST */}
//       <div className="space-y-4">
//         {list.map((r) => (
//           <div key={r._id} className="p-4 bg-white rounded-lg shadow">
//             <h2 className="text-xl font-semibold">{r.title}</h2>

//             <p className="mt-1 text-gray-700">{r.description}</p>

//             <a
//               href={r.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block mt-2 text-blue-600 underline"
//             >
//               Open Reading
//             </a>


//             <div className="flex gap-3 mt-3">
//               <button
//                 onClick={() => openEdit(r)}
//                 className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => deleteReading(r._id)}
//                 className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40">
//           <div className="p-6 space-y-4 bg-white rounded-lg shadow w-96">

//             <h2 className="text-xl font-semibold text-[#009E66]">
//               {editId ? "Edit Reading" : "Add Reading"}
//             </h2>

//             <input
//               className="w-full p-2 border rounded"
//               placeholder="Title"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />

//             <input
//               className="w-full p-2 border rounded"
//               placeholder="Link / PDF URL"
//               value={form.link}
//               onChange={(e) => setForm({ ...form, link: e.target.value })}
//             />

//             <textarea
//               className="w-full h-24 p-2 border rounded"
//               placeholder="Short Description"
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-3 py-1 bg-gray-300 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={saveReading}
//                 className="px-3 py-1 bg-[#009E66] text-white rounded hover:bg-[#007a4f]"
//               >
//                 Save
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Readings() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
  });

  // Load readings
  const loadReadings = async () => {
    try {
      const res = await api.get("/readings");
      setList(res.data || []);
    } catch (err) {
      console.error("Load error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReadings();
  }, []);

  // Add Modal
  const openAdd = () => {
    setForm({ title: "", description: "", link: "" });
    setEditId(null);
    setShowModal(true);
  };

  // Edit Modal
  const openEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      link: item.linkUrl,   // correct field
    });
    setEditId(item._id);
    setShowModal(true);
  };

  // Save
  const saveReading = async () => {
    try {
      const payload = {
        title: form.title,
        description: form.description,
        linkUrl: form.link,    // correct payload
      };

      if (editId) {
        await api.put(`/readings/update/${editId}`, payload);
      } else {
        await api.post("/readings/add", payload);
      }

      setShowModal(false);
      loadReadings();
    } catch (err) {
      alert("Save failed!");
    }
  };

  // Delete
  const deleteReading = async (id) => {
    if (!window.confirm("Delete this reading?")) return;
    await api.delete(`/readings/delete/${id}`);
    loadReadings();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-[#009E66]">Readings</h1>

        <button
          onClick={openAdd}
          className="px-4 py-2 bg-[#009E66] text-white rounded-lg hover:bg-[#007a4f]"
        >
          + Add Reading
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {list.map((r) => (
          <div key={r._id} className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold">{r.title}</h2>

            <p className="mt-1 text-gray-700">{r.description}</p>

            <a
              href={r.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 font-semibold text-[#009E66] border border-1 w-fit p-1 border-[#009e66] "
            >
              Open Reading
            </a>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => openEdit(r)}
                className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => deleteReading(r._id)}
                className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="p-6 space-y-4 bg-white rounded-lg shadow w-96">

            <h2 className="text-xl font-semibold text-[#009E66]">
              {editId ? "Edit Reading" : "Add Reading"}
            </h2>

            <input
              className="w-full p-2 border rounded"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              className="w-full h-24 p-2 border rounded"
              placeholder="Short Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <input
              className="w-full p-2 border rounded"
              placeholder="Reading Link"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveReading}
                className="px-3 py-1 bg-[#009E66] text-white rounded hover:bg-[#007a4f]"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
