import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/requests/status-badge";
import { PriorityBadge } from "@/components/requests/priority-badge";
import { RequestActions } from "@/components/requests/request-actions";
import { MOCK_REQUESTS } from "@/lib/mock-data";

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = MOCK_REQUESTS.find((r) => r.id === id);

  if (!request) {
    notFound();
  }

  const timeline = [
    { date: request.updatedAt, label: "Request created" },
    { date: request.updatedAt, label: "Sent to Product Team" },
    { date: request.updatedAt, label: `Status changed to ${request.status}` },
  ];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <p className="font-mono text-xs text-muted-foreground">{request.code}</p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-semibold tracking-tight">{request.title}</h1>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <StatusBadge status={request.status} />
          <PriorityBadge priority={request.priority} />
        </div>
      </div>

      <RequestActions id={request.id} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoField label="Product" value={request.product} />
        <InfoField label="Request Type" value={request.requestType} />
        <InfoField label="ETA" value={request.etaDate ?? "—"} />
        <InfoField label="Next Follow-up" value={request.nextFollowUpDate ?? "—"} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Full descriptions, email details, and notes will populate here once
            requests are connected to the database in Phase 3.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="size-4" /> Email information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <InfoField label="Subject" value="—" />
          <InfoField label="Original email" value="—" />
          <InfoField label="Product Team" value="—" />
          <InfoField label="Email thread" value="—" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-4">
            {timeline.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="w-20 shrink-0 text-xs text-muted-foreground">
                  {item.date}
                </span>
                <Separator orientation="vertical" className="h-auto" />
                <span>{item.label}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">
            Full activity history (status changes, ETA updates, follow-ups) is
            built in Phase 7.
          </p>
        </CardContent>
      </Card>

      <div>
        <Link href="/requests" className="text-sm text-primary hover:underline">
          ← Back to Requests
        </Link>
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}
