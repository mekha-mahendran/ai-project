import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requireUser } from "@/lib/auth";

export default async function OnboardingPage() {
  await requireUser();

  return (
    <main className="min-h-screen bg-muted/20 p-4 md:p-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 shadow-lg shadow-black/5">
        <div className="mb-8 space-y-3 text-center">
          <Badge variant="secondary">Welcome</Badge>
          <h1 className="text-3xl font-semibold">Set up your agency workspace</h1>
          <p className="max-w-2xl mx-auto text-sm text-muted-foreground">
            Create your organization and get started with AI Agency OS.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Organization details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="organization-name">Organization name</Label>
                  <Input id="organization-name" placeholder="Acme Agency" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization-slug">Workspace slug</Label>
                  <Input id="organization-slug" placeholder="acme-agency" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What to expect</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                After setup, you can manage clients, projects, tasks, deliverables, and AI workflows from the dashboard.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button>Continue</Button>
        </div>
      </div>
    </main>
  );
}
