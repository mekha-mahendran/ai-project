"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Priority = "High" | "Medium" | "Low";

type Task = {
  id: string;
  title: string;
  projectName: string | null;
  priority?: Priority;
  dueDate?: string | null;
  status: string;
};

type Props = { initialTasks: Task[] };

export default function TasksClient({ initialTasks }: Props) {
  const router = useRouter();
  const [columns] = useState(() => {
    const map: Record<string, Task[]> = { TODO: [], IN_PROGRESS: [], REVIEW: [], DONE: [] };

    initialTasks.forEach((t) => {
      map[t.status] = map[t.status] || [];
      map[t.status].push(t);
    });

    return [
      { title: "To Do", key: "TODO", tasks: map.TODO },
      { title: "In Progress", key: "IN_PROGRESS", tasks: map.IN_PROGRESS },
      { title: "Review", key: "REVIEW", tasks: map.REVIEW },
      { title: "Done", key: "DONE", tasks: map.DONE },
    ];
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [projectName, setProjectName] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [date, setDate] = useState("");

  const resetForm = () => {
    setTitle("");
    setProjectName("");
    setPriority("Medium");
    setDate("");
  };

  const handleAddTask = async () => {
    if (!title.trim() || !projectName.trim()) return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), projectName: projectName.trim(), dueDate: date || null }),
    });

    resetForm();
    setIsDialogOpen(false);
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Workspace</p>
          <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your work and keep projects moving forward.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <Button className="gap-2" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Task
          </Button>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input id="task-title" placeholder="e.g. Design landing page" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-project">Project</Label>
                <Input id="task-project" placeholder="e.g. E-commerce Website" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="task-date">Due Date</Label>
                  <Input id="task-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => { resetForm(); setIsDialogOpen(false); }}>
                Cancel
              </Button>

              <Button type="button" onClick={handleAddTask} disabled={!title.trim() || !projectName.trim()}>
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 overflow-x-auto pb-2 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((column) => (
          <Card key={column.title} className="min-w-[280px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">{column.title}</CardTitle>
                <Badge variant="secondary">{column.tasks.length}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {column.tasks.map((task) => (
                <div key={task.id} className="rounded-xl border bg-background p-4 shadow-sm">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium leading-5">{task.title}</p>
                      <Badge variant={task.priority === "High" ? "destructive" : "secondary"} className="shrink-0">{task.priority ?? "Medium"}</Badge>
                    </div>

                    <p className="text-xs text-muted-foreground">{task.projectName}</p>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {task.dueDate ?? "No date"}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
