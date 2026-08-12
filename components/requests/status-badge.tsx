import { Badge } from "@/components/ui/badge";
import { getStatusMeta } from "@/lib/constants";

export function StatusBadge({ status }: { status: string }) {
  const meta = getStatusMeta(status);
  return <Badge variant={meta.color}>{meta.label}</Badge>;
}
