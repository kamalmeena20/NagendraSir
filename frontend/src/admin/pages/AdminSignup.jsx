import React, { useState } from "react";
import api from "../../api/api";
import Logo from "../../components/logo";

export default function AdminSignup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { username, password });
      setMessage("Signup Successful!");
    } catch (err) {
      setMessage("Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 bg-white">
      <div className="bg-[#009e66] text-white px-20 py-4 rounded-md text-4xl font-semibold">
        Sign up !
      </div>

      <div className="w-[80%] md:w-[60%] lg:w-[45%] bg-[#009e66] text-white mt-10 p-10 rounded-[40px] shadow-lg">
        <Logo />

        <form onSubmit={handleSignup} className="mt-6">
          <label className="block mb-1 text-lg text-white">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
className="w-full px-4 py-3 mb-6 text-white placeholder-white placeholder-opacity-50 bg-transparent border border-white rounded-md focus:outline-none"/>

          <label className="block mb-1 text-lg text-white">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
className="w-full px-4 py-3 mb-6 text-white placeholder-white placeholder-opacity-50 bg-transparent border border-white rounded-md focus:outline-none"          />

          <button
            type="submit"
            className="w-full py-3 font-semibold text-green-700 transition-all bg-white rounded-md hover:bg-gray-200"
          >
            Sign Up
          </button>

          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
}
