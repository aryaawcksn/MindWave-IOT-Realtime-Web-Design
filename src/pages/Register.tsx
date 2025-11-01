import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const isMatch = password && confirm && password === confirm;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1b33] via-[#152540] to-[#1c2e4d] font-['Inter',sans-serif] text-white">
      <div className="bg-[#1b2d4f]/80 backdrop-blur-xl rounded-3xl shadow-[0_0_20px_rgba(0,200,255,0.2)] p-10 w-[450px]">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-3">
            <Icon
      icon="fluent:brain-circuit-48-regular"
      className="w-10 h-10 text-white drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
    />
          </div>
          <h1 className="text-2xl font-semibold">MindWave</h1>
          <p className="text-cyan-200 text-sm">Register</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <label className="block text-sm mb-1">Full Name</label>
            <Icon
              icon="mdi:account-outline"
              className="absolute left-3 top-9 text-gray-400 w-5 h-5"
            />
            <input
              type="text"
              placeholder="Dwi Rahma"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#243b63]/60 border border-cyan-400/20 placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm mb-1">Email</label>
            <Icon
              icon="mdi:email-outline"
              className="absolute left-3 top-9 text-gray-400 w-5 h-5"
            />
            <input
              type="email"
              placeholder="abcd@gmail.com"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#243b63]/60 border border-cyan-400/20 placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm mb-1">Password</label>
            <Icon
              icon="mdi:lock-outline"
              className="absolute left-3 top-9 text-gray-400 w-5 h-5"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#243b63]/60 border border-cyan-400/20 placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-cyan-300 transition-all"
            >
              <Icon
                icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm mb-1">Confirm Password</label>
            <Icon
              icon={isMatch ? "mdi:lock-check-outline" : "mdi:lock-outline"}
              className={`absolute left-3 top-9 w-5 h-5 ${
                isMatch ? "text-emerald-400" : "text-gray-400"
              }`}
            />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={`w-full pl-10 pr-10 py-3 rounded-lg bg-[#243b63]/60 border ${
                isMatch
                  ? "border-emerald-400"
                  : "border-cyan-400/20 focus:border-cyan-400"
              } placeholder-gray-400 focus:outline-none transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-gray-400 hover:text-cyan-300 transition-all"
            >
              <Icon
                icon={showConfirm ? "mdi:eye-off-outline" : "mdi:eye-outline"}
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={!isMatch}
            className={`w-full py-3 rounded-lg text-sm font-medium transition-transform shadow-lg mt-4 ${
              isMatch
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02]"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-300 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-300 hover:text-cyan-200 font-medium transition-all"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
