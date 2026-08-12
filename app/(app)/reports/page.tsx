import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SUMMARY = [
  { label: "Created this month", value: 14 },
  { label: "Resolved this month", value: 9 },
  { label: "Average resolution time", value: "6.2 days" },
  { label: "Overdue follow-ups", value: 7 },
  { label: "ETA missed", value: 3 },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Reports</h1>
        <p className="text-sm text-muted-foreground">
          A simple view of how requests are trending over time.
        </p>
      </div>

      <div className="rounded-md border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        Sample numbers shown below. Real charts (by status, by product, by
        priority) are built in Phase 9 once real request data exists.
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {SUMMARY.map((s) => (
          <Card key={s.label}>
            <CardContent>
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-xl font-semibold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Open requests by status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            A bar chart will appear here in Phase 9.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
