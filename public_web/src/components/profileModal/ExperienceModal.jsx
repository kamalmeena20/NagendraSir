export default function ExperienceModal({ open, onClose, mainColor, experience = [] }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/30">
      <div className="bg-white w-[60%] rounded-3xl shadow-2xl p-10 relative flex flex-col">

        {/* TITLE */}
        <div className="flex justify-center w-full mb-10">
          <h2
            className="px-10 py-3 text-2xl font-semibold text-center border-2 "
            style={{ borderColor: mainColor, color: mainColor }}
          >
            Professional Experience
          </h2>
        </div>

        {/* CLOSE */}
        <button
          className="absolute text-2xl top-6 right-6"
          style={{ color: mainColor }}
          onClick={onClose}
        >
          ✕
        </button>

        {/* CONTENT */}
        <div className="space-y-4 text-lg">
          {experience.length === 0 && <p>No experience added.</p>}

          {experience.map((item, index) => (
            <p key={index} className="text-gray-800">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
