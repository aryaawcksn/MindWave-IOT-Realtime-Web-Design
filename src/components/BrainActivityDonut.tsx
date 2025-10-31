import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts";
import { motion } from "framer-motion";
import { useState, memo } from "react";
import { PieChart as PieChartIcon } from "lucide-react";

interface BrainActivityDonutProps {
  data: any[];
}

const COLORS = {
  alpha: '#a78bfa',
  beta: '#3b82f6',
  gamma: '#10b981',
  theta: '#f59e0b'
};

const LABELS = {
  alpha: 'Alpha (Relaxation)',
  beta: 'Beta (Focus)',
  gamma: 'Gamma (Cognition)',
  theta: 'Theta (Meditation)'
};

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 14}
        fill={fill}
        opacity={0.3}
      />
    </g>
  );
};

const BrainActivityDonutComponent = ({ data }: BrainActivityDonutProps) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-6">
        <h3 className="mb-4 text-white flex items-center gap-2" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}>
          <PieChartIcon 
            className="w-5 h-5 text-cyan-300" 
            style={{ filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.6))' }}
          />
          Brain Wave Distribution
        </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                activeShape={renderActiveShape}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name as keyof typeof COLORS]}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.5))' }}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 50, 80, 0.6)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '10px',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.25)',
                }}
                labelStyle={{ color: '#bae6fd', fontWeight: 500 }}
                itemStyle={{ color: '#e0f2fe' }}
                formatter={(value: any, name: string) => [
                  `${value.toFixed(1)} Hz`,
                  LABELS[name as keyof typeof LABELS]
                ]}
              />

            </PieChart>
          </ResponsiveContainer>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((entry, index) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-sm hover:bg-cyan-500/15 transition-colors"
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: COLORS[entry.name as keyof typeof COLORS],
                  boxShadow: `0 0 10px ${COLORS[entry.name as keyof typeof COLORS]}80`
                }}
              />
              <div className="flex-1">
                <p className="text-xs text-cyan-200">{entry.name.toUpperCase()}</p>
                <p className="text-sm text-white">{entry.value.toFixed(1)} Hz</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Memoize to prevent unnecessary re-renders
export const BrainActivityDonut = memo(BrainActivityDonutComponent);
