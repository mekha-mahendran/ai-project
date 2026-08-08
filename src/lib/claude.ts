import { Anthropic } from "@anthropic-ai/sdk";

const model = "claude-3.5-mini";

function getClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("Missing ANTHROPIC_API_KEY");
  }

  return new Anthropic({ apiKey });
}

export async function createClaudeCompletion(prompt: string) {
  const client = getClient();

  // The SDK response shape can vary; use unknown and runtime checks.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any = await client.messages.create({
    model,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 1024,
  });

  const outputContent = response?.output?.content;

  const content = Array.isArray(outputContent)
    ? outputContent
        .map((block: unknown) => {
          if (typeof block === "string") return block;
          if (typeof block === "object" && block !== null) {
            const text = (block as { text?: unknown }).text;
            if (typeof text === "string") return text;
          }
          return "";
        })
        .join("")
    : typeof outputContent === "string"
    ? outputContent
    : "";

  return {
    text: content.trim(),
    tokens: typeof response?.usage?.total_tokens === "number" ? response.usage.total_tokens : null,
  };
}
