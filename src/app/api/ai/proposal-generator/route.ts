import { NextResponse } from "next/server";
import { z } from "zod";

import { requireOrganization } from "@/lib/auth";
import { createAIRequest, generateAICompletion } from "@/lib/ai";
import { aiProposalSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = aiProposalSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 422 });
  }

  const { clientName, projectName, services, budget, timeline, details } = parsed.data;
  const { organization, userId } = await requireOrganization();

  const prompt = `Create a polished proposal for ${clientName} to deliver ${projectName}. Include the scope of work, services offered, budget guidance, timeline, and any additional notes: ${details ?? "No additional details provided."}. Keep the proposal structured, client-facing, and professional.`;

  const completion = await generateAICompletion(prompt);
  const response = completion.text;

  await createAIRequest({
    userId,
    organizationId: organization.id,
    type: "PROPOSAL",
    prompt,
    response,
    tokensUsed: completion.tokens,
  });

  return NextResponse.json({ result: response });
}
