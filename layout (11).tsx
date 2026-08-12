import { AlertTriangle, CalendarClock, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GROUPS = [
  {
    key: "overdue",
    label: "Overdue",
    icon: AlertTriangle,
    tone: "text-destructive",
    items: [{ title: "Payment API issue", detail: "Follow-up was due 5 days ago" }],
  },
  {
    key: "today",
    label: "Due Today",
    icon: Clock,
    tone: "text-warning",
    items: [{ title: "Customer export issue", detail: "Follow-up due today" }],
  },
  {
    key: "upcoming",
    label: "Upcoming",
    icon: CalendarClock,
    tone: "text-success",
    items: [{ title: "New reporting feature", detail: "Follow-up in 3 days" }],
  },
];

export default function FollowUpsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Follow-ups</h1>
        <p className="text-sm text-muted-foreground">
          Overdue, due-today, and upcoming follow-ups across every request.
        </p>
      </div>

      <div className="rounded-md border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        Showing sample follow-ups. Real overdue/due-today calculations are
        built in Phase 5, based on each request&apos;s Next Follow-up Date.
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {GROUPS.map((group) => (
          <Card key={group.key}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 text-base ${group.tone}`}>
                <group.icon className="size-4" />
                {group.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {group.items.map((item, i) => (
                <div key={i} className="rounded-md border border-border p-3">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">
                      Follow Up
                    </Button>
                    <Button size="sm" variant="ghost">
                      Reschedule
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
