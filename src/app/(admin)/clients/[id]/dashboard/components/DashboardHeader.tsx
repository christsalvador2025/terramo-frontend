'use client';

import { useClient } from './ClientDashboardProvider';

export default function DashboardHeader() {
  const { client } = useClient();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Client Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            {client?.company_name}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Add any header actions here */}
        </div>
      </div>
    </header>
  );
}
