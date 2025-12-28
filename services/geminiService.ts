
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, GapAnalysis, CareerPath } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are an Enterprise AI Career Engine. 
Your responsibility:
- Analyze structured input data.
- Apply business rules for skill matching and career progression.
- Generate deterministic JSON outputs.
- Never hallucinate features or data.
- Output ONLY valid JSON. No explanations.
- If data is missing, make minimal assumptions and mark them.`;

export const analyzeSkillGap = async (profile: UserProfile, jobDescription: string): Promise<GapAnalysis> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze the gap between this user profile and the job description.
    
    User Profile: ${JSON.stringify(profile)}
    Job Description: ${jobDescription}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          matchPercentage: { type: Type.NUMBER },
          missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          overlappingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          roleFitSummary: { type: Type.STRING }
        },
        required: ["matchPercentage", "missingSkills", "overlappingSkills", "recommendations", "roleFitSummary"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateCareerRoadmap = async (profile: UserProfile, dreamRole: string): Promise<CareerPath> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a step-by-step career roadmap from the current profile to the dream role.
    
    User Profile: ${JSON.stringify(profile)}
    Dream Role: ${dreamRole}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dreamRole: { type: Type.STRING },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING },
                estimatedTime: { type: Type.STRING },
                requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                actions: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["role", "estimatedTime", "requiredSkills", "actions"]
            }
          }
        },
        required: ["dreamRole", "roadmap"]
      }
    }
  });

  return JSON.parse(response.text);
};
