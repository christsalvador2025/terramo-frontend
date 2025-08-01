// import React from 'react';
// import { NextPage } from 'next';
// import Head from 'next/head';
// import { ClientForm } from '@/components/forms_v2/ClientForm';

// const CreateClientPage: NextPage = () => {
//   return (
//     <>
//       <Head>
//         <title>Create Client | Admin Dashboard</title>
//         <meta name="description" content="Create a new client account" />
//       </Head>
      
//       <div className="min-h-screen bg-gray-50 py-8">
//         <ClientForm />
//       </div>
//     </>
//   );
// };

import { Metadata } from 'next';
import { ClientForm } from '@/components/forms/clientForm/ClientForm';

export const metadata: Metadata = {
  title: 'Create Client | Terramo',
  description: 'Create a new client account',
};

export default function CreateClientPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <ClientForm />
      </div>
    </div>
  );
}