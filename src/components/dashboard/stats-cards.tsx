import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  ClipboardList,
  FolderKanban,
  Receipt,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    title: "Total Revenue",
    value: "$24,580",
    change: "+12.5%",
    description: "from last month",
    icon: CircleDollarSign,
    positive: true,
  },
  {
    title: "Active Projects",
    value: "12",
    change: "+2",
    description: "from last month",
    icon: FolderKanban,
    positive: true,
  },
  {
    title: "Pending Tasks",
    value: "28",
    change: "-8.2%",
    description: "from last month",
    icon: ClipboardList,
    positive: true,
  },
  {
    title: "Outstanding Invoices",
    value: "$8,420",
    change: "+4.6%",
    description: "from last month",
    icon: Receipt,
    positive: false,
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const ChangeIcon = stat.positive ? ArrowUpRight : ArrowDownRight;

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>

              <div className="rounded-lg bg-muted p-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </div>

              <div className="mt-2 flex items-center gap-1 text-xs">
                <span
                  className={
                    stat.positive
                      ? "flex items-center font-medium text-emerald-600 dark:text-emerald-400"
                      : "flex items-center font-medium text-amber-600 dark:text-amber-400"
                  }
                >
                  <ChangeIcon className="mr-0.5 h-3.5 w-3.5" />
                  {stat.change}
                </span>

                <span className="text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}