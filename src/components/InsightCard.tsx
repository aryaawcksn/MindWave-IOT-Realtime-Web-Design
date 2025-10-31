import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Info, AlertCircle, CheckCircle } from "lucide-react";
import { memo } from "react";

interface Insight {
  id: string;
  type: "success" | "info" | "warning";
  message: string;
  timestamp: Date;
}

interface InsightCardProps {
  insights: Insight[];
}

const InsightCardComponent = ({ insights }: InsightCardProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-500/20 bg-green-500/5";
      case "warning":
        return "border-amber-500/20 bg-amber-500/5";
      default:
        return "border-blue-500/20 bg-blue-500/5";
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-white mb-4 flex items-center gap-2" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}>
        <TrendingUp 
          className="w-5 h-5 text-cyan-300" 
          style={{ filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.6))' }}
        />
        Real-time Insights
      </h3>
        
      <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-3 rounded-lg border ${getColorClasses(insight.type)} backdrop-blur-sm`}
            >
              <div className="flex items-start gap-3">
                {getIcon(insight.type)}
                <div className="flex-1">
                  <p className="text-sm text-white/90">{insight.message}</p>
                  <p className="text-xs text-cyan-300/70 mt-1">
                    {insight.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export const InsightCard = memo(InsightCardComponent);
