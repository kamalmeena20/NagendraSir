import { useEffect, useState } from "react";
import api from "../../api/api";

const initialState = {
    title: "",
    type: "",
    role: "",
    organizer: "",
    venue: "",
    country: "",
    startDate: "",
    endDate: "",
    description: "",
    image: "",
    orderIndex: 0,
  };
export default function AddAcademicActivityModal({
  open,
  onClose,
  activity,
}) {
  

  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activity) {
      setForm({
        title: activity.title || "",
        type: activity.type || "",
        role: activity.role || "",
        organizer: activity.organizer || "",
        venue: activity.venue || "",
        country: activity.country || "",
        startDate: activity.startDate
          ? activity.startDate.substring(0, 10)
          : "",
        endDate: activity.endDate
          ? activity.endDate.substring(0, 10)
          : "",
        description: activity.description || "",
        image: activity.image || "",
        orderIndex: activity.orderIndex || 0,
      });
    } else {
      setForm(initialState);
    }
  }, [activity]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = new FormData();
      data.append("image", file);

      const res = await api.post("/upload/image", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setForm((prev) => ({
        ...prev,
        image: res.data.url,
      }));
    } catch (err) {
      console.log(err);
      alert("Image Upload Failed");
      console.log("========== UPLOAD ERROR ==========");
      console.log(err);
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
      console.log("==================================");
      alert("Image Upload Failed");
    }
  };

  const saveActivity = async () => {
    if (!form.title) return alert("Title Required");
    if (!form.type) return alert("Type Required");
    if (!form.startDate) return alert("Start Date Required");

    try {
      setSaving(true);

      if (activity) {
        await api.put(
          `/academic-activities/${activity._id}`,
          form
        );
      } else {
        await api.post(
          "/academic-activities",
          form
        );
      }

      onClose();
    } catch (err) {
      console.log(err);
      alert("Save Failed");
    }

    setSaving(false);
  };

  return (
    <div className="admin-modal-overlay">

      <div className="relative w-full max-w-3xl max-h-[95vh] space-y-4 overflow-y-auto rounded-2xl border border-white/10 bg-[#0c1a14] p-6 shadow-elev">

        <h2 className="text-2xl font-semibold tracking-tight text-brand">

          {activity
            ? "Edit Academic Activity"
            : "Add Academic Activity"}

        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div>
            <label className="admin-label">Title *</label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="admin-input"
            />
          </div>

          <div>

            <label className="admin-label">Type *</label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="admin-input"
            >
              <option value="">Select</option>

              <option>Conference</option>
              <option>Workshop</option>
              <option>Seminar</option>
              <option>Invited Talk</option>
              <option>Guest Lecture</option>
              <option>Symposium</option>
              <option>Faculty Development Program</option>
              <option>Webinar</option>
              <option>Other</option>

            </select>

          </div>

          <div>

            <label className="admin-label">Role</label>

            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              className="admin-input"
            />

          </div>

          <div>

            <label className="admin-label">Organizer</label>

            <input
              name="organizer"
              value={form.organizer}
              onChange={handleChange}
              className="admin-input"
            />

          </div>

          <div>

            <label className="admin-label">Venue</label>

            <input
              name="venue"
              value={form.venue}
              onChange={handleChange}
              className="admin-input"
            />

          </div>

          <div>

            <label className="admin-label">Country</label>

            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              className="admin-input"
            />

          </div>

          <div>

            <label className="admin-label">Start Date *</label>

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="admin-input"
            />

          </div>

          <div>

            <label className="admin-label">End Date</label>

            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="admin-input"
            />

          </div>

          <div className="sm:col-span-2">

            <label className="admin-label">Description</label>

            <textarea
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="resize-y admin-input"
            />

          </div>

          <div>

            <label className="admin-label">Image</label>

            <input
              type="file"
              onChange={uploadImage}
              className="block w-full mt-1 text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand-100"
            />

          </div>

          <div>

            <label className="admin-label">Order Index</label>

            <input
              type="number"
              name="orderIndex"
              value={form.orderIndex}
              onChange={handleChange}
              className="admin-input"
            />

          </div>

        </div>

        {form.image && (

          <img
            src={form.image}
            alt=""
            className="object-cover h-40 mt-2 border rounded-xl border-slate-200 shadow-soft"
          />

        )}

        <div className="flex justify-end gap-3 pt-4">

          <button
            onClick={onClose}
            className="admin-btn-secondary"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={saveActivity}
            className="admin-btn-primary"
          >
            {saving
              ? "Saving..."
              : activity
                ? "Update Activity"
                : "Save Activity"}
          </button>

        </div>

      </div>

    </div>
  );
}
