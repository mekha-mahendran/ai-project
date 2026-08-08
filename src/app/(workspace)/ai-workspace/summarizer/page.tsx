"use client";

import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SummarizerPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter the text you want summarized.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/ai/summarizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error?.message || "Unable to generate summary.");
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
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Summarizer</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Convert long notes, client updates, and meeting summaries into clear, concise action-oriented summaries.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-[auto_auto]">
            <Badge variant="secondary">Summarizer</Badge>
            <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4" /> Clarity
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Input text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="summary-text">Text to summarize</Label>
                  <span className="text-xs text-muted-foreground">Required</span>
                </div>
                <Textarea
                  id="summary-text"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Paste your meeting notes, client conversation, or project update here."
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Generate a concise summary with the key outcomes and next steps, so your team can move faster.
                  </p>
                </div>
                <Button onClick={handleSubmit} disabled={status === "loading"}>
                  {status === "loading" ? "Summarizing..." : "Generate summary"}
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
              <CardTitle>Summary output</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {status === "idle" ? (
                <div className="rounded-3xl border border-dashed border-border bg-muted/50 p-8 text-center text-sm text-muted-foreground">
                  The summary will appear here when generation is complete.
                </div>
              ) : status === "loading" ? (
                <div className="rounded-3xl border border-border bg-muted/50 p-8 text-center text-sm text-muted-foreground">
                  Producing your summary...
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
                    <FileText className="mr-2 h-4 w-4" /> Copy summary
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
