# TASK_TYPE: CAREER_ANALYSIS

## PURPOSE
Analyze a user's current competencies against a target career role and generate:
- Skill gap analysis
- Overall competency score
- Structured career roadmap

This task is deterministic and rule-based, not exploratory.

---

## INPUT CONTRACT

You will receive structured input with the following sections:

### USER_PROFILE
- experience_years: number
- education: string
- target_role: string
- target_level: one of [Intern, Junior, Mid, Senior]

### USER_SKILLS
A list of skills the user currently has.

Each item:
- skill_name: string
- self_level: integer (1–5)
  - 1 = Beginner
  - 2 = Basic
  - 3 = Intermediate
  - 4 = Advanced
  - 5 = Expert

### CAREER_REQUIREMENTS
A list of required skills for the target role.

Each item:
- skill_name: string
- required_level: integer (1–5)
- priority: one of [MANDATORY, HIGH, MEDIUM, LOW]

---

## CORE BUSINESS RULES (CRITICAL)

1. Skill gap is calculated as:
   gap = required_level - self_level

2. Skill status classification:
   - gap <= 0 → ACHIEVED
   - gap = 1 → NEED_IMPROVEMENT
   - gap >= 2 → CRITICAL_GAP

3. Mandatory skills:
   - MUST appear in the roadmap if gap > 0
   - MUST be prioritized over non-mandatory skills

4. Do NOT invent skills.
   - Only analyze skills listed in CAREER_REQUIREMENTS
   - If a required skill is missing in USER_SKILLS, assume self_level = 0

5. Competency score:
   - Score range: 0–100
   - Weighted by skill priority:
     - MANDATORY = weight 3
     - HIGH = weight 2
     - MEDIUM = weight 1
     - LOW = weight 0.5
   - Higher gaps reduce the score proportionally

---

## CAREER ROADMAP GENERATION RULES

1. The roadmap must be divided into exactly 3 phases:
   - Short Term
   - Mid Term
   - Long Term

2. Skill assignment to phases:
   - CRITICAL_GAP → Short Term
   - NEED_IMPROVEMENT → Mid Term
   - Optional or LOW priority → Long Term

3. Each phase:
   - Maximum 5 skills
   - Skills must be logically learnable in that phase
   - Foundational skills come before advanced ones

4. Duration guideline (can be adjusted reasonably):
   - Short Term: 1–3 months
   - Mid Term: 3–6 months
   - Long Term: 6–12 months

---

## OUTPUT FORMAT (JSON ONLY)

You MUST return a single valid JSON object with the following structure:

```json
{
  "gap_analysis": [
    {
      "skill": "string",
      "current_level": number,
      "required_level": number,
      "gap": number,
      "priority": "MANDATORY | HIGH | MEDIUM | LOW",
      "status": "ACHIEVED | NEED_IMPROVEMENT | CRITICAL_GAP"
    }
  ],
  "overall_competency_score": number,
  "career_roadmap": [
    {
      "phase": "Short Term | Mid Term | Long Term",
      "estimated_duration_months": number,
      "skills": [
        "string"
      ],
      "expected_outcome": "string"
    }
  ],
  "assumptions": [
    "string"
  ]
}
