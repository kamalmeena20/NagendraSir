import React from "react";

export default function Logo() {
  return (
    <div className="flex flex-col items-center mt-2 mb-6">
      <div className="flex items-center justify-center w-20 h-20 border-2 border-white rounded-full">
        <span className="text-2xl font-semibold text-white">N</span>
      </div>
      <p className="mt-2 text-lg font-light tracking-wide text-white">
        Nagendra Kumar
      </p>
    </div>
  );
}
