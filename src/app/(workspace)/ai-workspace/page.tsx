import Link from "next/link";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tools = [
  {
    title: "Email Writer",
    description:
      "Generate client-ready emails and follow ups with AI-crafted copy.",
    icon: Star,
    href: "/ai-workspace/email-writer",
  },
  {
    title: "Proposal Generator",
    description: "Create polished proposals that close deals faster.",
    icon: Zap,
    href: "/ai-workspace/proposal-generator",
  },
  {
    title: "Summary Assistant",
    description: "Summarize meeting notes, deliverables, and status updates.",
    icon: Sparkles,
    href: "/ai-workspace/summarizer",
  },
];

export default function AiWorkspacePage() {
  return (
    <main className="min-h-screen bg-muted/20 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-background p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">AI Workspace</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Supercharge your agency with AI.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Access AI-powered tools built for client communication, proposal
              creation, and knowledge capture. Keep your team focused on high-
              value work.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-[auto_auto]">
            <Badge variant="secondary">Workspace AI</Badge>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
            >
              Go to overview
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Card key={tool.title} className="group">
                <CardHeader className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">{tool.title}</CardTitle>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-muted p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </CardHeader>

                <CardContent className="flex items-end justify-between">
                  <Link
                    href={tool.href}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
                  >
                    Open
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    AI tool
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI activity snapshot</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Quick insights from your latest AI-enabled workflows.
            </p>
          </CardHeader>

          <CardContent className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-border bg-muted/50 p-5">
              <p className="text-sm font-medium">Recent actions</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Generated 24 proposals and 16 summaries in the last 7 days.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-muted/50 p-5">
              <p className="text-sm font-medium">Top workflow</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Email drafts are converting at 18% higher response rate than
                manual outreach.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-muted/50 p-5">
              <p className="text-sm font-medium">Recommended next step</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Use the proposal generator for your next client pitch to save
                time and standardize delivery.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
