'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';
// @heroicons/react/24/outline
import { useClient } from './ClientDashboardProvider';

interface DashboardSidebarProps {
  clientId: string;
}

export default function DashboardSidebar({ clientId }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { client } = useClient();

  const navigation = [
    {
      name: 'ESG-Check',
      href: `/clients/${clientId}/dashboard/esg-check`,
      icon: ChartBarIcon,
      current: pathname.includes('/esg-check'),
    },
    {
      name: 'Stakeholder-Analyse',
      href: `/clients/${clientId}/dashboard/stakeholder`,
      icon: UserGroupIcon,
      current: pathname.includes('/stakeholder'),
    },
    {
      name: 'Doppelte Wesentlichkeit',
      href: `/clients/${clientId}/dashboard/dual-essentiality`,
      icon: DocumentTextIcon,
      current: pathname.includes('/dual-essentiality'),
    },
  ];

  return (
    <div className="w-64 border-r border-gray-200 bg-white shadow-sm">
      {/* Client Logo and Name */}
      <div className="border-b border-gray-200 p-4">
        {client?.company_photo && (
          <img 
            src={client.company_photo} 
            alt={`${client.company_name} logo`}
            className="h-12 w-auto mb-2"
          />
        )}
        <h2 className="text-lg font-semibold text-gray-900">
          {client?.company_name || 'Loading...'}
        </h2>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Dashboard
        </h3>
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.current
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <item.icon
                  className={`flex-shrink-0 mr-3 h-5 w-5 ${
                    item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}