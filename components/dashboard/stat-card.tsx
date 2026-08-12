import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  tone?: "default" | "danger" | "warning" | "success" | "info";
}) {
  const toneClasses: Record<string, string> = {
    default: "text-foreground",
    danger: "text-destructive",
    warning: "text-warning",
    success: "text-success",
    info: "text-primary",
  };

  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className={cn("mt-1 text-2xl font-semibold tabular-nums", toneClasses[tone])}>
            {value}
          </p>
        </div>
        {Icon && (
          <div className="rounded-full bg-muted p-2">
            <Icon className={cn("size-4", toneClasses[tone])} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
