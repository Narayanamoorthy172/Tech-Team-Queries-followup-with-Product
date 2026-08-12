"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/requests/status-badge";
import { PriorityBadge } from "@/components/requests/priority-badge";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "@/lib/constants";
import { MOCK_REQUESTS } from "@/lib/mock-data";

const ALL = "all";

export default function RequestsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState(ALL);
  const [priority, setPriority] = useState(ALL);

  const filtered = useMemo(() => {
    return MOCK_REQUESTS.filter((r) => {
      const matchesQuery =
        q.trim().length === 0 ||
        r.title.toLowerCase().includes(q.toLowerCase()) ||
        r.code.toLowerCase().includes(q.toLowerCase()) ||
        r.product.toLowerCase().includes(q.toLowerCase());
      const matchesStatus = status === ALL || r.status === status;
      const matchesPriority = priority === ALL || r.priority === priority;
      return matchesQuery && matchesStatus && matchesPriority;
    });
  }, [q, status, priority]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Requests</h1>
          <p className="text-sm text-muted-foreground">
            Every issue, question, or feature request you&apos;ve sent to the
            Product Team.
          </p>
        </div>
        <Button asChild>
          <Link href="/requests/new">
            <Plus className="size-4" />
            New Request
          </Link>
        </Button>
      </div>

      <Card className="p-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search title, ID, product…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All statuses</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All priorities</SelectItem>
              {PRIORITY_OPTIONS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Next Follow-up</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="py-10 text-center text-muted-foreground">
                  No requests match your filters yet.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">
                  <Link href={`/requests/${r.id}`} className="hover:underline">
                    {r.code}
                  </Link>
                </TableCell>
                <TableCell className="max-w-[18rem] truncate font-medium">
                  <Link href={`/requests/${r.id}`} className="hover:underline">
                    {r.title}
                  </Link>
                </TableCell>
                <TableCell>{r.product}</TableCell>
                <TableCell>{r.requestType}</TableCell>
                <TableCell>
                  <PriorityBadge priority={r.priority} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={r.status} />
                </TableCell>
                <TableCell>{r.etaDate ?? "—"}</TableCell>
                <TableCell>{r.nextFollowUpDate ?? "—"}</TableCell>
                <TableCell>{r.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <p className="text-xs text-muted-foreground">
        Showing sample data for preview. This table connects to your real
        requests in Phase 3, and full sorting/overdue filters arrive in
        Phase 8.
      </p>
    </div>
  );
}
