/**
 * TEMPORARY placeholder data.
 *
 * This file exists only so Phase 1 (UI shell) has something to render.
 * Starting in Phase 3 (Request CRUD) every page below switches to real
 * data fetched from Supabase, and this file is deleted. Nothing here
 * is saved anywhere — it just lives in memory for the preview.
 */

export type MockRequest = {
  id: string;
  code: string; // e.g. REQ-001
  title: string;
  product: string;
  requestType: string;
  priority: "low" | "medium" | "high" | "critical";
  status: string;
  etaDate: string | null;
  nextFollowUpDate: string | null;
  updatedAt: string;
};

export const MOCK_REQUESTS: MockRequest[] = [
  {
    id: "1",
    code: "REQ-001",
    title: "Payment API timeout issue",
    product: "Payment API",
    requestType: "Bug",
    priority: "high",
    status: "in_progress",
    etaDate: "2026-08-20",
    nextFollowUpDate: "2026-08-07",
    updatedAt: "2026-08-05",
  },
  {
    id: "2",
    code: "REQ-002",
    title: "Customer export failure",
    product: "Reports",
    requestType: "Bug",
    priority: "medium",
    status: "waiting_for_product",
    etaDate: null,
    nextFollowUpDate: "2026-08-12",
    updatedAt: "2026-08-01",
  },
  {
    id: "3",
    code: "REQ-003",
    title: "Dashboard UI alignment issue",
    product: "Dashboard",
    requestType: "Enhancement",
    priority: "low",
    status: "resolved",
    etaDate: null,
    nextFollowUpDate: null,
    updatedAt: "2026-07-28",
  },
  {
    id: "4",
    code: "REQ-004",
    title: "New reporting feature request",
    product: "Reports",
    requestType: "Feature Request",
    priority: "medium",
    status: "eta_provided",
    etaDate: "2026-09-01",
    nextFollowUpDate: "2026-08-15",
    updatedAt: "2026-08-04",
  },
];
