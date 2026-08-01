import React from "react";

export default function AddPublicationModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="admin-modal-overlay">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0c1a14] p-6 shadow-elev">

        {/* Title */}
        <h2 className="mb-5 text-2xl font-semibold tracking-tight text-brand">
          Add New Publication
        </h2>

        {/* Form */}
        <div className="space-y-4">

          <div>
            <label className="admin-label">Title</label>
            <input
              type="text"
              className="admin-input"
              placeholder="Enter publication title"
            />
          </div>

          <div>
            <label className="admin-label">Authors</label>
            <input
              type="text"
              className="admin-input"
              placeholder="Author names"
            />
          </div>

          <div>
            <label className="admin-label">Year</label>
            <input
              type="number"
              className="admin-input"
              placeholder="Year of publication"
            />
          </div>

          <div>
            <label className="admin-label">Thumbnail URL</label>
            <input
              type="text"
              className="admin-input"
              placeholder="Image URL"
            />
          </div>

          <div>
            <label className="admin-label">Paper Link URL</label>
            <input
              type="text"
              className="admin-input"
              placeholder="PDF or website link"
            />
          </div>

          <div>
            <label className="admin-label">Citation</label>
            <textarea
              rows={3}
              className="admin-input resize-y"
              placeholder="Enter citation"
            ></textarea>
          </div>

          <div>
            <label className="admin-label">Order Index</label>
            <input
              type="number"
              className="admin-input"
              placeholder="Sorting order"
            />
          </div>

        </div>

        {/* Buttons */}
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
            Save Publication
          </button>
        </div>

      </div>
    </div>
  );
}
