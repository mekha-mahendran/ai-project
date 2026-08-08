"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const revenue = [
  { month: "Apr", revenue: 14500 },
  { month: "May", revenue: 16800 },
  { month: "Jun", revenue: 19500 },
  { month: "Jul", revenue: 22800 },
  { month: "Aug", revenue: 24800 },
];

const deliveryBreakdown = [
  { name: "Proposals", value: 45 },
  { name: "Invoices", value: 30 },
  { name: "Summaries", value: 25 },
];

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-muted/20 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Workspace</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Analytics
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review performance metrics across projects, tasks, and AI usage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary">Live</Badge>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              Updated 10 minutes ago
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Monthly revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">$24.6K</p>
              <p className="mt-2 text-sm text-muted-foreground">+8.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Active projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">12</p>
              <p className="mt-2 text-sm text-muted-foreground">3 are high priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Task completion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">72%</p>
              <p className="mt-2 text-sm text-muted-foreground">On track for monthly goals</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">AI usage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">1.4K</p>
              <p className="mt-2 text-sm text-muted-foreground">Actions performed this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
          <Card className="h-[420px]">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Revenue trend</CardTitle>
              <div className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                Monthly growth
              </div>
            </CardHeader>
            <CardContent className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenue} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f766e" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e6e8ec" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#0f766e" fill="url(#revenueGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="h-[420px]">
            <CardHeader>
              <CardTitle>Deliverables distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    stroke="transparent"
                    fill="#0f766e"
                  >
                    {deliveryBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={index === 0 ? "#0f766e" : index === 1 ? "#2563eb" : "#7c3aed"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-muted/50 p-5">
              <p className="text-sm font-medium">Average response time</p>
              <p className="mt-2 text-xl font-semibold">1.8h</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Faster than last month by 22%.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-muted/50 p-5">
              <p className="text-sm font-medium">Client satisfaction</p>
              <p className="mt-2 text-xl font-semibold">4.9 / 5</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Based on stable feedback from recent proposals.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-muted/50 p-5">
              <p className="text-sm font-medium">AI conversion lift</p>
              <p className="mt-2 text-xl font-semibold">+14%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                AI assistance is helping your team close work faster.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
