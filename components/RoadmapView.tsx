
import React, { useState } from 'react';
import { UserProfile, CareerPath } from '../types';
import { generateCareerRoadmap } from '../services/geminiService';

interface RoadmapViewProps {
  profile: UserProfile;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ profile }) => {
  const [dreamRole, setDreamRole] = useState('');
  const [roadmap, setRoadmap] = useState<CareerPath | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!dreamRole.trim()) return;
    setLoading(true);
    try {
      const result = await generateCareerRoadmap(profile, dreamRole);
      setRoadmap(result);
    } catch (error) {
      console.error(error);
      alert("Roadmap engine error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black mb-2 text-slate-800 tracking-tight">Design Your Career Trajectory</h2>
          <p className="text-slate-500 mb-8">Where do you want to be in 3, 5, or 10 years? Let AI build the bridge.</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={dreamRole}
              onChange={(e) => setDreamRole(e.target.value)}
              placeholder="e.g. CTO, Principal Architect, AI Researcher..."
              className="flex-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-lg focus:ring-4 focus:ring-indigo-100 outline-none"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !dreamRole}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center gap-3"
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <>Generate <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg></>
              )}
            </button>
          </div>
        </div>
      </div>

      {roadmap && (
        <div className="space-y-12 py-8 animate-in fade-in duration-700">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200"></div>
            <h3 className="text-sm font-black uppercase text-slate-400 tracking-[0.2em]">Roadmap to {roadmap.dreamRole}</h3>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <div className="relative border-l-2 border-indigo-100 ml-4 md:ml-12 pl-8 md:pl-16 space-y-16">
            {roadmap.roadmap.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[41px] md:-left-[73px] top-0 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-600 rounded-full flex items-center justify-center font-black text-indigo-600 shadow-sm z-10">
                  {idx + 1}
                </div>
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all border-l-8 border-l-indigo-600">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 mb-1">{step.role}</h4>
                      <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Est. Duration: {step.estimatedTime}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Required Skillset</h5>
                      <div className="flex flex-wrap gap-2">
                        {step.requiredSkills.map((s, i) => (
                          <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Immediate Actions</h5>
                      <ul className="space-y-2">
                        {step.actions.map((action, i) => (
                          <li key={i} className="flex gap-3 text-sm text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0"></span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 opacity-20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <h4 className="text-3xl font-black mb-4">You've Reached Your Goal</h4>
              <p className="text-slate-400 max-w-xl mx-auto mb-0 italic">"The best way to predict the future is to create it."</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapView;
