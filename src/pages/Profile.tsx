import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Profile() {
  const navLinks = [
    { to: "/", icon: "mdi:home-outline", label: "Home", glow: "bg-cyan-400/30" },
    { to: "/simulate", icon: "fluent:brain-circuit-20-regular", label: "Simulation", glow: "bg-blue-400/30" },
    { to: "/results", icon: "mdi:chart-line", label: "Results", glow: "bg-purple-400/30" },
    { to: "/profile", icon: "mdi:account-outline", label: "Profile", glow: "bg-pink-400/30" },
  ];

  const accountButtons = ["Change Password", "Connected Device", "Help & Support"];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#0f1b33] via-[#152540] to-[#1c2e4d] text-white font-['Inter',sans-serif] relative overflow-hidden">
      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          "top-1/2 left-1/2 w-[900px] h-[900px] bg-white/5 blur-[180px]",
          "top-[-150px] left-[-150px] w-[400px] h-[400px] bg-cyan-400/15 blur-[160px]",
          "bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-500/20 blur-[160px]",
        ].map((cls, i) => (
          <div key={i} className={`absolute rounded-full ${cls}`} />
        ))}
      </div>

      {/* Navbar */}
     <header className="relative z-10 flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4 md:py-6 w-full max-w-7xl mx-auto gap-4 md:gap-6">
  {/* Logo */}
  <div className="flex items-center gap-3">
    <div className="relative p-[6px] rounded-lg">
      <div className="absolute inset-0 bg-cyan-400/5 rounded-lg blur-sm"></div>
      <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg bg-[#0f172a]/70 flex items-center justify-center backdrop-blur-md border border-cyan-400/20">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/25 to-transparent pointer-events-none" />
        <Icon
          icon="fluent:brain-circuit-48-regular"
          className="w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
        />
      </div>
    </div>
    <div>
      <h1 className="text-white text-xl font-semibold">MindWave</h1>
      <p className="text-cyan-200 text-sm">EEG Brain Activity Visualization</p>
    </div>
  </div>

  {/* Navbar */}
  <nav className="flex items-center justify-center md:justify-end gap-2 md:gap-4 w-full md:w-auto overflow-x-auto scrollbar-none snap-x snap-mandatory">
    {navLinks.map((link) => (
      <Link
        key={link.label}
        to={link.to}
        className="flex items-center gap-2 px-3 py-2 md:px-5 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all group text-sm md:text-base snap-start whitespace-nowrap"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full ${link.glow} blur-md opacity-0 group-hover:opacity-100 transition-all duration-300`} />
          <Icon
            icon={link.icon}
            className="w-4 h-4 md:w-5 md:h-5 text-cyan-300 group-hover:text-white transition-all duration-300"
          />
        </div>
        {link.label}
      </Link>
    ))}
  </nav>
</header>


      {/* Profile Section */}
      <main className="relative z-10 flex flex-col items-center w-full flex-1 px-6 py-10">
        <div className="w-full max-w-2xl bg-[#1b2d4f]/80 rounded-3xl p-8 shadow-[0_0_20px_rgba(34,211,238,0.1)] backdrop-blur-xl border border-cyan-500/20 space-y-8">
          <h2 className="text-4xl font-semibold text-center  drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] py-">Profile</h2>

          {/* Profile Card */}
          <div className="bg-[#1b355a]/70 rounded-2xl p-4 sm:p-6 border border-cyan-500/10 shadow-[inset_0_0_10px_rgba(34,211,238,0.15)] backdrop-blur-md flex items-center gap-4 sm:gap-6">
  {/* Profile Picture */}
  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shrink-0">
    <User className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
    <Icon
      icon="carbon:add-filled"
      width="28"
      height="28"
      className="absolute bottom-1 right-1 cursor-pointer hover:scale-110 transition-transform text-white drop-shadow-[0_0_3px_rgba(0,0,0,0.3)]"
    />
  </div>

  {/* Info */}
  <div className="flex flex-col">
    <p className="text-lg sm:text-xl font-medium">Dwi Rahma</p>
    <p className="text-sm text-cyan-200">abcd@gmail.com</p>
  </div>

  {/* Edit Button */}
  <button className="ml-auto px-4 sm:px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg text-sm font-medium hover:scale-105 transition-transform shadow-md">
    Edit Profile
  </button>
</div>

{/* Account Settings Card */}
<div className="bg-[#1b355a]/70 rounded-2xl p-4 sm:p-6 border border-cyan-500/10 shadow-[inset_0_0_10px_rgba(34,211,238,0.15)] backdrop-blur-md">
  <h3 className="text-lg font-semibold mb-4 text-cyan-300">Account Settings</h3>
  <div className="space-y-3">
    {accountButtons.map((text) => (
      <button
        key={text}
        className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-left px-4 py-3 rounded-lg transition-all"
      >
        {text}
      </button>
    ))}
  </div>
</div>

        </div>
      </main>
    </div>
  );
}
