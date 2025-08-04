import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLazyAcceptInvitationByTokenQuery } from '@/lib/redux/features/clients/_clientApiSlice';

export default function AcceptInvitationPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  
  const [triggerAcceptInvitation, { data, error, isLoading }] = useLazyAcceptInvitationByTokenQuery();

  useEffect(() => {
    if (params.token) {
      triggerAcceptInvitation({ 
        token: params.token, 
        email: email || undefined 
      });
    }
  }, [params.token, email, triggerAcceptInvitation]);

  useEffect(() => {
    if (data) {
      // Handle different response actions
      switch (data.action) {
        case 'login':
          // Auto-login with token
          if (data.login_token && data.email) {
             
            router.push(`/login?token=${data.login_token}&email=${data.email}`);
          }
          break;
        case 'redirect_to_login':
          router.push('/login');
          break;
        case 'complete_registration':
          router.push('/register');
          break;
        case 'contact_support':
          router.push('/support');
          break;
      }
    }
  }, [data, router]);

  if (isLoading) {
    return <div>Processing invitation...</div>;
  }

  if (error) {
    return <div>Error processing invitation. Please try again.</div>;
  }

  return (
    <div>
      {data && (
        <div>
          <h1>{data.message}</h1>
          <p>Status: {data.status}</p>
        </div>
      )}
    </div>
  );
}