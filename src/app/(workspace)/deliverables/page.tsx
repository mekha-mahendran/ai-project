import { CheckCircle2, ClipboardList, Receipt, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const deliverables = [
  {
    title: "Nova Retail Website Proposal",
    type: "Proposal",
    client: "Nova Retail",
    due: "Aug 15",
    status: "Draft",
  },
  {
    title: "Vertex Labs Onboarding Plan",
    type: "Scope Document",
    client: "Vertex Labs",
    due: "Aug 18",
    status: "Review",
  },
  {
    title: "Orbit Systems Invoice #1124",
    type: "Invoice",
    client: "Orbit Systems",
    due: "Aug 20",
    status: "Sent",
  },
];

const statusVariant = (status: string) =>
  status === "Draft"
    ? "outline"
    : status === "Review"
    ? "secondary"
    : "default";

export default function DeliverablesPage() {
  return (
    <main className="min-h-screen bg-muted/20 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Workspace</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Deliverables
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage proposals, invoices, and client-facing documents.
            </p>
          </div>

          <Button className="gap-2">
            <Send className="h-4 w-4" />
            New Deliverable
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Open deliverables</CardTitle>
              <CardDescription>
                Track items that need review or finalization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-muted p-4">
                  <div>
                    <p className="text-sm font-medium">In progress</p>
                    <p className="text-xs text-muted-foreground">4 items</p>
                  </div>
                  <ClipboardList className="h-5 w-5 text-primary" />
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-muted p-4">
                  <div>
                    <p className="text-sm font-medium">Awaiting approval</p>
                    <p className="text-xs text-muted-foreground">2 items</p>
                  </div>
                  <Receipt className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent sent</CardTitle>
              <CardDescription>
                Deliverables that have recently been shared with clients.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {deliverables.slice(0, 2).map((item) => (
                <div key={item.title} className="rounded-3xl border border-border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.client} · {item.type}
                      </p>
                    </div>
                    <Badge variant="secondary">{item.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Due {item.due}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ready to send</CardTitle>
              <CardDescription>
                Deliverables that are almost ready for client distribution.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-3xl border border-border p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Copywriting brief</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Vertex Labs · Proposal
                    </p>
                  </div>
                  <Badge variant="secondary">Final review</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Deliverables list</CardTitle>
            <CardDescription>
              A quick view of all current docs and invoices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deliverables.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-3xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.client} · {item.type}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <Badge variant={statusVariant(item.status)}>
                    {item.status}
                  </Badge>
                  <span className="text-muted-foreground">Due {item.due}</span>
                  <div className="inline-flex items-center gap-1 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    Published
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
