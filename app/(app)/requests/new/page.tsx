import { RequestForm } from "@/components/requests/request-form";

export default function NewRequestPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">New Request</h1>
        <p className="text-sm text-muted-foreground">
          Log an email you sent to the Product Team so you never lose track of it.
        </p>
      </div>
      <RequestForm mode="create" />
    </div>
  );
}
