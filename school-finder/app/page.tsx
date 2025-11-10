'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import SchoolCard from '@/components/SchoolCard';
import { School } from '@/types/school';

export default function Home() {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load schools data
    fetch('/data/schools.json')
      .then(res => res.json())
      .then(data => {
        setSchools(data);
        setFilteredSchools(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading schools:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredSchools(schools);
      return;
    }

    const searchTerms = query.toLowerCase().trim();
    const filtered = schools.filter(school => 
      school.name.toLowerCase().includes(searchTerms) ||
      school.city.toLowerCase().includes(searchTerms) ||
      school.state.toLowerCase().includes(searchTerms) ||
      (school.county && school.county.toLowerCase().includes(searchTerms))
    );

    setFilteredSchools(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-white via-primary-50/30 to-accent-50/30 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-gray-200">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-200/30 via-accent-200/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent-200/30 via-primary-200/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-100/20 to-accent-100/20 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full text-sm font-bold shadow-lg mb-6 animate-fade-in">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Federal Tax Credit Program</span>
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              Find Your School.
              <span className="block bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent mt-3">
                Make an Impact.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
              Support K-12 education through the Educational Choice for Children Act. 
              Search for schools and receive a federal tax credit of up to{' '}
              <span className="font-extrabold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">$1,700</span> 
              {' '}for your contribution.
            </p>
            
            <div className="mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            {searchQuery && (
              <div className="inline-flex items-center bg-gradient-to-r from-primary-50 to-accent-50 border-2 border-primary-300 px-8 py-4 rounded-2xl shadow-medium animate-slide-up">
                <div className="bg-primary-500 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-primary-800 font-bold text-lg">
                  {filteredSchools.length === 0 
                    ? 'No schools found. Try a different search term.'
                    : `Found ${filteredSchools.length.toLocaleString()} school${filteredSchools.length === 1 ? '' : 's'}`
                  }
                </p>
              </div>
            )}
          </div>
        </section>

        {/* About ECCA Section */}
        {!searchQuery && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-bold mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  ECCA Program Benefits
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
                  Educational Choice for Children Act
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="group relative bg-white rounded-2xl p-8 shadow-medium hover:shadow-lifted transition-all duration-300 border-2 border-gray-200 hover:border-primary-400 hover:-translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-4">100% Tax Credit</h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      Receive a dollar-for-dollar federal tax credit for your contribution, 
                      up to <span className="font-bold text-primary-600">$1,700</span> per taxpayer annually.
                    </p>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl p-8 shadow-medium hover:shadow-lifted transition-all duration-300 border-2 border-gray-200 hover:border-accent-400 hover:-translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Support Education</h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      Help students access quality K-12 education through private schools, 
                      tutoring, educational materials, and more.
                    </p>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl p-8 shadow-medium hover:shadow-lifted transition-all duration-300 border-2 border-gray-200 hover:border-primary-500 hover:-translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Eligible Families</h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      Scholarships available to students from households with income 
                      up to <span className="font-bold text-primary-600">300%</span> of area median gross income.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a 
                  href="https://www.federationforchildren.org/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary-600 to-accent-600 text-white 
                           rounded-2xl hover:shadow-glow transition-all duration-300 font-bold text-lg
                           hover:scale-105 hover:-translate-y-1 shadow-lifted hover:from-primary-700 hover:to-accent-700"
                >
                  Learn More About ECCA
                  <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Search Results */}
        {searchQuery && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto">
              {isLoading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-100 border-t-primary-600"></div>
                  <p className="mt-6 text-gray-700 font-semibold text-lg">Loading schools...</p>
                </div>
              ) : filteredSchools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredSchools.map((school, index) => (
                    <SchoolCard key={school.id} school={school} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white rounded-3xl border-2 border-gray-200 shadow-medium">
                  <div className="bg-gradient-to-br from-primary-100 to-accent-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-4">No schools found</h3>
                  <p className="text-gray-600 text-lg max-w-md mx-auto">Try searching by school name, city, or state to find educational institutions.</p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
