import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Play, Square } from "lucide-react";
import { EEGWaveChart } from "./EEGWaveChart";

type ChartTimeInterval = 1 | 10 | 30 | 60;

const SimulationPageComponent = () => {
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [chartTimeInterval, setChartTimeInterval] = useState<ChartTimeInterval>(10);
  const [chartData, setChartData] = useState<any[]>([]);

  // Generate initial data when simulation starts
  useEffect(() => {
    if (simulationRunning && chartData.length === 0) {
      const initialData = Array.from({ length: 10 }, (_, i) => ({
        time: i * 0.1,
        alpha: 60 + Math.sin(i * 0.1) * 20 + Math.random() * 3,
        beta: 50 + Math.cos(i * 0.05) * 15 + Math.random() * 3,
        gamma: 40 + Math.sin(i * 0.033) * 25 + Math.random() * 3,
        theta: 70 + Math.cos(i * 0.067) * 10 + Math.random() * 3,
      }));
      setChartData(initialData);
    }
  }, [simulationRunning, chartData.length]);

  // Update data when recording is stopped (store paused data)
  useEffect(() => {
    if (!simulationRunning && chartData.length > 0) {
      // Keep the current data when paused
    }
  }, [simulationRunning, chartData]);

  const handleStartStop = () => {
    if (!simulationRunning) {
      // Starting simulation - reset data
      setChartData([]);
    }
    setSimulationRunning(!simulationRunning);
  };

  const handleChartTimeIntervalChange = (interval: ChartTimeInterval) => {
    setChartTimeInterval(interval);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101b33] to-[#152540]">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative border-b border-cyan-400/20 backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e1a30]/90 to-[#17385a]/90" />
        <div className="relative container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Activity
                  className="w-8 h-8 text-cyan-400"
                  style={{ filter: "drop-shadow(0 0 12px rgba(34, 211, 238, 0.8))" }}
                />
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full" />
              </div>
              <h1
                className="text-white text-2xl tracking-wide"
                style={{ 
                  textShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
                  fontFamily: "system-ui, -apple-system, sans-serif"
                }}
              >
                MindWave
              </h1>
            </div>

            {/* Menu */}
            <div className="flex items-center gap-8">
              {["Home", "Simulation", "Results", "Help"].map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className={`text-sm tracking-wide transition-all duration-300 ${
                    item === "Simulation"
                      ? "text-cyan-300"
                      : "text-cyan-100/70 hover:text-cyan-300"
                  }`}
                  style={{
                    textShadow: item === "Simulation" 
                      ? "0 0 12px rgba(34, 211, 238, 0.5)" 
                      : "none",
                  }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Status Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative border-b border-cyan-400/10 backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e1a30]/60 to-[#17385a]/60" />
        <div className="relative container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Status Text and Indicator */}
            <div className="flex items-center gap-4">
              {/* Animated Indicator Light */}
              <motion.div
                animate={{
                  scale: simulationRunning ? [1, 1.2, 1] : 1,
                  boxShadow: simulationRunning
                    ? [
                        "0 0 20px rgba(16, 185, 129, 0.8)",
                        "0 0 30px rgba(16, 185, 129, 1)",
                        "0 0 20px rgba(16, 185, 129, 0.8)",
                      ]
                    : "0 0 15px rgba(239, 68, 68, 0.6)",
                }}
                transition={{
                  duration: simulationRunning ? 1.5 : 0.3,
                  repeat: simulationRunning ? Infinity : 0,
                }}
                className={`w-4 h-4 rounded-full ${
                  simulationRunning ? "bg-emerald-400" : "bg-red-400"
                }`}
              />

              {/* Status Text */}
              <AnimatePresence mode="wait">
                <motion.h2
                  key={simulationRunning ? "started" : "stopped"}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-white text-3xl"
                  style={{
                    textShadow: simulationRunning
                      ? "0 0 20px rgba(16, 185, 129, 0.6)"
                      : "0 0 20px rgba(239, 68, 68, 0.6)",
                  }}
                >
                  Simulation {simulationRunning ? "Started" : "Stopped"}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Start/Stop Button */}
            <AnimatePresence mode="wait">
              <motion.button
                key={simulationRunning ? "stop" : "start"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={handleStartStop}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg border transition-all duration-300 ${
                  simulationRunning
                    ? "bg-gradient-to-r from-red-500/80 to-red-600/80 border-red-400/30 hover:from-red-500 hover:to-red-600"
                    : "bg-gradient-to-r from-cyan-500/80 to-blue-600/80 border-cyan-400/30 hover:from-cyan-500 hover:to-blue-600"
                }`}
                style={{
                  boxShadow: simulationRunning
                    ? "0 0 25px rgba(239, 68, 68, 0.4)"
                    : "0 0 25px rgba(34, 211, 238, 0.4)",
                }}
              >
                {simulationRunning ? (
                  <>
                    <Square className="w-5 h-5 text-white" fill="white" />
                    <span className="text-white tracking-wide">
                      Stop Simulation
                    </span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 text-white" fill="white" />
                    <span className="text-white tracking-wide">
                      Start Simulation
                    </span>
                  </>
                )}
              </motion.button>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* EEG Wave Chart */}
      <div className="container mx-auto px-6 py-8">
        <EEGWaveChart
          data={chartData}
          title="Real-Time EEG Brain Wave Activity"
          chartTimeInterval={chartTimeInterval}
          onChartTimeIntervalChange={handleChartTimeIntervalChange}
          isRecording={simulationRunning}
        />
      </div>
    </div>
  );
};

export const SimulationPage = memo(SimulationPageComponent);
