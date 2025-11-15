import React from "react";

export default function AddPublicationModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-xl">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#009E66] mb-4">
          Add New Publication
        </h2>

        {/* Form */}
        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#009E66]"
              placeholder="Enter publication title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Authors</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#009E66]"
              placeholder="Author names"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Year</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#009E66]"
              placeholder="Year of publication"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Thumbnail URL</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#009E66]"
              placeholder="Image URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Paper Link URL</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#009E66]"
              placeholder="PDF or website link"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Citation</label>
            <textarea
              rows={3}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#009E66]"
              placeholder="Enter citation"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Order Index</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#009E66]"
              placeholder="Sorting order"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-800 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-[#009E66] text-white rounded-lg hover:bg-[#007a4f]"
          >
            Save Publication
          </button>
        </div>

      </div>
    </div>
  );
}
