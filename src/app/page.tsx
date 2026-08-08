import Link from "next/link";
import { ArrowRight, Sparkles, Users, FolderKanban, CheckSquare2, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-muted/20 px-4 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <section className="grid gap-10 rounded-[2rem] border border-border bg-card p-10 shadow-lg shadow-black/5 md:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm text-secondary-foreground">
              <Sparkles className="h-4 w-4" />
              AI Agency OS for modern service teams
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Build, deliver, and scale your AI-powered agency in one workspace.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                Manage clients, projects, tasks, deliverables, and AI workflows with a polished SaaS dashboard built for agencies.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Get started
              </Link>
              <Link href="/sign-in" className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted/70">
                Sign in
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl bg-muted p-6">
            {[
              { icon: Users, title: "Clients", description: "Keep all client details and relationships organized." },
              { icon: FolderKanban, title: "Projects", description: "Track work progress from brief to delivery." },
              { icon: CheckSquare2, title: "Tasks", description: "Manage task boards and team priorities." },
              { icon: BarChart3, title: "Analytics", description: "Review performance and AI usage in one place." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-border bg-background p-5 shadow-sm">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Responsive UI", description: "Designed for desktop, tablet, and mobile." },
            { title: "AI-powered tools", description: "Proposal, email, and summarization workflows." },
            { title: "Multi-tenant ready", description: "User and organization aware data isolation." },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-border bg-card p-6">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="flex items-center justify-between rounded-3xl border border-border bg-card p-8">
          <div>
            <h2 className="text-2xl font-semibold">Ready to run your agency with AI?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Start with a polished workspace that combines client management, task tracking, and AI deliverables.
            </p>
          </div>
          <Link href="/sign-up" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
            Start your workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
