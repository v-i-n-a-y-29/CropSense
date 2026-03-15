import { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend, ResponsiveContainer,
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, Legend as LineLegend
} from 'recharts';
import { Calendar, Download, TrendingDown, TrendingUp } from 'lucide-react';
import { mockApi } from '../../services/mockApi';

export default function Analytics() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    mockApi.getAnalytics().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics & Reports</h1>
          <p className="text-slate-500 mt-1">Monitor machine utilization and environmental impact.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium shadow-sm transition-colors">
            <Calendar className="w-5 h-5 mr-2 text-slate-400" />
            Oct 1 - Nov 5, 2023
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-sm transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status Breakdown Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Current Fleet Status</h2>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.statusBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.statusBreakdown.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <PieTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Correlation Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Machine Utilization vs. AQI</h2>
              <p className="text-sm text-slate-500 mt-1">Correlation between CRM usage and pollution levels.</p>
            </div>
            <div className="flex items-center bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-green-200">
              <TrendingDown className="w-4 h-4 mr-1.5" />
              Inverse Correlation Detected
            </div>
          </div>
          
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data.correlationData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  yAxisId="left" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dx={-10}
                  label={{ value: 'Utilization (%)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dx={10}
                  label={{ value: 'Average AQI', angle: 90, position: 'insideRight', fill: '#64748b', fontSize: 12 }}
                />
                <LineTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <LineLegend verticalAlign="top" height={36} iconType="circle" />
                <Bar 
                  yAxisId="left" 
                  dataKey="utilization" 
                  name="Machine Utilization (%)" 
                  fill="#16a34a" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="aqi" 
                  name="Air Quality Index (AQI)" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
