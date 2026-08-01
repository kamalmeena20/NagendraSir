import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-20 flex w-full items-center justify-between border-b border-white/10 bg-[#06281d]/95 px-5 py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-md sm:px-6">
      <h2 className="text-lg font-semibold tracking-tight text-white">
        Admin Panel
      </h2>

      <button
        onClick={handleLogout}
        className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2 focus:ring-offset-[#06281d]"
      >
        Logout
      </button>
    </header>
  );
}
