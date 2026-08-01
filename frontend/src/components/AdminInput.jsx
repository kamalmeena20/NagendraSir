export default function AdminInput({ label, ...props }) {
  return (
    <div className="mb-3">
      <label className="admin-label">{label}</label>
      <input {...props} className="admin-input" />
    </div>
  );
}
