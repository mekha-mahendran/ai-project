import { CalendarDays, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const columns = [
  {
    title: "To Do",
    tasks: [
      {
        title: "Send proposal to Nova Retail",
        project: "E-commerce Website",
        priority: "High",
        date: "Today",
      },
      {
        title: "Prepare project brief",
        project: "AI Customer Portal",
        priority: "Medium",
        date: "Aug 10",
      },
    ],
  },
  {
    title: "In Progress",
    tasks: [
      {
        title: "Review homepage designs",
        project: "Brand Identity",
        priority: "Medium",
        date: "Tomorrow",
      },
      {
        title: "Build customer dashboard",
        project: "AI Customer Portal",
        priority: "High",
        date: "Aug 12",
      },
    ],
  },
  {
    title: "Review",
    tasks: [
      {
        title: "Review logo concepts",
        project: "Brand Identity",
        priority: "Low",
        date: "Aug 11",
      },
    ],
  },
  {
    title: "Done",
    tasks: [
      {
        title: "Finalize project requirements",
        project: "E-commerce Website",
        priority: "High",
        date: "Aug 7",
      },
    ],
  },
];

export default function TasksPage() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Workspace</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Tasks
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your work and keep projects moving forward.
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="grid gap-4 overflow-x-auto pb-2 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((column) => (
          <Card key={column.title} className="min-w-[280px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">
                  {column.title}
                </CardTitle>

                <Badge variant="secondary">
                  {column.tasks.length}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {column.tasks.map((task) => (
                <div
                  key={task.title}
                  className="rounded-xl border bg-background p-4 shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium leading-5">
                        {task.title}
                      </p>

                      <Badge
                        variant={
                          task.priority === "High"
                            ? "destructive"
                            : "secondary"
                        }
                        className="shrink-0"
                      >
                        {task.priority}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {task.project}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {task.date}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
