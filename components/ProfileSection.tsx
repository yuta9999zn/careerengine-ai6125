
import React, { useState } from 'react';
import { UserProfile, Skill, Experience } from '../types';

interface ProfileSectionProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleSkillChange = (index: number, field: keyof Skill, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setFormData({ ...formData, skills: newSkills });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: '', level: 'Beginner' }]
    });
  };

  const save = () => {
    onUpdate(formData);
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Manage Professional Profile</h2>
          <p className="text-sm text-slate-500">Keep your information up to date for better AI recommendations.</p>
        </div>
        <button
          onClick={() => editing ? save() : setEditing(true)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            editing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {editing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase text-slate-400 tracking-wider">Basic Information</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              disabled={!editing}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg disabled:opacity-75 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Current Professional Title</label>
            <input
              type="text"
              disabled={!editing}
              value={formData.currentTitle}
              onChange={(e) => setFormData({...formData, currentTitle: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg disabled:opacity-75 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold uppercase text-slate-400 tracking-wider">Skill Inventory</h3>
            {editing && (
              <button onClick={addSkill} className="text-xs text-indigo-600 font-bold hover:underline">+ Add Skill</button>
            )}
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {formData.skills.map((skill, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Skill Name"
                  disabled={!editing}
                  value={skill.name}
                  onChange={(e) => handleSkillChange(idx, 'name', e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm disabled:opacity-75 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <select
                  disabled={!editing}
                  value={skill.level}
                  onChange={(e) => handleSkillChange(idx, 'level', e.target.value as any)}
                  className="w-32 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm disabled:opacity-75 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
