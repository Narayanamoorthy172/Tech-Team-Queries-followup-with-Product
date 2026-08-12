import { Badge } from "@/components/ui/badge";
import { getPriorityMeta } from "@/lib/constants";

export function PriorityBadge({ priority }: { priority: string }) {
  const meta = getPriorityMeta(priority);
  return <Badge variant={meta.color}>{meta.label}</Badge>;
}
