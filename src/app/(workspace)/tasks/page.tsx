import { prisma } from "@/lib/db";
import { requireOrganization } from "@/lib/auth";
import TasksClient from "@/components/tasks/tasks-client";

export default async function TasksPage() {
  const { organization } = await requireOrganization();

  const tasks = await prisma.task.findMany({
    where: { project: { organizationId: organization.id } },
    include: { project: true },
    orderBy: { createdAt: "desc" },
  });

  const initialTasks = tasks.map((t) => ({
    id: t.id,
    title: t.title,
    projectName: t.project?.name ?? null,
    dueDate: t.dueDate ? t.dueDate.toISOString().split("T")[0] : null,
    status: t.status,
  }));

  return (
    <main className="flex-1 space-y-6 p-6">
      <TasksClient initialTasks={initialTasks} />
    </main>
  );
}
