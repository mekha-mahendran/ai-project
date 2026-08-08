import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { requireOrganization } from "@/lib/auth";
import { generateAICompletion, createAIRequest } from "@/lib/ai";
import { aiEmailSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = aiEmailSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 422 });
  }

  const { recipient, purpose, context, tone } = parsed.data;
  const { organization, userId } = await requireOrganization();

  const prompt = `Write a polished, professional email to ${recipient} that is intended for ${purpose}. Use a ${tone.toLowerCase()} tone and include the following context: ${context}. Start with a friendly greeting, provide a clear body, and end with a strong closing statement.`;

  const completion = await generateAICompletion(prompt);
  const response = completion.text;

  await createAIRequest({
    userId,
    organizationId: organization.id,
    type: "EMAIL",
    prompt,
    response,
    tokensUsed: completion.tokens,
  });

  return NextResponse.json({ result: response });
}
