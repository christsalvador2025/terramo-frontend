import { ClientForm } from "@/components/forms/clients/ClientForm";

export default function CreateClientPage() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-8">
        <ClientForm />
      </div>
    </div>
  );
}