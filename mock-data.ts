/**
 * Central place for all "vocabulary" used across Product Requests:
 * statuses, priorities, and request types, plus the colors used to
 * render their badges. Keeping this in one file makes it easy to
 * add a new status/type later without hunting through the UI code.
 */

export type RequestStatus =
  | "draft"
  | "sent"
  | "waiting_for_product"
  | "product_reviewing"
  | "in_progress"
  | "eta_provided"
  | "waiting_for_release"
  | "resolved"
  | "closed"
  | "rejected"
  | "cancelled";

export type RequestPriority = "low" | "medium" | "high" | "critical";

export type BadgeColor =
  | "slate"
  | "amber"
  | "blue"
  | "purple"
  | "green"
  | "emerald"
  | "red"
  | "gray";

export const STATUS_OPTIONS: {
  value: RequestStatus;
  label: string;
  color: BadgeColor;
}[] = [
  { value: "draft", label: "Draft", color: "slate" },
  { value: "sent", label: "Sent", color: "blue" },
  { value: "waiting_for_product", label: "Waiting for Product", color: "amber" },
  { value: "product_reviewing", label: "Product Reviewing", color: "blue" },
  { value: "in_progress", label: "In Progress", color: "blue" },
  { value: "eta_provided", label: "ETA Provided", color: "purple" },
  { value: "waiting_for_release", label: "Waiting for Release", color: "purple" },
  { value: "resolved", label: "Resolved", color: "green" },
  { value: "closed", label: "Closed", color: "emerald" },
  { value: "rejected", label: "Rejected", color: "red" },
  { value: "cancelled", label: "Cancelled", color: "gray" },
];

export const PRIORITY_OPTIONS: {
  value: RequestPriority;
  label: string;
  color: BadgeColor;
}[] = [
  { value: "low", label: "Low", color: "slate" },
  { value: "medium", label: "Medium", color: "blue" },
  { value: "high", label: "High", color: "amber" },
  { value: "critical", label: "Critical", color: "red" },
];

/**
 * Default request types. Users can add their own custom types later
 * from Settings — this list only seeds the initial dropdown.
 */
export const DEFAULT_REQUEST_TYPES = [
  "Bug",
  "Feature Request",
  "Product Question",
  "Enhancement",
  "Data Issue",
  "Access Issue",
  "Configuration Issue",
  "Other",
] as const;

/** Statuses that count as "closed out" — excluded from overdue/follow-up nagging. */
export const TERMINAL_STATUSES: RequestStatus[] = ["resolved", "closed", "cancelled", "rejected"];

export function getStatusMeta(status: string) {
  return (
    STATUS_OPTIONS.find((s) => s.value === status) ?? {
      value: status as RequestStatus,
      label: status,
      color: "slate" as BadgeColor,
    }
  );
}

export function getPriorityMeta(priority: string) {
  return (
    PRIORITY_OPTIONS.find((p) => p.value === priority) ?? {
      value: priority as RequestPriority,
      label: priority,
      color: "slate" as BadgeColor,
    }
  );
}

export function isTerminalStatus(status: string) {
  return TERMINAL_STATUSES.includes(status as RequestStatus);
}
