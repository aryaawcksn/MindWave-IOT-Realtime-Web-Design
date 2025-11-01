import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

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
          <p className="text-cyan-200 text-sm">Login</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
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

          {/* Remember Me + Forgot */}
          <div className="flex items-center justify-between text-sm mt-2">
           <label
                onClick={() => setRemember(!remember)}
                className="flex items-center gap-2 cursor-pointer select-none"
                >
               <div
  className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors duration-200 ${
    remember
      ? "bg-cyan-400 border-cyan-400"
      : "border-gray-400 bg-transparent"
  }`}
>
  <Icon
    icon="mdi:check-bold"
    className={`text-[#0f1b33] text-[10px] transition-opacity duration-200 ${
      remember ? "opacity-100" : "opacity-0"
    }`}
  />
</div>

                <span className="text-gray-300">Remember Me</span>
                </label>

            <Link
              to="/forgot-password"
              className="text-cyan-300 hover:text-cyan-200 font-medium transition-all"
            >
              Forgot?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg text-sm font-medium hover:scale-[1.02] transition-transform shadow-lg mt-4"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-300 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-300 hover:text-cyan-200 font-medium transition-all"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
