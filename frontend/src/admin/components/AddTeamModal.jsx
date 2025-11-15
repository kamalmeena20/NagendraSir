export default function AddTeamModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-xl">

        <h2 className="text-2xl font-semibold text-[#009E66] mb-4">
          Add Team Member
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-[#009E66]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Profession</label>
            <input
              type="text"
              placeholder="PhD Student / Professor / etc."
              className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-[#009E66]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Department</label>
            <input
              type="text"
              placeholder="Department name"
              className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-[#009E66]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-[#009E66]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Image URL</label>
            <input
              type="text"
              placeholder="Profile image URL"
              className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-[#009E66]"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-[#009E66] text-white rounded-lg hover:bg-[#007a4f]"
          >
            Save Member
          </button>
        </div>

      </div>
    </div>
  );
}
