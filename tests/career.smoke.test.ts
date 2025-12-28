// tests/career.smoke.test.ts
import { runCareerAnalysis } from "@/services/ai/career";

(async () => {
  console.log("Running career smoke test...");

  const result = await runCareerAnalysis({
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

  if (!result || typeof result !== "object") {
    throw new Error("Career smoke test FAILED: result is invalid");
  }

  console.log("Career smoke test PASSED");
})();

