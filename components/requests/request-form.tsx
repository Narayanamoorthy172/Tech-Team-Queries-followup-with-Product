"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEFAULT_REQUEST_TYPES, PRIORITY_OPTIONS, STATUS_OPTIONS } from "@/lib/constants";

/**
 * Shared Create/Edit form for a Product Request.
 *
 * This is UI-only for now (Phase 1). It validates required fields in the
 * browser and shows a toast instead of saving. Phase 3 replaces the
 * onSubmit handler with a real Supabase insert/update and wires up
 * "mode" for editing an existing request.
 */
export function RequestForm({ mode = "create" }: { mode?: "create" | "edit" }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [requestType, setRequestType] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState<string | null>(null);

  function validate() {
    if (!title.trim()) return "Title cannot be empty.";
    if (!product.trim()) return "Product / Module is required.";
    if (!requestType) return "Please choose a request type.";
    if (!priority) return "Please choose a priority.";
    if (!status) return "Please choose a status.";
    return null;
  }

  function handleSubmit(e: React.FormEvent, action: "draft" | "create") {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    toast.success(
      mode === "edit"
        ? "Changes saved (preview only — connects to the database in Phase 3)."
        : action === "draft"
          ? "Draft saved (preview only — connects to the database in Phase 3)."
          : "Request created (preview only — connects to the database in Phase 3)."
    );
    router.push("/requests");
  }

  return (
    <form className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basic information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g. Payment API timeout issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What's the issue or request, in your own words?"
              rows={4}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="product">Product / Module *</Label>
            <Input
              id="product"
              placeholder="e.g. Payment API"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="owner">Owner / Product Contact</Label>
            <Input id="owner" placeholder="e.g. John (Product Team)" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Request Type *</Label>
            <Select value={requestType} onValueChange={setRequestType}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a type" />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_REQUEST_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Priority *</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a priority" />
              </SelectTrigger>
              <SelectContent>
                {PRIORITY_OPTIONS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label>Status *</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="sm:w-64">
                <SelectValue placeholder="Choose a status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Email information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="emailSubject">Email Subject</Label>
            <Input id="emailSubject" placeholder="Subject line of your email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="productEmail">Product Team Email</Label>
            <Input id="productEmail" type="email" placeholder="product@example.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="originalEmailDate">Original Email Date</Label>
            <Input id="originalEmailDate" type="date" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="threadRef">Email Thread Reference</Label>
            <Input id="threadRef" placeholder="e.g. Outlook conversation ID" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="emailUrl">Email URL (optional)</Label>
            <Input id="emailUrl" type="url" placeholder="https://…" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tracking</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="etaDate">ETA Date</Label>
            <Input id="etaDate" type="date" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nextFollowUp">Next Follow-up Date</Label>
            <Input id="nextFollowUp" type="date" />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="tags">Tags</Label>
            <Input id="tags" placeholder="Comma-separated, e.g. payments, timeout" />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Anything else worth remembering" rows={3} />
          </div>
        </CardContent>
      </Card>

      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {mode === "create" && (
          <Button
            type="button"
            variant="secondary"
            onClick={(e) => handleSubmit(e, "draft")}
          >
            Save Draft
          </Button>
        )}
        <Button type="button" onClick={(e) => handleSubmit(e, "create")}>
          {mode === "edit" ? "Save Changes" : "Create Request"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/requests")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
