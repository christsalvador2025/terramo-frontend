import React from 'react'
import LoginTokenPage from '@/components/client/ClientLoginToken'
interface PageProps {
  params: {
    token: string;
  };
}
export default function Page({ params }: PageProps) {
  return <LoginTokenPage params={params} />;
}