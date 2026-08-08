import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function requireUser() {
  const authState = await auth();

  if (!authState.userId) {
    redirect("/sign-in");
  }

  return authState.userId;
}

export async function getOrganizationForUser(userId: string) {
  const membership = await prisma.membership.findFirst({
    where: { userId },
    include: { organization: true },
  });

  return membership?.organization ?? null;
}

export async function requireOrganization() {
  const userId = await requireUser();
  const organization = await getOrganizationForUser(userId);

  if (!organization) {
    redirect("/onboarding");
  }

  return { userId, organization };
}
