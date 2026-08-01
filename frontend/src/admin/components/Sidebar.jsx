import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Home", path: "/admin/home" },
  { name: "About", path: "/admin/about" },
  { name: "Profile", path: "/admin/profile" },
  { name: "Team", path: "/admin/team" },
  { name: "Publications", path: "/admin/publications" },
  { name: "Career", path: "/admin/career" },
  { name: " General Reading", path: "/admin/readings" },
  { name: "Gallery", path: "/admin/gallery" },
  { name: "Contact", path: "/admin/contact" },
  { name: "Collaborators", path: "/admin/collaborators" },
  { name: "Academic Activities", path: "/admin/academic-activities" },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-brand-700/30 bg-gradient-to-b from-brand to-brand-700 text-white lg:w-64">
      <div className="border-b border-white/10 px-5 py-6">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-sm font-bold tracking-wide backdrop-blur-sm">
          NK
        </div>
        <h2 className="text-lg font-semibold tracking-tight">Admin Nagendra</h2>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menuItems.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block rounded-xl px-3.5 py-2.5 text-sm font-medium transition duration-200 ${
                active
                  ? "bg-white text-brand shadow-sm"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
