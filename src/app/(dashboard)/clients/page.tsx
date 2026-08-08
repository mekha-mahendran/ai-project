import { Plus, Search, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const clients = [
  {
    name: "Nova Retail",
    email: "hello@novaretail.com",
    projects: 3,
    status: "Active",
    initials: "NR",
  },
  {
    name: "Vertex Labs",
    email: "team@vertexlabs.com",
    projects: 2,
    status: "Active",
    initials: "VL",
  },
  {
    name: "Orbit Systems",
    email: "contact@orbitsystems.com",
    projects: 1,
    status: "Active",
    initials: "OS",
  },
  {
    name: "Apex Studio",
    email: "hello@apexstudio.com",
    projects: 0,
    status: "Lead",
    initials: "AS",
  },
];

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-muted/20 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-muted-foreground">Workspace</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Clients
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your clients and relationships.
            </p>
          </div>

          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">
              All Clients ({clients.length})
            </CardTitle>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search clients..." className="pl-9" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              {clients.map((client) => (
                <div
                  key={client.email}
                  className="flex flex-col gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{client.initials}</AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {client.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="hidden text-muted-foreground sm:block">
                      <span className="font-medium text-foreground">
                        {client.projects}
                      </span>{" "}
                      projects
                    </div>

                    <Badge
                      variant={
                        client.status === "Active" ? "secondary" : "outline"
                      }
                    >
                      {client.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {clients.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="font-medium">No clients found</p>
                <p className="text-sm text-muted-foreground">
                  Add your first client to get started.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}