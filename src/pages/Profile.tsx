import { Brain, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react"; // ⬅️ tambahkan baris ini

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1b33] via-[#152540] to-[#1c2e4d] text-white font-['Inter',sans-serif] flex flex-col items-center relative overflow-hidden">
      {/* 🌈 Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-white/5 rounded-full blur-[180px]" />
        <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-cyan-400/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[160px]" />
      </div>

      {/* 🧭 Navbar */}
            <header className="relative z-10 flex justify-between items-center px-8 py-6 w-full max-w-7xl">
              <div className="flex items-center gap-3">
                <div className="relative p-[6px] rounded-lg">
        <div className="absolute inset-0 bg-cyan-400/5 rounded-lg blur-sm"></div>
        <div className="relative w-15 h-15 rounded-lg bg-[#0f172a]/70 flex items-center justify-center backdrop-blur-md border border-cyan-400/20">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/25 to-transparent pointer-events-none" />
          <Icon
            icon="fluent:brain-circuit-48-regular"
            className="w-12 h-12 text-white drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
          />
        </div>
      </div>
                <div>
                  <h1 className="text-white text-xl font-semibold">MindWave</h1>
                  <p className="text-cyan-200 text-sm">EEG Brain Activity Visualization</p>
                </div>
              </div>
      
              <nav className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all group"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <Icon
              icon="mdi:home-outline"
              className="w-5 h-5 text-cyan-300 group-hover:text-white transition-all duration-300"
            />
          </div>
          Home
        </Link>
      
        <Link
          to="/simulate"
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all group"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-blue-400/30 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <Icon
              icon="fluent:brain-circuit-20-regular"
              className="w-5 h-5 text-cyan-300 group-hover:text-white transition-all duration-300"
            />
          </div>
          Simulation
        </Link>
      
        <Link
          to="/results"
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all group"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-purple-400/30 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <Icon
              icon="mdi:chart-line"
              className="w-5 h-5 text-cyan-300 group-hover:text-white transition-all duration-300"
            />
          </div>
          Results
        </Link>
      
        <Link
          to="/Profile"
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all group"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-pink-400/30 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <Icon
              icon="mdi:account-outline"
              className="w-5 h-5 text-cyan-300 group-hover:text-white transition-all duration-300"
            />
          </div>
          Profile
        </Link>
      </nav>
            </header>

      {/* 👤 Profile Card */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full flex-1 px-6 py-10">
        <h2 className="text-4xl font-semibold mb-8 text-center drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
          Profile
        </h2>

        {/* User Info Card */}
        <div className="w-full max-w-lg bg-[#14203d]/70 rounded-2xl p-6 shadow-2xl backdrop-blur-md border border-cyan-500/10 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg">
              <User className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xl font-semibold">Dwi Rahma</p>
              <p className="text-cyan-300 text-sm">abcd@gmail.com</p>
            </div>
            <button className="ml-auto px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg text-sm font-medium hover:scale-105 transition-transform shadow-lg">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="w-full max-w-lg bg-[#14203d]/70 rounded-2xl p-6 shadow-2xl backdrop-blur-md border border-cyan-500/10">
          <h3 className="text-lg font-semibold mb-4 text-cyan-300">
            Account Settings
          </h3>
          <div className="space-y-3">
            <button className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-left px-4 py-3 rounded-lg transition-all">
              Change Password
            </button>
            <button className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-left px-4 py-3 rounded-lg transition-all">
              Connected Device
            </button>
            <button className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-left px-4 py-3 rounded-lg transition-all">
              Help & Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
