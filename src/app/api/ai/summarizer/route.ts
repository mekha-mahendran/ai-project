import { NextResponse } from "next/server";

import { requireOrganization } from "@/lib/auth";
import { createAIRequest, generateAICompletion } from "@/lib/ai";
import { aiSummarySchema } from "@/lib/validators";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = aiSummarySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 422 });
  }

  const { text } = parsed.data;
  const { organization, userId } = await requireOrganization();

  const prompt = `Summarize the following text into a concise, executive style summary with clear outcomes and next steps: ${text}`;

  const completion = await generateAICompletion(prompt);
  const response = completion.text;

  await createAIRequest({
    userId,
    organizationId: organization.id,
    type: "SUMMARIZER",
    prompt,
    response,
    tokensUsed: completion.tokens,
  });

  return NextResponse.json({ result: response });
}
