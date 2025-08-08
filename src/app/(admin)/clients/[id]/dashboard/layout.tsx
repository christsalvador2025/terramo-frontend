
import ClientDashboardLayout from '@/components/client/dashboard/DashboardMainLayout'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClientDashboardLayout>
      {children}
    </ClientDashboardLayout>
  )
}

// import React, { Suspense } from 'react';
// import ClientDashboardProvider from './components/ClientDashboardProvider';
// import DashboardSidebar from './components/DashboardSidebar';
// import DashboardHeader from './components/DashboardHeader';

// export default function ClientDashboardLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { id: string };
// }) {
//   return (
//     <ClientDashboardProvider clientId={params.id}>
//       <div className="flex h-screen bg-gray-50">
//         <DashboardSidebar clientId={params.id} />
//         <div className="flex flex-1 flex-col overflow-hidden">
//           <DashboardHeader />
//           <main className="flex-1 overflow-y-auto p-6">
//             <Suspense fallback={<div>Loading...</div>}>
//               {children}
//             </Suspense>
//           </main>
//         </div>
//       </div>
//     </ClientDashboardProvider>
//   );
// }