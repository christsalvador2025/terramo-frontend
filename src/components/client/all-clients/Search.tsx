"use client"
import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface SearchProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Search = ({ 
  onSearchChange, 
  placeholder = "Search...", 
  className = "" 
}: SearchProps) => {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={onSearchChange}
        className="w-64 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );
};

export default Search;