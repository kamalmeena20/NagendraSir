import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white shadow-md">
      <h2 className="text-xl font-semibold text-[#009E66]"></h2>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-[#009E66] text-white rounded-lg hover:bg-[#007a4f]"
      >
        Logout
      </button>
    </div>
  );
}
