import { motion, AnimatePresence } from "framer-motion";

export default function RecognitionModal({ open, onClose, mainColor, recognition = [] }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl p-6 md:p-10 relative"
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >

            {/* TITLE */}
            <div className="flex justify-center w-full mb-6 md:mb-10">
              <h2
                className="px-6 py-2 text-xl font-semibold text-center border-2 md:px-10 md:py-3 md:text-2xl"
                style={{ borderColor: mainColor, color: mainColor }}
              >
                Recognition
              </h2>
            </div>

            {/* CLOSE BUTTON */}
            <button
              className="absolute text-2xl transition top-4 right-4 md:top-6 md:right-6 hover:scale-110"
              style={{ color: mainColor }}
              onClick={onClose}
            >
              ✕
            </button>

            {/* CONTENT */}
            <div className="space-y-4 text-base md:text-lg">
              {recognition.length === 0 && <p>No recognitions added.</p>}

              {recognition.map((item, index) => (
                <div key={index} className="flex gap-3 text-gray-800">
                  <span className="text-xl md:text-2xl" style={{ color: mainColor }}>•</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
