import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    publications: 0,
    team: 0,
    collaborators: 0,
    gallery: 0,
  });

  // Load all counts
  const loadCounts = async () => {
    try {
      const pub = await api.get("/publications");
      const team = await api.get("/team");
      const collab = await api.get("/collaborators");
      const gallery = await api.get("/gallery");

      setCounts({
        publications: pub.data.length,
        team: team.data.length,
        collaborators: collab.data.length,
        gallery: gallery.data.length,
      });

    } catch (err) {
      console.error("Count load error:", err);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-semibold text-[#009E66]">
        Dashboard
      </h1>

      {/* TOP SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

        {/* Publications */}
        <div
          onClick={() => navigate("/admin/publications")}
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer border-t-4 border-[#009E66]"
        >
          <h3 className="text-xl font-semibold text-gray-800">Publications</h3>
          <p className="text-4xl font-bold text-[#009E66] mt-2">
            {counts.publications}
          </p>
          <p className="mt-1 text-sm text-gray-500">Total Research Papers</p>
        </div>

        {/* Team Members */}
        <div
          onClick={() => navigate("/admin/team")}
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer border-t-4 border-[#009E66]"
        >
          <h3 className="text-xl font-semibold text-gray-800">Team Members</h3>
          <p className="text-4xl font-bold text-[#009E66] mt-2">
            {counts.team}
          </p>
          <p className="mt-1 text-sm text-gray-500">Active Members</p>
        </div>

        {/* Collaborators */}
        <div
          onClick={() => navigate("/admin/collaborators")}
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer border-t-4 border-[#009E66]"
        >
          <h3 className="text-xl font-semibold text-gray-800">Collaborators</h3>
          <p className="text-4xl font-bold text-[#009E66] mt-2">
            {counts.collaborators}
          </p>
          <p className="mt-1 text-sm text-gray-500">Institutes Connected</p>
        </div>

        {/* Gallery */}
        <div
          onClick={() => navigate("/admin/gallery")}
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer border-t-4 border-[#009E66]"
        >
          <h3 className="text-xl font-semibold text-gray-800">Gallery</h3>
          <p className="text-4xl font-bold text-[#009E66] mt-2">
            {counts.gallery}
          </p>
          <p className="mt-1 text-sm text-gray-500">Uploaded Images</p>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-2xl font-semibold text-[#009E66] mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Update Profile */}
          <div
            onClick={() => navigate("/admin/profile")}
            className="flex items-center gap-4 p-6 transition bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg"
          >
            <div className="w-14 h-14 rounded-full bg-[#009E66] text-white flex items-center justify-center text-2xl font-bold">
              P
            </div>
            <div>
              <h3 className="text-xl font-semibold">Update Profile</h3>
              <p className="text-sm text-gray-500">Modify your personal details</p>
            </div>
          </div>

          {/* Add Publication */}
          <div
            onClick={() => navigate("/admin/publications")}
            className="flex items-center gap-4 p-6 transition bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg"
          >
            <div className="w-14 h-14 rounded-full bg-[#009E66] text-white flex items-center justify-center text-2xl font-bold">
              R
            </div>
            <div>
              <h3 className="text-xl font-semibold">Add Publication</h3>
              <p className="text-sm text-gray-500">Add new research papers</p>
            </div>
          </div>

          {/* Manage Team */}
          <div
            onClick={() => navigate("/admin/team")}
            className="flex items-center gap-4 p-6 transition bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg"
          >
            <div className="w-14 h-14 rounded-full bg-[#009E66] text-white flex items-center justify-center text-2xl font-bold">
              T
            </div>
            <div>
              <h3 className="text-xl font-semibold">Manage Team</h3>
              <p className="text-sm text-gray-500">Add or update team members</p>
            </div>
          </div>

          {/* Upload Gallery */}
          <div
            onClick={() => navigate("/admin/gallery")}
            className="flex items-center gap-4 p-6 transition bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg"
          >
            <div className="w-14 h-14 rounded-full bg-[#009E66] text-white flex items-center justify-center text-2xl font-bold">
              G
            </div>
            <div>
              <h3 className="text-xl font-semibold">Upload Gallery Images</h3>
              <p className="text-sm text-gray-500">Add event photographs</p>
            </div>
          </div>

        </div>    
      </div>

    </div>
  );
}
