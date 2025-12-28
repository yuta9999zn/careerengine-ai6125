export async function runCareerAnalysis(input: CareerAnalysisInput) {
  const systemPrompt = await loadPrompt("/ai-prompts/system.prompt.md");
  const taskPrompt = await loadPrompt("/ai-prompts/career-analysis.prompt.md");

  const prompt = composePrompt(systemPrompt, taskPrompt, input);
  const raw = await callGemini(prompt);

  return parseAndValidateJSON(raw);
}
