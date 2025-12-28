
export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface UserProfile {
  name: string;
  currentTitle: string;
  skills: Skill[];
  experience: Experience[];
}

export interface GapAnalysis {
  matchPercentage: number;
  missingSkills: string[];
  overlappingSkills: string[];
  recommendations: string[];
  roleFitSummary: string;
}

export interface CareerPathStep {
  role: string;
  estimatedTime: string;
  requiredSkills: string[];
  actions: string[];
}

export interface CareerPath {
  dreamRole: string;
  roadmap: CareerPathStep[];
}

export enum AppView {
  PROFILE = 'profile',
  ANALYSIS = 'analysis',
  ROADMAP = 'roadmap',
  INSIGHTS = 'insights'
}
