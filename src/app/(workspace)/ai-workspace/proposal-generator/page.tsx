"use client";

import { useState } from "react";
import { ClipboardList, FileText, Rocket } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProposalGeneratorPage() {
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [services, setServices] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [details, setDetails] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = clientName.trim() && projectName.trim() && services.trim() && budget.trim() && timeline.trim();

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError("Please complete all required fields before generating the proposal.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/ai/proposal-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, projectName, services, budget, timeline, details }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error?.message || "Unable to generate proposal.");
      }

      setResult(json.result);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-muted/20 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-background p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">AI Workspace</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Proposal Generator</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Build polished proposals fast with AI-guided structure, scope, and a client-ready service summary.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-[auto_auto]">
            <Badge variant="secondary">Proposal</Badge>
            <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground">
              <Rocket className="h-4 w-4" /> Fast drafts
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Proposal inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Client name</Label>
                  <Input id="client-name" value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="e.g. Nova Retail" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project name</Label>
                  <Input id="project-name" value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="e.g. Website redesign" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="services">Services summary</Label>
                <Textarea id="services" value={services} onChange={(event) => setServices(event.target.value)} placeholder="List the services or deliverables included in the proposal." />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input id="budget" value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="e.g. $12,000 - $15,000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input id="timeline" value={timeline} onChange={(event) => setTimeline(event.target.value)} placeholder="e.g. 6 weeks" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Additional context</Label>
                <Textarea id="details" value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Add any notes, client preferences, or scope details to refine the proposal." />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Submit your proposal details, and the AI will return a structured document outline with a persuasive narrative.
                  </p>
                </div>
                <Button onClick={handleSubmit} disabled={status === "loading"}>
                  {status === "loading" ? "Generating..." : "Generate proposal"}
                </Button>
              </div>

              {status === "error" && error ? (
                <div className="rounded-2xl border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
                  {error}
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Proposal output</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {status === "idle" ? (
                <div className="rounded-3xl border border-dashed border-border bg-muted/50 p-8 text-center text-sm text-muted-foreground">
                  Your proposal will appear here after generation.
                </div>
              ) : status === "loading" ? (
                <div className="rounded-3xl border border-border bg-muted/50 p-8 text-center text-sm text-muted-foreground">
                  Creating your proposal draft...
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="rounded-3xl border border-border bg-background p-4 text-sm leading-7 text-foreground">
                    {result.split("\n").map((line, index) => (
                      <p key={index} className={line.trim() ? "mb-2" : "mb-0"}>
                        {line}
                      </p>
                    ))}
                  </div>
                  <Button variant="outline" onClick={async () => { await navigator.clipboard.writeText(result); }}>
                    <ClipboardList className="mr-2 h-4 w-4" /> Copy proposal
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
