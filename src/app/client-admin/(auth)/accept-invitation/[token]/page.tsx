
import AcceptInvitationPage from '@/components/client/AcceptInvite';

interface PageProps {
  params: {
    token: string;
  };
}

export default function Page({ params }: PageProps) {
  return <AcceptInvitationPage params={params} />;
}