import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import api from "../../api/api";
import AddAcademicActivityModal from "../components/AddAcademicActivityModal";

export default function AcademicActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const loadActivities = async () => {
    try {
      const res = await api.get("/academic-activities");
      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const deleteActivity = async (id) => {
    if (!window.confirm("Delete this activity?")) return;

    try {
      await api.delete(`/academic-activities/${id}`);
      loadActivities();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const editActivity = (activity) => {
    setSelectedActivity(activity);
    setOpenModal(true);
  };

  const addActivity = () => {
    setSelectedActivity(null);
    setOpenModal(true);
  };

  if (loading) return <div className="py-10 text-sm font-medium text-white/50">Loading...</div>;

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <h1 className="admin-page-title">
          Academic Activities
        </h1>

        <button
          onClick={addActivity}
          className="admin-btn-primary"
        >
          <Plus size={18} />
          Add Activity
        </button>

      </div>

      <div className="overflow-hidden overflow-x-auto rounded-2xl border border-white/10 bg-black/35 shadow-soft backdrop-blur-md">

        <table className="w-full text-sm">

          <thead className="bg-brand text-white">

            <tr>

              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Title</th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Type</th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Organizer</th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Venue</th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Start Date</th>
              <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider">Actions</th>

            </tr>

          </thead>

          <tbody className="divide-y divide-white/10">

            {activities.map((item) => (

              <tr
                key={item._id}
                className="transition hover:bg-white/5"
              >

                <td className="px-4 py-3.5 font-medium text-white">{item.title}</td>

                <td className="px-4 py-3.5 text-white/70">{item.type}</td>

                <td className="px-4 py-3.5 text-white/70">{item.organizer}</td>

                <td className="px-4 py-3.5 text-white/70">{item.venue}</td>

                <td className="px-4 py-3.5 text-white/70">
                  {new Date(item.startDate).toLocaleDateString()}
                </td>

                <td className="px-4 py-3.5">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => editActivity(item)}
                      className="rounded-lg p-1.5 text-sky-600 transition hover:bg-sky-50"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteActivity(item._id)}
                      className="rounded-lg p-1.5 text-rose-600 transition hover:bg-rose-50"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <AddAcademicActivityModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          loadActivities();
        }}
        activity={selectedActivity}
      />

    </div>
  );
}
