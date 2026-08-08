import { prisma } from "@/lib/db";
import { AIRequestType } from "@prisma/client";
import { createClaudeCompletion } from "@/lib/claude";

export async function createAIRequest(params: {
  userId: string;
  organizationId: string;
  type: AIRequestType;
  prompt: string;
  response: string;
  tokensUsed?: number | null;
}) {
  return prisma.aIRequest.create({
    data: {
      userId: params.userId,
      organizationId: params.organizationId,
      type: params.type,
      prompt: params.prompt,
      response: params.response,
      tokensUsed: params.tokensUsed ?? undefined,
    },
  });
}

export async function generateAICompletion(prompt: string) {
  return createClaudeCompletion(prompt);
}
