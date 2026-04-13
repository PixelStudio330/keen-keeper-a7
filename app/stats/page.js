"use client";
import React from 'react';
import { useData } from "../context/DataContext";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function Analytics() {
  const { interactions } = useData();

  const data = [
    { name: 'Call', value: interactions.filter(i => i.type === 'Call').length, color: '#244D37' },
    { name: 'Text', value: interactions.filter(i => i.type === 'Text').length, color: '#8B5CF6' },
    { name: 'Video', value: interactions.filter(i => i.type === 'Video').length, color: '#34A853' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-xl rounded-xl border border-gray-100 animate-fade-in-smooth pointer-events-none">
          <p className="text-sm font-bold text-[#1e293b]">
            {`${payload[0].name}: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl font-extrabold text-[#1e293b] mb-8 tracking-tight">Friendship Analytics</h1>

        <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm animate-scale-in-smooth">
          <h3 className="text-[#244D37] font-semibold text-sm mb-4">By Interaction Type</h3>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={115}
                  paddingAngle={10}
                  cornerRadius={40}
                  dataKey="value"
                  stroke="none"
                  // ANIMATION IS BACK!
                  isAnimationActive={true} 
                  animationBegin={200}
                  animationDuration={1200}
                  animationEasing="ease-out"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{ outline: 'none' }} 
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Pie>
                
                <Tooltip 
                  content={<CustomTooltip />}
                  // Keep this FALSE so the label doesn't "slide" awkwardly
                  isAnimationActive={false} 
                  allowEscapeViewBox={{ x: true, y: true }}
                />
                
                <Legend 
                  verticalAlign="bottom" 
                  align="center"
                  iconType="circle"
                  iconSize={6}
                  formatter={(value) => (
                    <span className="text-[11px] font-medium text-gray-400 ml-1 uppercase tracking-widest">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}