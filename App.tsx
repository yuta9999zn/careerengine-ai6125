
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile, Skill, Experience } from './types';
import Sidebar from './components/Sidebar';
import ProfileSection from './components/ProfileSection';
import AnalysisDashboard from './components/AnalysisDashboard';
import RoadmapView from './components/RoadmapView';
import DashboardOverview from './components/DashboardOverview';

const INITIAL_PROFILE: UserProfile = {
  name: "Alex Chen",
  currentTitle: "Frontend Developer",
  skills: [
    { name: "React", level: "Expert" },
    { name: "TypeScript", level: "Advanced" },
    { name: "Tailwind CSS", level: "Advanced" },
    { name: "Node.js", level: "Intermediate" }
  ],
  experience: [
    {
      id: "1",
      title: "Senior Frontend Engineer",
      company: "TechNova Solutions",
      duration: "2021 - Present",
      description: "Leading frontend architecture for enterprise SaaS products."
    }
  ]
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.INSIGHTS);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 capitalize">
              {currentView === AppView.INSIGHTS ? "Dashboard" : currentView}
            </h1>
            <p className="text-slate-500">Welcome back, {profile.name}.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              {profile.name.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">{profile.name}</p>
              <p className="text-xs text-slate-400">{profile.currentTitle}</p>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          {currentView === AppView.INSIGHTS && (
            <DashboardOverview profile={profile} />
          )}
          
          {currentView === AppView.PROFILE && (
            <ProfileSection profile={profile} onUpdate={handleUpdateProfile} />
          )}

          {currentView === AppView.ANALYSIS && (
            <AnalysisDashboard profile={profile} />
          )}

          {currentView === AppView.ROADMAP && (
            <RoadmapView profile={profile} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
