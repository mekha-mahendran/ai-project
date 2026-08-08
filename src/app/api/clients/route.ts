import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireOrganization } from "@/lib/auth";

export async function POST(req: Request) {
  const { name, email, company, phone, notes, status } = await req.json();

  const { organization } = await requireOrganization();

  const client = await prisma.client.create({
    data: {
      organizationId: organization.id,
      name,
      email,
      company: company ?? "",
      phone: phone ?? null,
      notes: notes ?? null,
      status: status ?? "ACTIVE",
    },
  });

  return NextResponse.json(client, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, name, email, company, phone, notes, status } = await req.json();

  const { organization } = await requireOrganization();

  const existing = await prisma.client.findUnique({ where: { id } });

  if (!existing || existing.organizationId !== organization.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.client.update({
    where: { id },
    data: {
      name,
      email,
      company: company ?? existing.company,
      phone: phone ?? existing.phone,
      notes: notes ?? existing.notes,
      status: status ?? existing.status,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { organization } = await requireOrganization();

  const existing = await prisma.client.findUnique({ where: { id } });

  if (!existing || existing.organizationId !== organization.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.client.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
