import { LineChart, Line, ResponsiveContainer } from "recharts";
import { memo } from "react";

interface SparklineChartProps {
  data: number[];
  color: string;
}

const SparklineChartComponent = ({ data, color }: SparklineChartProps) => {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
          animationDuration={500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Memoize to prevent unnecessary re-renders
export const SparklineChart = memo(SparklineChartComponent);
