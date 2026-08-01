export default function AddTeamModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="admin-modal-overlay">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0c1a14] p-6 shadow-elev">

        <h2 className="mb-5 text-2xl font-semibold tracking-tight text-brand">
          Add Team Member
        </h2>

        <div className="space-y-4">

          <div>
            <label className="admin-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Profession</label>
            <input
              type="text"
              placeholder="PhD Student / Professor / etc."
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Department</label>
            <input
              type="text"
              placeholder="Department name"
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Email</label>
            <input
              type="email"
              placeholder="Email address"
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Image URL</label>
            <input
              type="text"
              placeholder="Profile image URL"
              className="admin-input"
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="admin-btn-secondary"
          >
            Cancel
          </button>

          <button
            className="admin-btn-primary"
          >
            Save Member
          </button>
        </div>

      </div>
    </div>
  );
}
