import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const projects = [
  {
    name: "E-commerce Website",
    client: "Nova Retail",
    progress: 82,
    status: "On track",
  },
  {
    name: "Brand Identity",
    client: "Vertex Labs",
    progress: 64,
    status: "In progress",
  },
  {
    name: "AI Customer Portal",
    client: "Orbit Systems",
    progress: 41,
    status: "In progress",
  },
];

const tasks = [
  {
    title: "Send proposal to Nova Retail",
    date: "Today",
    priority: "High",
  },
  {
    title: "Review homepage designs",
    date: "Tomorrow",
    priority: "Medium",
  },
  {
    title: "Prepare client presentation",
    date: "Aug 12",
    priority: "Low",
  },
];

export function DashboardContent() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Recent Projects</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Track the progress of your active projects.
            </p>
          </div>

          <Button variant="ghost" size="sm" className="gap-1">
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {projects.map((project) => (
            <div key={project.name} className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {project.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {project.client}
                  </p>
                </div>

                <Badge variant="secondary" className="shrink-0">
                  {project.status}
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <Progress value={project.progress} className="h-2" />
                <span className="w-9 text-right text-xs font-medium">
                  {project.progress}%
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upcoming Tasks</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Your next priorities.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.title}
              className="flex items-start gap-3 rounded-lg border p-3"
            >
              <div className="mt-0.5 rounded-full bg-muted p-1.5">
                <Clock3 className="h-3.5 w-3.5 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-5">{task.title}</p>

                <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {task.date}
                  </span>

                  <span>•</span>
                  <span>{task.priority} priority</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-muted p-2">
              <Sparkles className="h-4 w-4" />
            </div>

            <div>
              <CardTitle className="text-base">AI Insights</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Intelligent recommendations based on your workspace.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-medium">Project Health</span>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                Most active projects are progressing normally. Nova Retail is
                currently ahead of schedule.
              </p>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                <span className="text-sm font-medium">Task Risk</span>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                Three tasks may become overdue this week. Consider
                prioritizing the Nova Retail proposal.
              </p>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">AI Recommendation</span>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                Follow up with two clients who have not responded to recent
                project updates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}