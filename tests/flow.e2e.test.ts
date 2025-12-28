// tests/flow.e2e.test.ts
import { runCareerAnalysis } from "@/services/ai/career";
import { runGoalPlan } from "@/services/ai/goal";

(async () => {
  console.log("Running E2E flow test...");

  const careerResult = await runCareerAnalysis({
    USER_PROFILE: {
      experience_years: 0,
      education: "University",
      target_role: "Backend Developer",
      target_level: "Junior"
    },
    USER_SKILLS: [
      { skill_name: "Java", self_level: 2 }
    ],
    CAREER_REQUIREMENTS: [
      { skill_name: "Java", required_level: 4, priority: "MANDATORY" },
      { skill_name: "Spring Boot", required_level: 3, priority: "HIGH" }
    ]
  });

  if (!careerResult.career_roadmap) {
    throw new Error("Career roadmap missing");
  }

  const goalResult = await runGoalPlan({
    USER_CONTEXT: {
      available_hours_per_week: 8,
      preferred_learning_style: "MIXED",
      time_horizon_months: 6
    },
    CAREER_ROADMAP: careerResult.career_roadmap
  });

  if (!goalResult.goals || !goalResult.weekly_learning_plan) {
    throw new Error("Goal plan generation failed");
  }

  console.log("E2E flow test PASSED");
})();

