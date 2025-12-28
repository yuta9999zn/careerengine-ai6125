export function composePrompt(
  systemPrompt: string,
  taskPrompt: string,
  input: unknown
) {
  return `
${systemPrompt}

${taskPrompt}

INPUT_DATA:
${JSON.stringify(input, null, 2)}
`;
}
