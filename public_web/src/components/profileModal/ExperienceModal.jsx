export default function ExperienceModal({ open, onClose, mainColor, experience = [] }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl p-6 md:p-10 relative flex flex-col">

        {/* TITLE */}
        <div className="flex justify-center w-full mb-6 md:mb-10">
          <h2
            className="px-6 py-2 text-xl font-semibold text-center border-2 md:px-10 md:py-3 md:text-2xl"
            style={{ borderColor: mainColor, color: mainColor }}
          >
            Professional Experience
          </h2>
        </div>

        {/* CLOSE */}
        <button
          className="absolute text-2xl top-4 right-4 md:top-6 md:right-6"
          style={{ color: mainColor }}
          onClick={onClose}
        >
          ✕
        </button>

        {/* CONTENT */}
        <div className="space-y-4 text-base md:text-lg">
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