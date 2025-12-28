// tests/goal.contract.test.ts
import { runGoalPlan } from "@/services/ai/goal";

(async () => {
  console.log("Running goal contract test...");

  const roadmap = [
    {
      phase: "Short Term",
      estimated_duration_months: 2,
      skills: ["Java Core", "OOP"]
    },
    {
      phase: "Mid Term",
      estimated_duration_months: 3,
      skills: ["Spring Boot"]
    }
  ];

  const result = await runGoalPlan({
    USER_CONTEXT: {
      available_hours_per_week: 10,
      preferred_learning_style: "MIXED",
      time_horizon_months: 6
    },
    CAREER_ROADMAP: roadmap
  });

  // 1. goals tồn tại
  if (!Array.isArray(result.goals)) {
    throw new Error("goals must be an array");
  }

  // 2. weekly plan tồn tại
  if (!Array.isArray(result.weekly_learning_plan)) {
    throw new Error("weekly_learning_plan must be an array");
  }

  // 3. không có skill lạ
  const allowedSkills = roadmap.flatMap(r => r.skills);

  result.weekly_learning_plan.forEach(week => {
    if (!allowedSkills.includes(week.focus_skill)) {
      throw new Error(
        `Invalid skill detected: ${week.focus_skill}`
      );
    }
  });

  // 4. milestones phải có
  if (!Array.isArray(result.milestones) || result.milestones.length === 0) {
    throw new Error("milestones must not be empty");
  }

  console.log("Goal contract test PASSED");
})();

