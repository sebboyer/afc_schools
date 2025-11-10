import Link from 'next/link';
import { StarIcon, MapPinIcon, AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { School } from '@/types/school';

interface SchoolCardProps {
  school: School;
  index: number;
}

export default function SchoolCard({ school, index }: SchoolCardProps) {
  // Blue gradient patterns for variety
  const colorPatterns = [
    { 
      border: 'hover:border-primary-500', 
      accent: 'text-primary-600', 
      bg: 'bg-gradient-to-r from-primary-500 to-primary-600', 
      badge: 'bg-primary-50 border-primary-200 text-primary-700',
      glow: 'group-hover:shadow-primary-500/25'
    },
    { 
      border: 'hover:border-accent-500', 
      accent: 'text-accent-600', 
      bg: 'bg-gradient-to-r from-accent-500 to-accent-600', 
      badge: 'bg-accent-50 border-accent-200 text-accent-700',
      glow: 'group-hover:shadow-accent-500/25'
    },
    { 
      border: 'hover:border-primary-600', 
      accent: 'text-primary-700', 
      bg: 'bg-gradient-to-r from-primary-600 to-primary-700', 
      badge: 'bg-primary-100 border-primary-300 text-primary-800',
      glow: 'group-hover:shadow-primary-600/25'
    },
    { 
      border: 'hover:border-accent-600', 
      accent: 'text-accent-700', 
      bg: 'bg-gradient-to-r from-accent-600 to-primary-600', 
      badge: 'bg-accent-100 border-accent-300 text-accent-800',
      glow: 'group-hover:shadow-accent-600/25'
    },
  ];
  
  const pattern = colorPatterns[index % colorPatterns.length];

  return (
    <Link href={`/schools/${school.id}`}>
      <div className={`group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden 
                    hover:shadow-lifted transition-all duration-300 cursor-pointer h-full flex flex-col
                    ${pattern.border} hover:-translate-y-2 ${pattern.glow}`}>
        <div className="p-7 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 flex-shrink-0">
            <h3 className={`text-xl font-bold text-gray-900 line-clamp-2 flex-1 group-hover:${pattern.accent} transition-colors leading-tight min-h-[56px]`}>
              {school.name}
            </h3>
            {school.rating && (
              <div className="flex items-center ml-3 flex-shrink-0 bg-gradient-to-br from-yellow-50 to-yellow-100 px-3 py-1.5 rounded-xl border-2 border-yellow-300 shadow-sm">
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <span className="ml-1.5 text-sm font-bold text-gray-900">
                  {school.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          
          {/* Location Badge */}
          <div className={`inline-flex items-center self-start mb-5 px-4 py-2 rounded-xl ${pattern.badge} border-2 flex-shrink-0 shadow-sm`}>
            <MapPinIcon className="h-4 w-4 mr-2" />
            <span className="text-sm font-bold">
              {school.city}{school.city && school.state ? ', ' : ''}{school.state}
            </span>
          </div>

          {/* Details Section */}
          <div className="flex-1 flex flex-col justify-end">
            <div className="border-t-2 border-gray-100 pt-5 space-y-3">
              <div className="grid grid-cols-1 gap-3">
                {school.gradeRange && (
                  <div className="flex items-center bg-gradient-to-r from-gray-50 to-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
                    <div className="bg-primary-100 p-1.5 rounded-lg mr-3">
                      <AcademicCapIcon className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block mb-0.5">Grades</span>
                      <span className="font-bold text-gray-900 text-sm">{school.gradeRange}</span>
                    </div>
                  </div>
                )}
                {school.enrollment && (
                  <div className="flex items-center bg-gradient-to-r from-gray-50 to-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
                    <div className="bg-accent-100 p-1.5 rounded-lg mr-3">
                      <UserGroupIcon className="h-4 w-4 text-accent-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block mb-0.5">Students</span>
                      <span className="font-bold text-gray-900 text-sm">{school.enrollment.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
              {school.reviewCount && school.reviewCount > 0 && (
                <p className="text-xs text-gray-500 font-semibold pt-2">
                  {school.reviewCount} {school.reviewCount === 1 ? 'review' : 'reviews'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-7 pb-6">
          <div className={`text-white font-bold text-sm flex items-center justify-center
                        ${pattern.bg} px-5 py-4 rounded-xl transition-all duration-300
                        shadow-md group-hover:shadow-xl transform group-hover:scale-[1.02]`}>
            View School Profile
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

