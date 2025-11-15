// src/admin/components/StatCard.jsx
export default function StatCard({ title, value, icon }) {
  return (
    <div className="flex items-center gap-4 p-5 bg-white border shadow-sm rounded-xl">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#E9F7F1] text-[#009E66] text-xl">
        {icon ?? "📄"}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-[#009E66]">{value}</p>
      </div>
    </div>
  );
}
