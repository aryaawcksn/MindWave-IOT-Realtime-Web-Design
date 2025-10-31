import { Card } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { Activity, Clock } from "lucide-react";
import { useEffect, useState, memo } from "react";

type ChartTimeInterval = 1 | 10 | 30 | 60;

interface EEGWaveChartProps {
  data: any[];
  title: string;
  chartTimeInterval: ChartTimeInterval;
  onChartTimeIntervalChange: (interval: ChartTimeInterval) => void;
  isRecording: boolean;
}

const EEGWaveChartComponent = ({
  data,
  title,
  chartTimeInterval,
  onChartTimeIntervalChange,
  isRecording,
}: EEGWaveChartProps) => {
  const [hoveredWave, setHoveredWave] = useState<string | null>(null);
  const [smoothData, setSmoothData] = useState<any[]>(data);

  // --- Smooth realtime transition handler ---
  useEffect(() => {
    if (!isRecording) return;

    let frameId: number;
    let lastTime = performance.now();

    const update = (time: number) => {
      if (time - lastTime > 100) { // update tiap ~100ms
        setSmoothData((prev) => {
          const lastT = prev[prev.length - 1]?.time || 0;
          const newT = lastT + 0.1;
          const next = {
            time: newT,
            alpha: 60 + Math.sin(newT) * 20 + Math.random() * 3,
            beta: 50 + Math.cos(newT / 2) * 15 + Math.random() * 3,
            gamma: 40 + Math.sin(newT / 3) * 25 + Math.random() * 3,
            theta: 70 + Math.cos(newT / 1.5) * 10 + Math.random() * 3,
          };

          const maxPoints = chartTimeInterval * 10;
          return [...prev, next].slice(-maxPoints);
        });
        lastTime = time;
      }
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isRecording, chartTimeInterval]);

  const displayedData = isRecording ? smoothData : data;

  const timeIntervalOptions: ChartTimeInterval[] = [1, 10, 30, 60];

  const getTimeLabel = (interval: ChartTimeInterval) => {
    if (interval === 1) return "1s";
    if (interval === 60) return "1m";
    return `${interval}s`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative bg-gradient-to-br from-[#0e1a30]/80 to-[#17385a]/80 border border-cyan-400/20 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 pointer-events-none" />
        <div
          className="absolute inset-0 border border-cyan-400/10 rounded-lg pointer-events-none"
          style={{ boxShadow: "0 0 20px rgba(34, 211, 238, 0.1) inset" }}
        />

        <div className="relative p-6 bg-transparent">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity
                className="w-5 h-5 text-cyan-300"
                style={{ filter: "drop-shadow(0 0 6px rgba(34, 211, 238, 0.8))" }}
              />
              <h3
                className="text-white text-lg"
                style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.25)" }}
              >
                {title}
              </h3>
            </div>

            {/* Time Interval Selector */}
            <div className="flex items-center gap-2 bg-gradient-to-br from-[#1c315a]/80 to-[#223c63]/80 border border-cyan-400/20 backdrop-blur-xl rounded-lg p-1">
              <Clock
                className="w-4 h-4 text-cyan-300 ml-1"
                style={{ filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))" }}
              />
              {timeIntervalOptions.map((interval) => (
                <button
                  key={interval}
                  onClick={() => onChartTimeIntervalChange(interval)}
                  className={`px-3 py-1 rounded-md text-sm transition-all ${
                    chartTimeInterval === interval
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg"
                      : "text-cyan-300 hover:bg-cyan-500/20"
                  }`}
                  style={
                    chartTimeInterval === interval
                      ? { boxShadow: "0 0 15px rgba(34, 211, 238, 0.4)" }
                      : {}
                  }
                >
                  {getTimeLabel(interval)}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={(() => {
              // When paused, normalize time values to start from 0 for continuous line
              if (!isRecording && displayedData.length > 0) {
                return displayedData.map((point, index) => ({
                  ...point,
                  time: index
                }));
              }
              return displayedData;
            })()}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(34, 211, 238, 0.15)" />
              <XAxis
                dataKey="time"
                stroke="rgba(34, 211, 238, 0.6)"
                tick={{ fill: "rgba(173, 216, 255, 0.9)", fontSize: 12 }}
                label={{
                  value: "Time (s)",
                  position: "insideBottom",
                  offset: -5,
                  style: { fill: "rgba(147, 197, 253, 0.7)", fontSize: 12 },
                }}
                type="number"
                domain={
                  isRecording
                    ? [(dataMin: number) => dataMin, (dataMax: number) => dataMax]
                    : [0, displayedData.length - 1]
                }
                tickFormatter={(time) => time.toFixed(1)}
              />
              <YAxis
                stroke="rgba(34, 211, 238, 0.5)"
                tick={{
                  fill: "rgba(173, 216, 255, 0.9)",
                  fontSize: 12,
                }}
                domain={[0, 120]}
                label={{
                  value: "Amplitude (µV)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "rgba(147, 197, 253, 0.7)", fontSize: 12 },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(26, 40, 71, 0.95)",
                  border: "1px solid rgba(34, 211, 238, 0.3)",
                  borderRadius: "8px",
                  backdropFilter: "blur(12px)",
                }}
                labelStyle={{
                  color: "#e0eaff",
                  textShadow: "0 0 8px rgba(224, 234, 255, 0.5)",
                }}
                itemStyle={{
                  color: "#e0eaff",
                }}
              />
              <Legend
                wrapperStyle={{
                  color: "#e0eaff",
                }}
                onMouseEnter={(e) => setHoveredWave(e.dataKey as string)}
                onMouseLeave={() => setHoveredWave(null)}
                formatter={(value, entry) => (
                  <span
                    style={{
                      color:
                        hoveredWave === entry.dataKey ? "#e0eaff" : "#93c5fd",
                      textShadow:
                        hoveredWave === entry.dataKey
                          ? "0 0 8px rgba(224, 234, 255, 0.8)"
                          : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {value}
                  </span>
                )}
              />

              {/* EEG Lines */}
              {[
                { key: "alpha", color: "#a78bfa", label: "Alpha (8-13 Hz)" },
                { key: "beta", color: "#3b82f6", label: "Beta (13-30 Hz)" },
                { key: "gamma", color: "#10b981", label: "Gamma (30-100 Hz)" },
                { key: "theta", color: "#f59e0b", label: "Theta (4-8 Hz)" },
              ].map(({ key, color, label }) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  strokeWidth={hoveredWave === key ? 3.5 : 2.5}
                  dot={false}
                  name={label}
                  isAnimationActive={false}
                  connectNulls
                  style={{
                    filter: `drop-shadow(0 0 ${
                      hoveredWave === key ? "8px" : "4px"
                    } ${color}99)`,
                    transition: "all 0.3s ease",
                    opacity: isRecording ? 1 : 0.8,
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};

// Memoize component to prevent unnecessary re-renders
export const EEGWaveChart = memo(EEGWaveChartComponent);
