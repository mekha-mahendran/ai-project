"use client";

import {
  BarChart3,
  Bell,
  CheckSquare,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Receipt,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const navigation = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Clients",
    icon: Users,
    href: "/clients",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    href: "/projects",
  },
  {
    label: "Tasks",
    icon: CheckSquare,
    href: "/tasks",
  },
  {
    label: "Invoices",
    icon: Receipt,
    href: "/deliverables",
  },
  {
    label: "AI Workspace",
    icon: Sparkles,
    href: "/ai-workspace",
  },
  {
    label: "Documents",
    icon: FileText,
    href: "/deliverables",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r bg-background md:flex">
      <div className="flex h-16 items-center gap-3 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
          <Sparkles className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold tracking-tight">AI Agency OS</p>
          <p className="text-xs text-muted-foreground">Workspace</p>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 space-y-1 px-3 py-5">
        <p className="mb-3 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-6">
          <p className="mb-3 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            System
          </p>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>

          <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </button>
        </div>
      </nav>

      <Separator />

      <div className="flex items-center gap-3 p-4">
        <Avatar className="h-9 w-9">
          <AvatarFallback>MM</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">Mekha</p>
          <p className="truncate text-xs text-muted-foreground">
            Agency Owner
          </p>
        </div>
      </div>
    </aside>
  );
}