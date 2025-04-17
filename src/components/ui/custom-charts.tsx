
import React from "react";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  BarChart as RechartsBarChart, 
  Bar,
  PieChart as RechartsPieChart, 
  Pie, 
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Custom colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface ChartData {
  name: string;
  value: number;
}

interface ChartProps {
  data: ChartData[];
}

// Helper function to ensure safe data
const ensureSafeData = (data: ChartData[] | undefined): ChartData[] => {
  // Return an empty array if data is undefined or null
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [{ name: 'No Data', value: 0 }];
  }
  return data;
};

export const BarChart: React.FC<ChartProps> = ({ data }) => {
  const safeData = ensureSafeData(data);
  
  return (
    <ChartContainer config={{}} className="aspect-[4/3] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={safeData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="value" fill="#8884d8" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export const LineChart: React.FC<ChartProps> = ({ data }) => {
  const safeData = ensureSafeData(data);
  
  return (
    <ChartContainer config={{}} className="aspect-[4/3] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={safeData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export const PieChart: React.FC<ChartProps> = ({ data }) => {
  const safeData = ensureSafeData(data);
  
  return (
    <ChartContainer config={{}} className="aspect-[4/3] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={safeData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {safeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
