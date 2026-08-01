  
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { username, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login Successfully!");
        navigate("/admin");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,158,102,0.25),transparent_55%),#04140f] px-4 py-12">
      <div className="mb-8 rounded-2xl bg-brand px-10 py-3.5 text-3xl font-semibold tracking-tight text-white shadow-elev sm:px-16 sm:text-4xl">
        Login
      </div>

      <div className="w-full max-w-md rounded-[2rem] bg-gradient-to-br from-brand to-brand-700 p-8 text-white shadow-elev sm:p-10 md:max-w-lg">
        <Logo />

        <form onSubmit={handleLogin} className="mt-2 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/90">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-white/40 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition duration-200 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/90">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/40 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition duration-200 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-white py-3.5 font-semibold text-brand shadow-sm transition duration-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
