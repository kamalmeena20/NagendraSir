
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Home", path: "/admin/home" },            // <-- Added
  { name: "About", path: "/admin/about" },          // <-- Added
  { name: "Profile", path: "/admin/profile" },
  { name: "Team", path: "/admin/team" },
  { name: "Publications", path: "/admin/publications" },
  { name: "Gallery", path: "/admin/gallery" },
  { name: "Readings", path: "/admin/readings" },
  { name: "Contact", path: "/admin/contact" },
  { name: "Collaborators", path: "/admin/collaborators" },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="w-64 bg-[#009E66] text-white flex flex-col p-6">

      <h2 className="mb-8 text-2xl font-semibold">Admin Nagendra</h2>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded-lg text-lg 
              ${pathname === item.path ? "bg-white text-[#009E66]" : "text-white hover:bg-white/20"}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

    </div>
  );
}
