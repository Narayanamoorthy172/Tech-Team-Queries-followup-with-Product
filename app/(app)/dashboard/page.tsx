import Link from "next/link";
import {
  Inbox,
  AlertTriangle,
  Clock,
  Hourglass,
  Timer,
  Sparkles,
  CheckCircle2,
  Archive,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/requests/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MOCK_REQUESTS } from "@/lib/mock-data";

export default function DashboardPage() {
  const requests = MOCK_REQUESTS;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          A quick look at every request you&apos;ve sent to the Product Team.
        </p>
      </div>

      <div className="rounded-md border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        This screen is showing sample data for preview. Real counts will appear
        automatically once your requests are connected to the database (Phase 4).
      </div>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard label="Total Requests" value={125} icon={Inbox} />
        <StatCard label="Open Requests" value={38} icon={Hourglass} tone="info" />
        <StatCard label="Overdue Follow-ups" value={7} icon={AlertTriangle} tone="danger" />
        <StatCard label="Due Today" value={3} icon={Clock} tone="warning" />
        <StatCard label="Waiting for Product" value={12} icon={Timer} tone="warning" />
        <StatCard label="In Progress" value={15} icon={Sparkles} tone="info" />
        <StatCard label="ETA Provided" value={11} icon={CheckCircle2} tone="info" />
        <StatCard label="Resolved This Month" value={9} icon={Archive} tone="success" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Follow-ups requiring attention</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <FollowUpRow
              tone="danger"
              label="Overdue"
              title="Payment API issue"
              detail="Follow-up was due 5 days ago"
            />
            <FollowUpRow
              tone="warning"
              label="Due Today"
              title="Customer export issue"
              detail="Follow-up due today"
            />
            <FollowUpRow
              tone="success"
              label="Upcoming"
              title="New reporting feature"
              detail="Follow-up in 3 days"
            />
            <Button variant="outline" size="sm" asChild className="mt-1 self-start">
              <Link href="/follow-ups">View all follow-ups</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent requests</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      <Link href={`/requests/${r.id}`} className="hover:underline">
                        {r.code}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-[16rem] truncate">{r.title}</TableCell>
                    <TableCell>
                      <StatusBadge status={r.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function FollowUpRow({
  tone,
  label,
  title,
  detail,
}: {
  tone: "danger" | "warning" | "success";
  label: string;
  title: string;
  detail: string;
}) {
  const border = {
    danger: "border-l-destructive",
    warning: "border-l-warning",
    success: "border-l-success",
  }[tone];
  const text = {
    danger: "text-destructive",
    warning: "text-warning",
    success: "text-success",
  }[tone];

  return (
    <div className={`flex items-center justify-between rounded-md border-l-4 bg-muted/40 py-2 pr-3 pl-3 ${border}`}>
      <div>
        <p className={`text-xs font-semibold uppercase tracking-wide ${text}`}>{label}</p>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
