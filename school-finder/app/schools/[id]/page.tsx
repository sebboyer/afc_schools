'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { School } from '@/types/school';
import { 
  MapPinIcon, 
  PhoneIcon, 
  GlobeAltIcon, 
  StarIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function SchoolProfile() {
  const params = useParams();
  const router = useRouter();
  const [school, setSchool] = useState<School | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/schools.json')
      .then(res => res.json())
      .then((schools: School[]) => {
        const schoolId = parseInt(params.id as string);
        const foundSchool = schools.find(s => s.id === schoolId);
        setSchool(foundSchool || null);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading school:', error);
        setIsLoading(false);
      });
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-100 border-t-primary-600"></div>
            <p className="mt-6 text-gray-700 font-semibold text-lg">Loading school information...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
          <div className="text-center p-8">
            <div className="bg-gradient-to-br from-primary-100 to-accent-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">School Not Found</h1>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white 
                       font-bold rounded-xl hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Search
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const hasDemographics = school.percentWhite || school.percentBlack || 
                          school.percentHispanic || school.percentAsian;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white">
        {/* Back Button */}
        <div className="bg-white border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-5">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-primary-600 transition-all duration-300 font-semibold group"
            >
              <div className="bg-gray-100 group-hover:bg-primary-100 p-2 rounded-lg mr-3 transition-colors">
                <ArrowLeftIcon className="h-5 w-5" />
              </div>
              Back to Search
            </button>
          </div>
        </div>

        {/* School Header */}
        <div className="bg-gradient-to-br from-white via-primary-50/20 to-accent-50/20 border-b-2 border-gray-200 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-primary-200/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent-200/20 to-transparent rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 relative z-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full text-sm font-bold mb-6">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  School Profile
                </div>
                
                <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
                  {school.name}
                </h1>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-3 rounded-xl mr-4">
                      <MapPinIcon className="h-6 w-6 text-primary-700 flex-shrink-0" />
                    </div>
                    <span className="text-base font-medium">
                      {school.address && `${school.address}, `}
                      {school.city}{school.city && school.state ? ', ' : ''}{school.state} {school.zipCode}
                    </span>
                  </div>
                  
                  {school.phone && (
                    <div className="flex items-center text-gray-700 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className="bg-gradient-to-br from-accent-100 to-accent-200 p-3 rounded-xl mr-4">
                        <PhoneIcon className="h-6 w-6 text-accent-700 flex-shrink-0" />
                      </div>
                      <a href={`tel:${school.phone}`} className="hover:text-primary-600 transition-colors text-base font-semibold">
                        {school.phone}
                      </a>
                    </div>
                  )}
                  
                  {school.website && (
                    <div className="flex items-center text-gray-700 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className="bg-gradient-to-br from-primary-100 to-accent-100 p-3 rounded-xl mr-4">
                        <GlobeAltIcon className="h-6 w-6 text-primary-700 flex-shrink-0" />
                      </div>
                      <a 
                        href={school.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary-600 transition-colors truncate text-base font-semibold flex items-center gap-2"
                      >
                        Visit School Website
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>

                {school.rating && (
                  <div className="flex items-center mt-8 bg-white px-6 py-4 rounded-2xl inline-flex shadow-medium border-2 border-gray-200">
                    <StarIcon className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                    <span className="ml-3 text-3xl font-extrabold text-gray-900">
                      {school.rating.toFixed(1)}
                    </span>
                    {school.reviewCount && school.reviewCount > 0 && (
                      <span className="ml-4 text-gray-600 font-semibold">
                        ({school.reviewCount} {school.reviewCount === 1 ? 'review' : 'reviews'})
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* CTA Section */}
              <div className="md:min-w-[320px]">
                <a
                  href="https://www.federationforchildren.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-10 py-6 bg-gradient-to-r from-primary-600 to-accent-600 text-white 
                           font-extrabold rounded-2xl hover:shadow-glow transition-all duration-300 
                           shadow-lifted hover:scale-105 hover:-translate-y-1 w-full text-xl"
                >
                  Send my contribution
                  <svg className="w-7 h-7 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <div className="bg-gradient-to-br from-white to-primary-50/50 px-6 py-5 rounded-2xl mt-4 text-center shadow-medium border-2 border-primary-200">
                  <p className="text-sm text-gray-600 mb-2 font-semibold uppercase tracking-wide">Federal Tax Credit</p>
                  <p className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Up to $1,700</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* School Details */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              {school.description && (
                <div className="bg-white rounded-3xl p-10 shadow-medium border-2 border-gray-200 hover:shadow-lifted transition-shadow duration-300">
                  <h2 className="text-4xl font-extrabold text-gray-900 mb-6 flex items-center">
                    <div className="w-2 h-12 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full mr-4 shadow-md"></div>
                    About This School
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{school.description}</p>
                </div>
              )}

              {/* Demographics */}
              {hasDemographics && (
                <div className="bg-white rounded-3xl p-10 shadow-medium border-2 border-gray-200 hover:shadow-lifted transition-shadow duration-300">
                  <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
                    <div className="w-2 h-12 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full mr-4 shadow-md"></div>
                    Student Demographics
                  </h2>
                  <div className="space-y-5">
                    {school.percentWhite !== null && school.percentWhite > 0 && (
                      <div className="bg-gradient-to-r from-primary-50 to-white rounded-2xl p-5 flex items-center justify-between border-2 border-primary-200 hover:border-primary-400 transition-colors">
                        <span className="text-gray-800 font-semibold text-lg">White</span>
                        <span className="font-extrabold text-2xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">{school.percentWhite.toFixed(1)}%</span>
                      </div>
                    )}
                    {school.percentBlack !== null && school.percentBlack > 0 && (
                      <div className="bg-gradient-to-r from-accent-50 to-white rounded-2xl p-5 flex items-center justify-between border-2 border-accent-200 hover:border-accent-400 transition-colors">
                        <span className="text-gray-800 font-semibold text-lg">Black or African American</span>
                        <span className="font-extrabold text-2xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">{school.percentBlack.toFixed(1)}%</span>
                      </div>
                    )}
                    {school.percentHispanic !== null && school.percentHispanic > 0 && (
                      <div className="bg-gradient-to-r from-primary-50 to-white rounded-2xl p-5 flex items-center justify-between border-2 border-primary-200 hover:border-primary-400 transition-colors">
                        <span className="text-gray-800 font-semibold text-lg">Hispanic or Latino</span>
                        <span className="font-extrabold text-2xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">{school.percentHispanic.toFixed(1)}%</span>
                      </div>
                    )}
                    {school.percentAsian !== null && school.percentAsian > 0 && (
                      <div className="bg-gradient-to-r from-accent-50 to-white rounded-2xl p-5 flex items-center justify-between border-2 border-accent-200 hover:border-accent-400 transition-colors">
                        <span className="text-gray-800 font-semibold text-lg">Asian</span>
                        <span className="font-extrabold text-2xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">{school.percentAsian.toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Facts */}
              <div className="bg-gradient-to-br from-white via-primary-50/30 to-accent-50/30 rounded-3xl p-8 shadow-medium border-2 border-gray-200">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
                  <div className="w-2 h-10 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full mr-4 shadow-md"></div>
                  Quick Facts
                </h3>
                <div className="space-y-6">
                  {school.gradeRange && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-primary-200 hover:border-primary-400 transition-colors">
                      <div className="flex items-center text-gray-600 mb-3">
                        <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-3 rounded-xl mr-4">
                          <AcademicCapIcon className="h-6 w-6 text-primary-700" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-wider">Grade Levels</span>
                      </div>
                      <p className="text-gray-900 font-extrabold text-2xl ml-16">{school.gradeRange}</p>
                    </div>
                  )}
                  
                  {school.enrollment !== null && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-accent-200 hover:border-accent-400 transition-colors">
                      <div className="flex items-center text-gray-600 mb-3">
                        <div className="bg-gradient-to-br from-accent-100 to-accent-200 p-3 rounded-xl mr-4">
                          <UserGroupIcon className="h-6 w-6 text-accent-700" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-wider">Total Enrollment</span>
                      </div>
                      <p className="text-gray-900 font-extrabold text-2xl ml-16">
                        {school.enrollment.toLocaleString()} students
                      </p>
                    </div>
                  )}

                  {school.county && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-primary-200 hover:border-primary-400 transition-colors">
                      <div className="flex items-center text-gray-600 mb-3">
                        <div className="bg-gradient-to-br from-primary-100 to-accent-100 p-3 rounded-xl mr-4">
                          <MapPinIcon className="h-6 w-6 text-primary-700" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-wider">County</span>
                      </div>
                      <p className="text-gray-900 font-extrabold text-2xl ml-16">{school.county}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ECCA Info Box */}
              <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 rounded-3xl p-8 text-white shadow-lifted relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-extrabold mb-6">
                    About Your Contribution
                  </h3>
                  <ul className="space-y-4 text-base">
                    <li className="flex items-start">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mr-4 flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="leading-relaxed font-semibold">100% federal tax credit</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mr-4 flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="leading-relaxed font-semibold">Up to $1,700 per year</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mr-4 flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="leading-relaxed font-semibold">Supports eligible students</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mr-4 flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="leading-relaxed font-semibold">Unused credits carry forward</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

