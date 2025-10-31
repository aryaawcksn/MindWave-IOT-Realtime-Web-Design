import { motion, AnimatePresence } from "framer-motion";
import { Brain, TrendingUp, Zap, Activity } from "lucide-react";
import { useState, memo } from "react";

interface BrainActivityGaugeProps {
  value: number; // 0-100
  label?: string;
  currentStats?: {
    alpha: number;
    beta: number;
    gamma: number;
    theta: number;
  };
}

const BrainActivityGaugeComponent = ({ value, label = "Brain Activity Index", currentStats }: BrainActivityGaugeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const getStatusColor = () => {
    if (value >= 75) return { from: "#10b981", to: "#06b6d4", text: "Optimal", glow: "rgba(16, 185, 129, 0.4)" };
    if (value >= 50) return { from: "#3b82f6", to: "#8b5cf6", text: "Active", glow: "rgba(59, 130, 246, 0.4)" };
    if (value >= 25) return { from: "#f59e0b", to: "#f97316", text: "Moderate", glow: "rgba(245, 158, 11, 0.4)" };
    return { from: "#6366f1", to: "#8b5cf6", text: "Relaxed", glow: "rgba(99, 102, 241, 0.4)" };
  };

  const status = getStatusColor();

  const getDominantWave = () => {
    if (!currentStats) return "Beta";
    const waves = [
      { name: "Alpha", value: currentStats.alpha },
      { name: "Beta", value: currentStats.beta },
      { name: "Gamma", value: currentStats.gamma },
      { name: "Theta", value: currentStats.theta }
    ];
    return waves.reduce((max, wave) => wave.value > max.value ? wave : max).name;
  };

  const getRecommendation = () => {
    if (value >= 75) return "Excellent state for complex tasks and learning";
    if (value >= 50) return "Good focus - Continue current activity";
    if (value >= 25) return "Consider taking a short energizing break";
    return "Deep relaxation - Perfect for meditation";
  };

  return (
    <motion.div
      animate={{ height: isExpanded ? "auto" : "auto" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="w-full"
    >
      <div className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48">
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-full blur-2xl opacity-30"
              style={{ background: status.glow }}
            />
            
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="70"
                stroke="rgba(34, 211, 238, 0.15)"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <motion.circle
                cx="96"
                cy="96"
                r="70"
                stroke={`url(#gradient-${value})`}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  filter: `drop-shadow(0 0 8px ${status.glow})`
                }}
              />
              <defs>
                <linearGradient id={`gradient-${value}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={status.from} />
                  <stop offset="100%" stopColor={status.to} />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-3">
                  <Brain 
                    className="w-10 h-10 mx-auto text-cyan-300"
                    style={{ 
                      filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))'
                    }}
                  />
                </div>
                <div className="text-5xl text-white mb-1" style={{
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                }}>
                  {value}
                </div>
                <div className="text-sm text-cyan-300 font-medium">
                  {status.text}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 grid grid-cols-2 gap-3 w-full">
            <div className="text-center p-3 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-400/20 backdrop-blur-sm">
              <div className="text-xs text-cyan-300 mb-1">Peak Today</div>
              <div className="text-lg text-white">{Math.min(100, value + 5)}</div>
            </div>
            <div className="text-center p-3 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-400/20 backdrop-blur-sm">
              <div className="text-xs text-cyan-300 mb-1">Average</div>
              <div className="text-lg text-white">{Math.max(0, value - 3)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 space-y-3">
              {/* Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent" />
              
              {/* Advanced Analysis Header */}
              <div className="flex items-center gap-2 text-cyan-200">
                <Activity className="w-4 h-4" style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.5))' }} />
                <h4 className="text-sm">Advanced Analysis</h4>
              </div>

              {/* Mental State */}
              <div className="p-4 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-400/20 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-cyan-300">Mental State</span>
                  <span className="text-xs text-cyan-400 px-2 py-1 bg-cyan-400/10 rounded-full border border-cyan-400/20">
                    {status.text}
                  </span>
                </div>
                <p className="text-sm text-white/90">{getRecommendation()}</p>
              </div>

              {/* Dominant Wave */}
              <div className="p-4 bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-purple-300" style={{ filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.5))' }} />
                  <span className="text-sm text-purple-200">Dominant Wave</span>
                </div>
                <div className="text-lg text-white">{getDominantWave()} Wave</div>
                <p className="text-xs text-purple-300 mt-1">
                  Primary brain activity pattern detected
                </p>
              </div>

              {/* Activity Breakdown */}
              {currentStats && (
                <div className="p-4 bg-linear-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/20 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-blue-300" style={{ filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))' }} />
                    <span className="text-sm text-blue-200">Wave Distribution</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Alpha", value: currentStats.alpha, color: "#a78bfa" },
                      { name: "Beta", value: currentStats.beta, color: "#3b82f6" },
                      { name: "Gamma", value: currentStats.gamma, color: "#10b981" },
                      { name: "Theta", value: currentStats.theta, color: "#f59e0b" }
                    ].map((wave) => (
                      <div key={wave.name} className="flex items-center gap-2">
                        <span className="text-xs text-cyan-300 w-14">{wave.name}</span>
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ 
                              background: wave.color,
                              boxShadow: `0 0 8px ${wave.color}80`
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(wave.value / 100) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-xs text-white w-12 text-right">{wave.value.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Memoize to prevent unnecessary re-renders
export const BrainActivityGauge = memo(BrainActivityGaugeComponent);
