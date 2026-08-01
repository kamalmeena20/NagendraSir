import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  Handshake,
  Images,
  UserRound,
  FilePlus2,
  UserCog,
  ImagePlus,
} from "lucide-react";
import api from "../../api/api";

const chartColors = {
  publications: "#009E66",
  team: "#34D399",
  collaborators: "#10B981",
  gallery: "#6EE7B7",
};

function DonutChart({ segments, total }) {
  const size = 180;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  if (total === 0) {
    return (
      <div className="relative mx-auto flex h-[180px] w-[180px] items-center justify-center">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={stroke}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tracking-tight text-white">0</span>
          <span className="text-xs font-medium text-white/50">Total</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex h-[180px] w-[180px] items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        {segments.map((seg) => {
          const length = (seg.value / total) * circumference;
          const dashOffset = -offset;
          offset += length;
          return (
            <circle
              key={seg.key}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
              className="transition-all duration-700 ease-out"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tracking-tight text-white">{total}</span>
        <span className="text-xs font-medium text-white/50">Total Items</span>
      </div>
    </div>
  );
}

function BarChart({ items, max }) {
  return (
    <div className="flex h-52 items-end justify-between gap-3 px-2 pt-4 sm:gap-5">
      {items.map((item) => {
        const heightPct = max > 0 ? (item.value / max) * 100 : 0;
        return (
          <div key={item.key} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-sm font-semibold text-white/90">{item.value}</span>
            <div className="relative flex h-36 w-full max-w-[56px] items-end overflow-hidden rounded-t-xl bg-white/10">
              <div
                className="w-full rounded-t-xl transition-all duration-700 ease-out"
                style={{
                  height: `${Math.max(heightPct, item.value > 0 ? 8 : 0)}%`,
                  background: `linear-gradient(180deg, ${item.color} 0%, #064E3B 100%)`,
                  boxShadow: `0 0 18px ${item.color}55`,
                }}
              />
            </div>
            <span className="text-center text-[11px] font-medium leading-tight text-white/55 sm:text-xs">
              {item.short}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    publications: 0,
    team: 0,
    collaborators: 0,
    gallery: 0,
  });

  // Load all counts
  const loadCounts = async () => {
    try {
      const pub = await api.get("/publications");
      const team = await api.get("/team");
      const collab = await api.get("/collaborators");
      const gallery = await api.get("/gallery");

      setCounts({
        publications: pub.data.length,
        team: team.data.length,
        collaborators: collab.data.length,
        gallery: gallery.data.length,
      });

    } catch (err) {
      console.error("Count load error:", err);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  const chartItems = [
    {
      key: "publications",
      label: "Publications",
      short: "Papers",
      value: counts.publications,
      color: chartColors.publications,
      path: "/admin/publications",
    },
    {
      key: "team",
      label: "Team Members",
      short: "Team",
      value: counts.team,
      color: chartColors.team,
      path: "/admin/team",
    },
    {
      key: "collaborators",
      label: "Collaborators",
      short: "Collab",
      value: counts.collaborators,
      color: chartColors.collaborators,
      path: "/admin/collaborators",
    },
    {
      key: "gallery",
      label: "Gallery",
      short: "Gallery",
      value: counts.gallery,
      color: chartColors.gallery,
      path: "/admin/gallery",
    },
  ];

  const total = chartItems.reduce((sum, item) => sum + item.value, 0);
  const max = Math.max(...chartItems.map((item) => item.value), 0);

  const summaryCards = [
    {
      key: "publications",
      title: "Publications",
      value: counts.publications,
      subtitle: "Total Research Papers",
      icon: BookOpen,
      path: "/admin/publications",
      color: chartColors.publications,
    },
    {
      key: "team",
      title: "Team Members",
      value: counts.team,
      subtitle: "Active Members",
      icon: Users,
      path: "/admin/team",
      color: chartColors.team,
    },
    {
      key: "collaborators",
      title: "Collaborators",
      value: counts.collaborators,
      subtitle: "Institutes Connected",
      icon: Handshake,
      path: "/admin/collaborators",
      color: chartColors.collaborators,
    },
    {
      key: "gallery",
      title: "Gallery",
      value: counts.gallery,
      subtitle: "Uploaded Images",
      icon: Images,
      path: "/admin/gallery",
      color: chartColors.gallery,
    },
  ];

  return (
    <div className="-m-4 min-h-full space-y-8 overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_10%_-10%,rgba(0,158,102,0.45),transparent_55%),radial-gradient(ellipse_70%_50%_at_95%_15%,rgba(6,78,59,0.7),transparent_50%),radial-gradient(ellipse_60%_45%_at_50%_100%,rgba(16,185,129,0.28),transparent_55%),linear-gradient(145deg,#04140f_0%,#06281d_40%,#0a3d2c_70%,#009E66_100%)] p-4 sm:-m-6 sm:p-6 lg:-m-8 lg:p-8">

      <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Dashboard
      </h1>

      {/* TOP SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              onClick={() => navigate(card.path)}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-black/35 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-black/45"
              style={{ borderTopWidth: 4, borderTopColor: card.color }}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium text-white/65">{card.title}</h3>
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${card.color}22`, color: card.color }}
                >
                  <Icon size={18} />
                </div>
              </div>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white">
                {card.value}
              </p>
              <p className="mt-2 text-xs text-white/45">{card.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* VISUAL GRAPHS — real API counts only */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* Content Distribution Donut */}
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Content Distribution
          </h2>
          <p className="mt-1 text-sm text-white/50">
            Share of all managed items
          </p>

          <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
            <DonutChart segments={chartItems} total={total} />

            <div className="w-full space-y-3 sm:max-w-[200px]">
              {chartItems.map((item) => {
                const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-left transition hover:bg-white/5"
                  >
                    <span className="flex items-center gap-2.5 text-sm text-white/70">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-white">{pct}%</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Comparison Bar Chart */}
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Content Overview
          </h2>
          <p className="mt-1 text-sm text-white/50">
            Compare counts across sections
          </p>

          <BarChart items={chartItems} max={max} />

          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
            <span className="text-white/50">Combined total</span>
            <span className="font-semibold text-white">{total}</span>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-white">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Update Profile */}
          <div
            onClick={() => navigate("/admin/profile")}
            className="flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-black/35 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-black/45"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-emerald-900 text-white shadow-sm shadow-emerald-900/40">
              <UserRound size={22} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Update Profile</h3>
              <p className="text-sm text-white/50">Modify your personal details</p>
            </div>
          </div>

          {/* Add Publication */}
          <div
            onClick={() => navigate("/admin/publications")}
            className="flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-black/35 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-black/45"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-emerald-900 text-white shadow-sm shadow-emerald-900/40">
              <FilePlus2 size={22} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Add Publication</h3>
              <p className="text-sm text-white/50">Add new research papers</p>
            </div>
          </div>

          {/* Manage Team */}
          <div
            onClick={() => navigate("/admin/team")}
            className="flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-black/35 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-black/45"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-emerald-900 text-white shadow-sm shadow-emerald-900/40">
              <UserCog size={22} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Manage Team</h3>
              <p className="text-sm text-white/50">Add or update team members</p>
            </div>
          </div>

          {/* Upload Gallery */}
          <div
            onClick={() => navigate("/admin/gallery")}
            className="flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-black/35 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-black/45"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-emerald-900 text-white shadow-sm shadow-emerald-900/40">
              <ImagePlus size={22} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Upload Gallery Images</h3>
              <p className="text-sm text-white/50">Add event photographs</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
