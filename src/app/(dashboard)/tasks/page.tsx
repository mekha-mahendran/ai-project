"use client";

import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Priority = "High" | "Medium" | "Low";

type Task = {
  title: string;
  project: string;
  priority: Priority;
  date: string;
};

type Column = {
  title: string;
  tasks: Task[];
};

const initialColumns: Column[] = [
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
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [date, setDate] = useState("");

  const resetForm = () => {
    setTitle("");
    setProject("");
    setPriority("Medium");
    setDate("");
  };

  const handleAddTask = () => {
    if (!title.trim() || !project.trim() || !date) {
      return;
    }

    const newTask: Task = {
      title: title.trim(),
      project: project.trim(),
      priority,
      date,
    };

    setColumns((currentColumns) =>
      currentColumns.map((column) =>
        column.title === "To Do"
          ? {
              ...column,
              tasks: [...column.tasks, newTask],
            }
          : column,
      ),
    );

    resetForm();
    setIsDialogOpen(false);
  };

  return (
    <main className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Workspace</p>

          <h1 className="text-2xl font-semibold tracking-tight">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your work and keep projects moving forward.
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);

            if (!open) {
              resetForm();
            }
          }}
        >
          <Button className="gap-2" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Task
          </Button>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>

              <DialogDescription>
                Create a new task and add it to your To Do list.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">Task Title</Label>

                <Input
                  id="task-title"
                  placeholder="e.g. Design landing page"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-project">Project</Label>

                <Input
                  id="task-project"
                  placeholder="e.g. E-commerce Website"
                  value={project}
                  onChange={(event) => setProject(event.target.value)}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Priority</Label>

                  <Select
                    value={priority}
                    onValueChange={(value) =>
                      setPriority(value as Priority)
                    }
                  >
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

                  <Input
                    id="task-date"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(false);
                }}
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleAddTask}
                disabled={!title.trim() || !project.trim() || !date}
              >
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
                <CardTitle className="text-sm font-semibold">
                  {column.title}
                </CardTitle>

                <Badge variant="secondary">
                  {column.tasks.length}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {column.tasks.map((task, index) => (
                <div
                  key={`${task.title}-${index}`}
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
