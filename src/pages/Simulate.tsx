import { useState, useEffect, useMemo, useCallback } from "react";
import { Brain, Activity, Zap, Waves } from "lucide-react";
import { EEGWaveChart } from "../components/EEGWaveChart";
import { BrainActivityDonut } from "../components/BrainActivityDonut";
import { BrainActivityGauge } from "../components/BrainActivityGauge";
import { StatCard } from "../components/StatCard";
import { InsightCard } from "../components/InsightCard";
import { CarouselCard } from "../components/CarouselCard";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
 

 
type ChartTimeInterval = 1 | 10 | 30 | 60;

interface Insight {
  id: string;
  type: "success" | "info" | "warning";
  message: string;
  timestamp: Date;
}

export default function Simulate() {
  const [eegData, setEegData] = useState<any[]>([]);
  const [currentStats, setCurrentStats] = useState({
    alpha: 10.5,
    beta: 22.3,
    gamma: 45.8,
    theta: 6.2
  });
  const [chartTimeInterval, setChartTimeInterval] = useState<ChartTimeInterval>(10);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sparklineData, setSparklineData] = useState({
    alpha: Array(20).fill(0).map(() => Math.random() * 50 + 30),
    beta: Array(20).fill(0).map(() => Math.random() * 60 + 40),
    gamma: Array(20).fill(0).map(() => Math.random() * 70 + 30),
    theta: Array(20).fill(0).map(() => Math.random() * 55 + 30)
  });
  const [brainActivityIndex, setBrainActivityIndex] = useState(72);
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: "1",
      type: "success",
      message: "Concentration increased by 12% in the last 5 minutes",
      timestamp: new Date()
    },
    {
      id: "2",
      type: "info",
      message: "Beta wave activity is optimal for focus tasks",
      timestamp: new Date()
    }
  ]);
  const [isRecording, setIsRecording] = useState(true);

  // Memoize analysis details to prevent recalculation on every render
  const analysisDetails = useMemo(() => ({
    alpha: {
      average: currentStats.alpha,
      min: 8.0,
      max: 13.0,
      amplitude: 30 + Math.random() * 20,
      powerLevel: 15.5 + Math.random() * 5,
      coherence: 75 + Math.round(Math.random() * 15),
      mentalState: "Relaxed & Wakeful",
      interpretation: "Alpha waves indicate relaxed and alert state. This level is optimal for learning and creativity. Activity increases when eyes are closed and decreases during high concentration."
    },
    beta: {
      average: currentStats.beta,
      min: 13.0,
      max: 30.0,
      amplitude: 15 + Math.random() * 15,
      powerLevel: 12.8 + Math.random() * 4,
      coherence: 70 + Math.round(Math.random() * 20),
      mentalState: "Active Thinking & Alert",
      interpretation: "Beta waves indicate high mental activity, focus, and full awareness. High levels show strong concentration, but excessive activity may indicate stress or anxiety."
    },
    gamma: {
      average: currentStats.gamma,
      min: 30.0,
      max: 100.0,
      amplitude: 10 + Math.random() * 8,
      powerLevel: 8.3 + Math.random() * 3,
      coherence: 65 + Math.round(Math.random() * 25),
      mentalState: "Peak Cognitive Performance",
      interpretation: "Gamma waves are associated with high-level information processing and peak cognitive function. This activity is crucial for memory, learning, and integration of information from various brain areas."
    },
    theta: {
      average: currentStats.theta,
      min: 4.0,
      max: 8.0,
      amplitude: 40 + Math.random() * 25,
      powerLevel: 18.2 + Math.random() * 6,
      coherence: 80 + Math.round(Math.random() * 15),
      mentalState: "Deep Meditation & Creativity",
      interpretation: "Theta waves dominate during deep meditation, REM sleep phase, and high creativity. This level facilitates deep insight, intuition, and access to subconscious memory."
    }
  }), [currentStats]);

  // Generate initial data based on chart time interval
  useEffect(() => {
    const initialData = [];
    // Start with a few points to make lines visible immediately
    const startPoints = Math.min(5, chartTimeInterval);
    for (let i = 0; i < startPoints; i++) {
      const t = i;
      initialData.push({
        time: t,
        alpha: Math.sin(t * 0.3) * 30 + 50,
        beta: Math.sin(t * 0.5) * 25 + 60,
        gamma: Math.sin(t * 0.7) * 20 + 40,
        theta: Math.sin(t * 0.2) * 35 + 55
      });
    }
    setEegData(initialData);
    setElapsedTime(startPoints);
  }, [chartTimeInterval]);

  // Simulate real-time data updates every 1 second
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      
      setEegData(prevData => {
        const newData = [...prevData];
        const currentTime = elapsedTime + 1;
        
        // Calculate relative time within the chart window
        const relativeTime = currentTime % chartTimeInterval;
        const displayTime = relativeTime === 0 ? chartTimeInterval : relativeTime;

        const newPoint = {
          time: displayTime,
          alpha: Math.sin(currentTime * 0.3) * 30 + 50 + (Math.random() - 0.5) * 8,
          beta: Math.sin(currentTime * 0.5) * 25 + 60 + (Math.random() - 0.5) * 8,
          gamma: Math.sin(currentTime * 0.7) * 20 + 40 + (Math.random() - 0.5) * 8,
          theta: Math.sin(currentTime * 0.2) * 35 + 55 + (Math.random() - 0.5) * 8
        };

        // Keep only points within the current time window
        const filteredData = newData.filter(() => relativeTime !== 0);

        filteredData.push(newPoint);

        // Limit to chart time interval worth of points
        if (filteredData.length > chartTimeInterval) {
          filteredData.shift();
        }

        return filteredData;
      });

      // Update stats with random variations
      const newStats = {
        alpha: 8 + Math.random() * 5,
        beta: 13 + Math.random() * 17,
        gamma: 30 + Math.random() * 70,
        theta: 4 + Math.random() * 4
      };
      setCurrentStats(newStats);

      // Update sparkline data
      setSparklineData(prev => ({
        alpha: [...prev.alpha.slice(1), newStats.alpha],
        beta: [...prev.beta.slice(1), newStats.beta],
        gamma: [...prev.gamma.slice(1), newStats.gamma],
        theta: [...prev.theta.slice(1), newStats.theta]
      }));

      // Update brain activity index
      const totalActivity = (newStats.alpha + newStats.beta + newStats.gamma + newStats.theta) / 4;
      setBrainActivityIndex(Math.min(100, Math.round(totalActivity * 0.8)));

      // Occasionally add new insights
      if (Math.random() < 0.05) {
        const messages = [
          { type: "success" as const, message: `Concentration improved by ${Math.round(Math.random() * 15 + 5)}%` },
          { type: "info" as const, message: "Theta waves indicate deep relaxation state" },
          { type: "warning" as const, message: "Beta activity slightly elevated - consider a short break" },
          { type: "success" as const, message: "Gamma waves showing excellent cognitive performance" },
          { type: "info" as const, message: `Alpha coherence at ${Math.round(Math.random() * 20 + 70)}%` }
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        setInsights(prev => {
          const newInsights = [{
            id: Date.now().toString(),
            ...randomMessage,
            timestamp: new Date()
          }, ...prev];
          return newInsights.slice(0, 6);
        });
      }
    }, 1000); // Update every 1 second for stable movement

    return () => clearInterval(interval);
  }, [isRecording, elapsedTime, chartTimeInterval]);

  // Memoize donut data
  const donutData = useMemo(() => [
    { name: 'alpha', value: currentStats.alpha },
    { name: 'beta', value: currentStats.beta },
    { name: 'gamma', value: currentStats.gamma },
    { name: 'theta', value: currentStats.theta }
  ], [currentStats]);

  // Memoize callback functions
  const handleChartTimeIntervalChange = useCallback((interval: ChartTimeInterval) => {
    setChartTimeInterval(interval);
  }, []);

  const handleRecordingToggle = useCallback(() => {
    setIsRecording(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101b33] to-[#152540] dark font-['Inter',sans-serif]">
      {/* Optimized animated background - removed particles for better performance */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient blobs - reduced blur for better performance */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-2xl" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-2xl" style={{ animation: 'pulse 4s ease-in-out infinite 1s' }} />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-2xl" style={{ animation: 'pulse 4s ease-in-out infinite 2s' }} />
      </div>

      <div className="relative z-10 p-6 md:p-8 -mt-4 md:-mt-6">
        {/* Navigation Header */}
        <div className="mb-6">
          <header className="relative z-10 flex flex-wrap md:flex-nowrap justify-between items-center px-4 md:px-8 py-4 md:py-6 w-full mx-auto gap-3 md:gap-6">
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

            <nav className="flex items-center gap-2 md:gap-4 w-full md:w-auto mt-2 md:mt-0 justify-start md:justify-end overflow-x-auto scrollbar-none fade-edges-x snap-x snap-mandatory">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 md:px-5 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all group text-sm md:text-base snap-start"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <Icon
                    icon="mdi:home-outline"
                    className="w-4 h-4 md:w-5 md:h-5 text-cyan-300 group-hover:text-white transition-all duration-300"
                  />
                </div>
                Home
              </Link>

              <Link
                to="/simulate"
                className="flex items-center gap-2 px-3 py-2 md:px-5 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all group text-sm md:text-base snap-start"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-blue-400/30 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <Icon
                    icon="fluent:brain-circuit-20-regular"
                    className="w-4 h-4 md:w-5 md:h-5 text-cyan-300 group-hover:text-white transition-all duration-300"
                  />
                </div>
                Simulation
              </Link>

              <Link
                to="/results"
                className="flex items-center gap-2 px-3 py-2 md:px-5 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all group text-sm md:text-base snap-start"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-purple-400/30 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <Icon
                    icon="mdi:chart-line"
                    className="w-4 h-4 md:w-5 md:h-5 text-cyan-300 group-hover:text-white transition-all duration-300"
                  />
                </div>
                Results
              </Link>

              <Link
                to="/Profile"
                className="flex items-center gap-2 px-3 py-2 md:px-5 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all group text-sm md:text-base snap-start"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-pink-400/30 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <Icon
                    icon="mdi:account-outline"
                    className="w-4 h-4 md:w-5 md:h-5 text-cyan-300 group-hover:text-white transition-all duration-300"
                  />
                </div>
                Profile
              </Link>
            </nav>
          </header>

          {/* Status Bar */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-[#1a2847]/80 to-[#1d2d50]/80 border border-cyan-400/20 backdrop-blur-xl rounded-xl shadow-xl mb-6">
            <div className="flex items-center gap-3">
              <div 
                className={`w-3 h-3 rounded-full ${isRecording ? 'bg-emerald-400' : 'bg-slate-500'}`}
                style={isRecording ? { boxShadow: '0 0 12px rgba(52, 211, 153, 0.8)' } : {}}
              />
              <span className="text-white uppercase tracking-wide">
                {isRecording ? "SIMULATION STARTED" : "SIMULATION PAUSED"}
              </span>
            </div>
            <button
              onClick={handleRecordingToggle}
              className={`px-5 py-2 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white rounded-lg transition-all shadow-lg uppercase tracking-wide`}
              style={isRecording ? { boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)' } : { boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}
            >
              {isRecording ? "⏹ STOP" : "▶ START"}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Alpha Wave"
              value={currentStats.alpha}
              unit="Hz"
              color="bg-purple-500"
              sparklineColor="#a78bfa"
              icon={<Waves className="w-5 h-5 text-purple-300" style={{ filter: 'drop-shadow(0 0 6px rgba(167, 139, 250, 0.6))' }} />}
              trend={Math.round((currentStats.alpha / 13) * 100)}
              sparklineData={sparklineData.alpha}
              analysisDetail={analysisDetails.alpha}
            />
            <StatCard
              title="Beta Wave"
              value={currentStats.beta}
              unit="Hz"
              color="bg-blue-500"
              sparklineColor="#3b82f6"
              icon={<Zap className="w-5 h-5 text-blue-300" style={{ filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))' }} />}
              trend={Math.round((currentStats.beta / 30) * 100)}
              sparklineData={sparklineData.beta}
              analysisDetail={analysisDetails.beta}
            />
            <StatCard
              title="Gamma Wave"
              value={currentStats.gamma}
              unit="Hz"
              color="bg-emerald-500"
              sparklineColor="#10b981"
              icon={<Activity className="w-5 h-5 text-emerald-300" style={{ filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))' }} />}
              trend={Math.round((currentStats.gamma / 100) * 100)}
              sparklineData={sparklineData.gamma}
              analysisDetail={analysisDetails.gamma}
            />
            <StatCard
              title="Theta Wave"
              value={currentStats.theta}
              unit="Hz"
              color="bg-amber-500"
              sparklineColor="#f59e0b"
              icon={<Brain className="w-5 h-5 text-amber-300" style={{ filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.6))' }} />}
              trend={Math.round((currentStats.theta / 8) * 100)}
              sparklineData={sparklineData.theta}
              analysisDetail={analysisDetails.theta}
            />
          </div>
        </div>

        <div className="mb-6" />

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main EEG Chart */}
          <div className="lg:col-span-8">
            <EEGWaveChart 
              data={eegData} 
              title="Real-Time EEG Wave Activity"
              chartTimeInterval={chartTimeInterval}
              onChartTimeIntervalChange={handleChartTimeIntervalChange}
              isRecording={isRecording}
            />
          </div>

          {/* Right Sidebar - Carousel */}
          <div className="lg:col-span-4">
            <CarouselCard 
              labels={["Activity Index", "Insights", "Distribution"]}
            >
              <BrainActivityGauge value={brainActivityIndex} currentStats={currentStats} />
              <InsightCard insights={insights} />
              <BrainActivityDonut data={donutData} />
            </CarouselCard>
          </div>
        </div>

        {/* Wave Information Card */}
        <div className="mt-6 p-6 bg-gradient-to-br from-[#1a2847]/80 to-[#1d2d50]/80 border border-cyan-400/20 backdrop-blur-xl rounded-lg shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 pointer-events-none" />
          <div className="absolute inset-0 border border-cyan-400/10 rounded-lg pointer-events-none" style={{ 
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.1) inset' 
          }} />
          
          <div className="relative">
            <h3 className="text-white mb-4" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}>
              Wave Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/20 backdrop-blur-sm">
                <div 
                  className="w-3 h-3 rounded-full bg-purple-500 mt-1.5" 
                  style={{ boxShadow: '0 0 12px rgba(168, 85, 247, 0.8)' }}
                />
                <div>
                  <p className="text-white text-sm">Alpha (8-13 Hz)</p>
                  <p className="text-cyan-200 text-sm">Relaxation & calm state</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/20 backdrop-blur-sm">
                <div 
                  className="w-3 h-3 rounded-full bg-blue-500 mt-1.5" 
                  style={{ boxShadow: '0 0 12px rgba(59, 130, 246, 0.8)' }}
                />
                <div>
                  <p className="text-white text-sm">Beta (13-30 Hz)</p>
                  <p className="text-cyan-200 text-sm">Active thinking & focus</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-lg border border-emerald-400/20 backdrop-blur-sm">
                <div 
                  className="w-3 h-3 rounded-full bg-emerald-500 mt-1.5" 
                  style={{ boxShadow: '0 0 12px rgba(16, 185, 129, 0.8)' }}
                />
                <div>
                  <p className="text-white text-sm">Gamma (30-100 Hz)</p>
                  <p className="text-cyan-200 text-sm">High cognitive function</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-400/20 backdrop-blur-sm">
                <div 
                  className="w-3 h-3 rounded-full bg-amber-500 mt-1.5" 
                  style={{ boxShadow: '0 0 12px rgba(245, 158, 11, 0.8)' }}
                />
                <div>
                  <p className="text-white text-sm">Theta (4-8 Hz)</p>
                  <p className="text-cyan-200 text-sm">Deep meditation & creativity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
