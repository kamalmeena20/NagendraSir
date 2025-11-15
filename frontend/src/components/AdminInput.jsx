export default function AdminInput({ label, ...props }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ display: "block", fontWeight: 600 }}>{label}</label>
      <input
        {...props}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          marginTop: "4px"
        }}
      />
    </div>
  );
}
