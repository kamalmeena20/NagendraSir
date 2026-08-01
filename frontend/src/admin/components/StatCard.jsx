// src/admin/components/StatCard.jsx
export default function StatCard({ title, value, icon }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/35 p-5 shadow-soft backdrop-blur-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/20 text-xl text-brand">
        {icon ?? "📄"}
      </div>
      <div>
        <p className="text-sm text-white/55">{title}</p>
        <p className="text-2xl font-bold tracking-tight text-brand">{value}</p>
      </div>
    </div>
  );
}
