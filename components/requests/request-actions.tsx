"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

/**
 * Action buttons on the request detail page. These call toast()
 * placeholders for now — Phase 5/6/7 wire them to real status changes,
 * follow-up creation, and activity logging.
 */
export function RequestActions({ id }: { id: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => router.push(`/requests/${id}/edit`)}>
        Edit
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast.info("Follow-up tracking arrives in Phase 5.")}
      >
        Add Follow-up
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast.info("Status changes arrive in Phase 3.")}
      >
        Change Status
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast.success("Marked as resolved (preview only).")}
      >
        Mark Resolved
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast.success("Marked as closed (preview only).")}
      >
        Mark Closed
      </Button>
    </div>
  );
}
