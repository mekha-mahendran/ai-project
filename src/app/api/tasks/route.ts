import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireOrganization } from "@/lib/auth";

export async function POST(req: Request) {
  const { title, projectName, dueDate } = await req.json();

  const { organization } = await requireOrganization();

  // find or create project by name
  let project = await prisma.project.findFirst({ where: { name: projectName, organizationId: organization.id } });

  if (!project) {
    project = await prisma.project.create({ data: { organizationId: organization.id, name: projectName } });
  }

  const task = await prisma.task.create({
    data: {
      projectId: project.id,
      title,
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  });

  return NextResponse.json(task, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, status, order } = await req.json();

  const { organization } = await requireOrganization();

  const existing = await prisma.task.findUnique({ where: { id }, include: { project: true } });

  if (!existing || existing.project.organizationId !== organization.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.task.update({ where: { id }, data: { status, order } });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { organization } = await requireOrganization();

  const existing = await prisma.task.findUnique({ where: { id }, include: { project: true } });

  if (!existing || existing.project.organizationId !== organization.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.task.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
