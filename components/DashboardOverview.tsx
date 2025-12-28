
import React from 'react';
import { UserProfile } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface DashboardOverviewProps {
  profile: UserProfile;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ profile }) => {
  const chartData = profile.skills.map(s => {
    let value = 25;
    if (s.level === 'Intermediate') value = 50;
    if (s.level === 'Advanced') value = 75;
    if (s.level === 'Expert') value = 100;
    return { name: s.name, value };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Skill Summary */}
      <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Skill Architecture</h3>
          <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Live Visualization</span>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
              <Radar
                name="Proficiency"
                dataKey="value"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="space-y-6">
        <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
          <h4 className="text-sm font-bold uppercase opacity-60 mb-1">Current Standing</h4>
          <p className="text-3xl font-black mb-4">Enterprise Ready</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-80">Skill Score</span>
              <span className="font-bold">84/100</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="w-[84%] h-full bg-white"></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold mb-4">Engine Alerts</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-bold">In-Demand Skill Alert</p>
                <p className="text-xs text-slate-500">Cloud Architecture (AWS) is highly requested in your field.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-bold">Resume Optimization</p>
                <p className="text-xs text-slate-500">Your profile matches 89% of modern tech standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Advice Box */}
      <div className="md:col-span-3 bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-2">Automated Career Intelligence</h3>
          <p className="text-slate-400 max-w-2xl mb-6 leading-relaxed">
            Our engine has analyzed your trajectory. You are currently 3 key certifications away from qualifying for Director-level positions. 
            We recommend prioritizing <strong>System Design</strong> and <strong>Strategic Leadership</strong> training modules.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">Start Skill Gap Analysis</button>
            <button className="px-6 py-2 bg-slate-800 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors">Update Experiences</button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
