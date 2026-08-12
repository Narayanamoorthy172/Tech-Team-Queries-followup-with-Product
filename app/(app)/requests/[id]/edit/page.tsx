import { RequestForm } from "@/components/requests/request-form";

export default async function EditRequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Edit Request</h1>
        <p className="text-sm text-muted-foreground">Editing request {id}.</p>
      </div>
      <RequestForm mode="edit" />
    </div>
  );
}
