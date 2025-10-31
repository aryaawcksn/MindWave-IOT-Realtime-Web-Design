import { Card } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, memo } from "react";
import { ChevronDown, Activity } from "lucide-react";
import { SparklineChart } from "./SparklineChart";

interface AnalysisDetail {
  average: number;
  min: number;
  max: number;
  amplitude: number;
  powerLevel: number;
  coherence: number;
  mentalState: string;
  interpretation: string;
}

interface StatCardProps {
  title: string;
  value: number;
  unit: string;
  color: string;
  sparklineColor: string;
  icon: React.ReactNode;
  trend: number;
  sparklineData: number[];
  analysisDetail?: AnalysisDetail;
}

const StatCardComponent = ({ 
  title, 
  value, 
  unit, 
  color, 
  sparklineColor, 
  trend, 
  sparklineData,
  analysisDetail 
}: StatCardProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        cardRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !cardRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleCardClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
      ref={cardRef}
    >
      <Card 
        className="relative bg-linear-to-br from-[#1a2847]/80 to-[#1d2d50]/80 border border-cyan-400/20 backdrop-blur-xl hover:border-cyan-400/40 transition-all cursor-pointer shadow-xl shadow-cyan-500/5 hover:shadow-cyan-500/15 overflow-hidden"
        onClick={handleCardClick}
      >
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-600/5 pointer-events-none" />
        <div className="absolute inset-0 border border-cyan-400/10 rounded-lg pointer-events-none" style={{ 
          boxShadow: '0 0 15px rgba(34, 211, 238, 0.05) inset' 
        }} />
        
        <div className="relative p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity 
                className="w-5 h-5 text-cyan-300" 
                style={{ filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.6))' }} 
              />
              <div>
                <p className="text-white text-sm">{title}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl text-white" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}>
                    {value.toFixed(1)}
                  </span>
                  <span className="text-cyan-300 text-xs">{unit}</span>
                </div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="mt-1"
            >
              <ChevronDown className="w-4 h-4 text-cyan-300" />
            </motion.div>
          </div>

          {/* Sparkline */}
          <div className="mb-4 -mx-2">
            <SparklineChart data={sparklineData} color={sparklineColor} />
          </div>

          {/* Strength Progress bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-cyan-300">Strength</span>
              <span className="text-xs text-cyan-300">{trend}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-cyan-950/30 overflow-hidden backdrop-blur-sm">
              <motion.div
                className={`h-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${trend}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ boxShadow: `0 0 10px ${sparklineColor}80` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Dropdown Analysis Detail */}
      <AnimatePresence>
        {isDropdownOpen && analysisDetail && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="bg-linear-to-br from-[#1a2847]/95 to-[#1d2d50]/95 border-cyan-400/30 backdrop-blur-xl shadow-2xl shadow-cyan-500/20">
              <div className="p-5">
                <div className="mb-4 pb-3 border-b border-cyan-400/20">
                  <h4 className="text-white flex items-center gap-2 text-sm" style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.2)' }}>
                    <Activity className="w-4 h-4" />
                    Advanced Analysis
                  </h4>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-3">
                  <div className="bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-lg p-2.5 border border-cyan-400/20 backdrop-blur-sm">
                    <p className="text-xs text-cyan-300 mb-0.5">Average</p>
                    <p className="text-white text-sm">{analysisDetail.average.toFixed(2)} Hz</p>
                  </div>
                  <div className="bg linear-to-br from-cyan-500/10 to-blue-500/10 rounded-lg p-2.5 border border-cyan-400/20 backdrop-blur-sm">
                    <p className="text-xs text-cyan-300 mb-0.5">Amplitude</p>
                    <p className="text-white text-sm">{analysisDetail.amplitude.toFixed(1)} µV</p>
                  </div>
                  <div className="bg linear-to-br from-cyan-500/10 to-blue-500/10 rounded-lg p-2.5 border border-cyan-400/20 backdrop-blur-sm">
                    <p className="text-xs text-cyan-300 mb-0.5">Range</p>
                    <p className="text-white text-xs">
                      {analysisDetail.min.toFixed(1)} - {analysisDetail.max.toFixed(1)} Hz
                    </p>
                  </div>
                  <div className="bg linear-to-br from-cyan-500/10 to-blue-500/10 rounded-lg p-2.5 border border-cyan-400/20 backdrop-blur-sm">
                    <p className="text-xs text-cyan-300 mb-0.5">Power Level</p>
                    <p className="text-white text-sm">{analysisDetail.powerLevel.toFixed(2)} µV²</p>
                  </div>
                </div>

                {/* Coherence */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs text-cyan-300">Coherence/Stability</p>
                    <span className="text-xs text-white">{analysisDetail.coherence}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-cyan-950/30 overflow-hidden backdrop-blur-sm">
                    <motion.div
                      className={`h-full ${color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisDetail.coherence}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ boxShadow: `0 0 10px ${sparklineColor}80` }}
                    />
                  </div>
                </div>

                {/* Mental State */}
                <div className="bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-lg p-2.5 mb-2.5 border border-cyan-400/20 backdrop-blur-sm">
                  <p className="text-xs text-cyan-300 mb-0.5">Mental State</p>
                  <p className="text-white text-sm">{analysisDetail.mentalState}</p>
                </div>

                {/* Interpretation */}
                <div className="bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-2.5 border border-cyan-400/20 backdrop-blur-sm">
                  <p className="text-xs text-cyan-300 mb-0.5">Interpretation</p>
                  <p className="text-xs text-white/90 leading-relaxed">
                    {analysisDetail.interpretation}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Memoize to prevent unnecessary re-renders
export const StatCard = memo(StatCardComponent);
