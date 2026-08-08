"use client";

import { useState } from "react";
import { Loader2, Mail, Paperclip, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const toneOptions = ["Professional", "Friendly", "Formal", "Concise"];

export default function EmailWriterPage() {
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("Professional");
  const [context, setContext] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = recipient.trim() && purpose.trim() && context.trim();

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError("Please complete all required fields before generating your email.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ai/email-writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, purpose, context, tone }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error?.message || "Unable to generate email.");
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
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Email Writer</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Generate client-ready emails, follow-ups, and outreach copy with an AI assistant trained for agency communication.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-[auto_auto]">
            <Badge variant="secondary">Email Writer</Badge>
            <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground">
              <Mail className="h-4 w-4" />
              AI Drafts
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Write a new email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient</Label>
                  <Input
                    id="recipient"
                    value={recipient}
                    onChange={(event) => setRecipient(event.target.value)}
                    placeholder="Client name or recipient"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Input
                    id="purpose"
                    value={purpose}
                    onChange={(event) => setPurpose(event.target.value)}
                    placeholder="e.g. project update, proposal follow-up"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(event) => setTone(event.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {toneOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="context">Email context</Label>
                  <span className="text-xs text-muted-foreground">Required</span>
                </div>
                <Textarea
                  id="context"
                  value={context}
                  onChange={(event) => setContext(event.target.value)}
                  placeholder="Add details, objectives, project updates, and any relevant background for the recipient."
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    AI-generated emails are designed to save time while keeping your message professional and client-friendly.
                  </p>
                </div>
                <Button onClick={handleSubmit} disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating
                    </>
                  ) : (
                    "Generate email"
                  )}
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
              <CardTitle>Output</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {status === "idle" ? (
                <div className="rounded-3xl border border-dashed border-border bg-muted/50 p-8 text-center text-sm text-muted-foreground">
                  Enter your email details and generate a polished copy here.
                </div>
              ) : status === "loading" ? (
                <div className="rounded-3xl border border-border bg-muted/50 p-8 text-center text-sm text-muted-foreground">
                  Generating your email
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
                  <Button
                    variant="outline"
                    onClick={async () => {
                      await navigator.clipboard.writeText(result);
                    }}
                  >
                    <Paperclip className="mr-2 h-4 w-4" /> Copy email
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
