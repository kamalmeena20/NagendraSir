export default function PhysicsBackground() {
  return (
    <div className="physics-bg" aria-hidden="true">
      <div className="physics-bg__glow physics-bg__glow--a" />
      <div className="physics-bg__glow physics-bg__glow--b" />
      <div className="physics-bg__glow physics-bg__glow--c" />

      <svg className="physics-bg__fields" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path className="field-line fl-1" d="M-50 120 C 200 40, 400 220, 650 140 S 1000 40, 1250 160" />
        <path className="field-line fl-2" d="M-50 260 C 180 180, 420 340, 680 250 S 980 180, 1250 300" />
        <path className="field-line fl-3" d="M-50 420 C 220 360, 450 520, 700 430 S 1020 360, 1250 470" />
        <path className="field-line fl-4" d="M-50 580 C 240 520, 480 680, 740 590 S 1040 520, 1250 640" />
        <path className="field-line fl-5" d="M-50 720 C 260 680, 500 780, 760 720 S 1060 680, 1250 760" />
      </svg>

      <div className="physics-bg__particles">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={`spark spark-${i + 1}`} />
        ))}
      </div>

      <div className="physics-bg__grid" />
    </div>
  );
}
