"use client"
import React, { useState } from 'react';
import { Search, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample customer data
  const customers = [
    {
      id: 1,
      name: 'Your Company',
      logo: '/api/placeholder/200/150',
      logoType: 'custom',
      logoText: 'YOUR COMPANY',
      logoSubtext: 'IHR LOGO'
    },
    {
      id: 2,
      name: 'Otto Hofstetter AG',
      logo: '/api/placeholder/200/150',
      logoType: 'text',
      logoText: 'Otto Hofstetter AG',
      isBlue: true
    },
    {
      id: 3,
      name: 'Company Tag Line',
      logo: '/api/placeholder/200/150',
      logoType: 'rings',
      logoText: 'COMPANY',
      logoSubtext: 'TAG LINE INC'
    },
    {
      id: 4,
      name: 'Brand name',
      logo: '/api/placeholder/200/150',
      logoType: 'circles',
      logoText: 'BRAND NAME',
      logoSubtext: 'TAGLINE'
    },
    // Add more items to test pagination
    {
      id: 5,
      name: 'Another Company',
      logo: '/api/placeholder/200/150',
      logoType: 'text',
      logoText: 'Another Company'
    },
    {
      id: 6,
      name: 'Test Brand',
      logo: '/api/placeholder/200/150',
      logoType: 'custom',
      logoText: 'TEST BRAND'
    }
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const LogoComponent = ({ customer }) => {
    const baseClasses = "w-full h-40 bg-white border border-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden";
    
    switch (customer.logoType) {
      case 'custom':
        return (
          <div className={baseClasses}>
            <div className="text-center">
              <div className="relative mb-2">
                {/* Bird logo representation */}
                <div className="w-16 h-12 mx-auto relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full transform -rotate-12"></div>
                    <div className="w-6 h-6 bg-blue-600 rounded-full transform rotate-12 -ml-2"></div>
                  </div>
                </div>
                {/* Circular text */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-orange-500 text-xs font-bold tracking-wider">
                  <div className="transform -rotate-12">YOUR</div>
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-orange-500 text-xs font-bold tracking-wider">
                  <div className="transform rotate-12">COMPANY</div>
                </div>
              </div>
              <div className="text-lg font-bold text-gray-800 mt-4">IHR LOGO</div>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className={baseClasses}>
            <div className="text-center px-4">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full mr-2 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
              </div>
              <div className="text-blue-500 font-bold text-lg">
                {customer.logoText}
              </div>
            </div>
          </div>
        );
      
      case 'rings':
        return (
          <div className={`${baseClasses} bg-gray-900`}>
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-12 h-12 border-4 border-yellow-500 rounded-full mx-auto"></div>
                <div className="w-8 h-8 border-4 border-yellow-500 rounded-full mx-auto -mt-10 ml-6"></div>
              </div>
              <div className="text-yellow-500 font-bold text-sm tracking-wider">
                {customer.logoText}
              </div>
              <div className="text-yellow-500 text-xs tracking-wider mt-1">
                {customer.logoSubtext}
              </div>
            </div>
          </div>
        );
      
      case 'circles':
        return (
          <div className={baseClasses}>
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="absolute w-12 h-12 border-4 border-gray-400 rounded-full"></div>
                  <div className="absolute w-8 h-8 border-4 border-gray-400 rounded-full"></div>
                  <div className="absolute w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                </div>
              </div>
              <div className="text-gray-800 font-bold text-sm tracking-wider">
                {customer.logoText}
              </div>
              <div className="text-gray-600 text-xs tracking-wider mt-1 border-t border-gray-300 pt-1">
                {customer.logoSubtext}
              </div>
              <div className="mt-2 h-2 bg-blue-500 rounded"></div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={baseClasses}>
            <div className="text-gray-400 text-sm">Logo</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Terramo</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Settings className="w-5 h-5" />
              <span className="text-sm">Einstellungen</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Page Title and Search */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-light text-gray-800">Kunden</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Kunde suchen"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
                />
              </div>
              <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium">
                Kunde anlegen
              </button>
            </div>
          </div>
        </div>

        {/* Customer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {paginatedCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <LogoComponent customer={customer} />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">{customer.name}</h3>
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors">
                  Kunde bearbeiten
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CustomersPage;