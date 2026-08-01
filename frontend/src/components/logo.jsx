import React from "react";

export default function Logo() {
  return (
    <div className="mb-8 mt-2 flex flex-col items-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 shadow-sm backdrop-blur-sm transition duration-300 hover:scale-[1.03]">
        <span className="text-2xl font-semibold tracking-wide text-white">N</span>
      </div>
      <p className="mt-3 text-base font-light tracking-[0.12em] text-white/95">
        Nagendra Kumar
      </p>
    </div>
  );
}
