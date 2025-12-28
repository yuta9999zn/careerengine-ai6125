// services/ai/goal/goalPlanService.ts

import { callGemini } from "../gemini/geminiClient";
import { composePrompt } from "../gemini/promptComposer";
import { parseAndValidateJSON } from "../gemini/jsonValidator";

/**
 * =========================
 * INPUT TYPES
 * =========================
 */

export interface GoalPlanInput {
  USER_CONTEXT: {
    available_hours_per_week: number;
    preferred_learning_style: "THEORY" | "PRACTICE" | "MIXED";
    time_horizon_months: number;
  };

  CAREER_ROADMAP: {
    phase: "Short Term" | "Mid Term" | "Long Term";
    estimated_duration_months: number;
    skills: string[];
  }[];

  USER_PREFERENCES?: {
    focus_areas?: string[];
    intensity?: "LOW" | "MEDIUM" | "HIGH";
  };
}

/**
 * =========================
 * OUTPUT TYPE (OPTIONAL)
 * =========================
 * Bạn có thể làm chặt hơn sau bằng Zod/Ajv
 */
export interface GoalPlanOutput {
  goals: unknown[];
  weekly_learning_plan: unknown[];
  milestones: unknown[];
  assumptions: string[];
}

/**
 * =========================
 * MAIN SERVICE FUNCTION
 * =========================
 */

export async function runGoalPlan(
  input: GoalPlanInput
): Promise<GoalPlanOutput> {
  // 1. Load prompts (from public folder)
  const systemPrompt = await loadPromptSafe("/ai-prompts/system.prompt.md");
  const taskPrompt = await loadPromptSafe("/ai-prompts/goal-plan.prompt.md");

  // 2. Compose final prompt
  const finalPrompt = composePrompt(systemPrompt, taskPrompt, input);

  // 3. Call Gemini
  const rawOutput = await callGemini(finalPrompt);

  // 4. Validate JSON output
  const validatedOutput = parseAndValidateJSON<GoalPlanOutput>(rawOutput);

  // 5. Final sanity checks (lightweight guard)
  ensureValidGoalPlan(validatedOutput);

  return validatedOutput;
}

/**
 * =========================
 * INTERNAL HELPERS
 * =========================
 */

/**
 * Load prompt safely
 */
async function loadPromptSafe(path: string): Promise<string> {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load prompt file: ${path}`);
  }
  return res.text();
}

/**
 * Lightweight domain guar*
