import { Brain } from "lucide-react";
import brainImage from "figma:asset/9867b0c3e3f31348819959b6aa1587f68c17e15a.png";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101b33] to-[#152540] dark font-['Inter',sans-serif]">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-2xl" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-2xl" style={{ animation: 'pulse 4s ease-in-out infinite 1s' }} />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-2xl" style={{ animation: 'pulse 4s ease-in-out infinite 2s' }} />
      </div>

      <div className="relative z-10">
        {/* Navigation Header */}
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <div 
                className="p-2.5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl shadow-2xl"
                style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
              >
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white text-xl" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}>
                  MindWave
                </h1>
                <p className="text-cyan-200 text-sm">EEG Brain Activity Visualization</p>
              </div>
            </div>
            <nav className="flex items-center gap-2">
              <button 
                className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg shadow-lg"
                style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' }}
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('simulate')}
                className="px-5 py-2 text-cyan-200 hover:text-white transition-colors rounded-lg hover:bg-cyan-500/10"
              >
                Simulate
              </button>
              <button className="px-5 py-2 text-cyan-200 hover:text-white transition-colors rounded-lg hover:bg-cyan-500/10">
                Results
              </button>
              <button className="px-5 py-2 text-cyan-200 hover:text-white transition-colors rounded-lg hover:bg-cyan-500/10">
                Help
              </button>
            </nav>
          </div>

          {/* Hero Section */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 
                    className="text-white text-5xl leading-tight"
                    style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
                  >
                    Visualize Your Brain Activity In Real-Time
                  </h2>
                  <p className="text-cyan-200 text-lg max-w-xl">
                    MindWave provides cutting-edge EEG monitoring and visualization, helping you understand and optimize your mental state through advanced brain wave analysis.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => onNavigate('simulate')}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                    style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
                  >
                    Started now
                  </button>
                  <button className="px-8 py-3 border border-cyan-400/40 text-cyan-200 rounded-lg hover:bg-cyan-500/10 transition-all backdrop-blur-sm">
                    Learn More
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8">
                  <div className="text-center">
                    <p className="text-white text-4xl" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}>
                      4
                    </p>
                    <p className="text-cyan-200 text-sm mt-2">
                      Wave Types
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-4xl" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}>
                      24/7
                    </p>
                    <p className="text-cyan-200 text-sm mt-2">
                      Monitoring
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-4xl" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}>
                      100%
                    </p>
                    <p className="text-cyan-200 text-sm mt-2">
                      Accuracy
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content - Brain Illustration */}
              <div className="relative flex items-center justify-center">
                <div className="relative">
                  {/* Glow effect behind brain */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl"
                    style={{ transform: 'scale(1.2)' }}
                  />
                  {/* Brain Image */}
                  <img 
                    src={brainImage} 
                    alt="Brain illustration" 
                    className="relative w-full h-auto max-w-md drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.4))' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
