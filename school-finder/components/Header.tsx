import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 relative overflow-hidden sticky top-0 z-50 shadow-lg border-b border-primary-800/20">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-5">
        <div className="flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-4 transition-all duration-300 hover:scale-105 group">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl group-hover:bg-white/20 transition-colors">
              <Image 
                src="/afc_logo.jpg" 
                alt="American Federation for Children" 
                width={200}
                height={60}
                className="h-10 w-auto brightness-0 invert"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white tracking-tight">School Finder</h1>
              <p className="text-white/90 text-sm font-medium">Discover schools for ECCA tax credits</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              href="/" 
              className="text-white/90 hover:text-white transition-all duration-300 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/15 backdrop-blur-sm"
            >
              Find Schools
            </Link>
            <a 
              href="https://www.federationforchildren.org/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white transition-all duration-300 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/15 backdrop-blur-sm"
            >
              About ECCA
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

