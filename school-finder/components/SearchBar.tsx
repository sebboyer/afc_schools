'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search by school name, city, or state..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none z-10">
          <div className={`p-2 rounded-lg transition-all duration-300 ${isFocused ? 'bg-primary-50' : 'bg-transparent'}`}>
            <MagnifyingGlassIcon className={`h-6 w-6 transition-colors duration-300 ${isFocused ? 'text-primary-600' : 'text-gray-400'}`} />
          </div>
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="block w-full pl-20 pr-8 py-6 text-lg border-3 border-gray-200 rounded-2xl 
                   focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 
                   transition-all duration-300 placeholder-gray-400 shadow-medium hover:shadow-lifted
                   bg-white hover:border-gray-300 focus:shadow-glow font-medium"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-primary-600 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}

