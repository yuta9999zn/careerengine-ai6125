
import React, { useState } from 'react';
import { UserProfile, GapAnalysis } from '../types';
import { analyzeSkillGap } from '../services/geminiService';

interface AnalysisDashboardProps {
  profile: UserProfile;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ profile }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<GapAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRunAnalysis = async () => {
    if (!jobDescription.trim()) return;
    setLoading(true);
    try {
      const result = await analyzeSkillGap(profile, jobDescription);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      alert("Analysis engine error. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-2">Job Description</h2>
          <p className="text-sm text-slate-500 mb-4">Paste the target job description to run the Enterprise Match Engine.</p>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
            placeholder="Experience with React, Node, Cloud Infrastructure..."
          />
          <button
            onClick={handleRunAnalysis}
            disabled={loading || !jobDescription}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> Processing...</>
            ) : (
              'Run AI Analysis'
            )}
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        {analysis ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Analysis Results</h2>
                <div className="flex flex-col items-end">
                  <span className="text-3xl font-black text-indigo-600">{analysis.matchPercentage}%</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Match Score</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Fit Summary</h3>
                <p className="text-slate-700 leading-relaxed">{analysis.roleFitSummary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                  <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Matching Skills
                  </h4>
                  <ul className="space-y-1">
                    {analysis.overlappingSkills.map((s, i) => <li key={i} className="text-sm text-green-800">• {s}</li>)}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    Critical Gaps
                  </h4>
                  <ul className="space-y-1">
                    {analysis.missingSkills.map((s, i) => <li key={i} className="text-sm text-red-800">• {s}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
              <h2 className="text-lg font-bold mb-4">Strategic Recommendations</h2>
              <div className="space-y-3">
                {analysis.recommendations.map((rec, i) => (
                  <div key={i} className="flex gap-3 bg-white/10 p-3 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">{i+1}</span>
                    <p className="text-sm font-medium">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <p className="text-lg font-medium">No active analysis</p>
            <p className="text-sm">Input a job description on the left to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisDashboard;
