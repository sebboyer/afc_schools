export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-primary-950 to-gray-900 text-white mt-auto relative overflow-hidden border-t-2 border-primary-800/30">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-700/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-6 flex items-center">
              <div className="w-1.5 h-10 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full mr-4 shadow-glow"></div>
              About the Educational Choice for Children Act
            </h3>
            <p className="text-gray-300 leading-relaxed text-base">
              The ECCA establishes the first federal scholarship tax credit program for K–12 education. 
              Individual taxpayers can receive a{' '}
              <span className="font-bold text-primary-400">100% nonrefundable federal tax credit</span> 
              {' '}for contributions made to approved Scholarship Granting Organizations, with a maximum 
              credit of <span className="font-bold text-accent-400">$1,700 per year</span>.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-6 flex items-center">
              <div className="w-1.5 h-10 bg-gradient-to-b from-accent-500 to-primary-500 rounded-full mr-4 shadow-glow"></div>
              Eligibility & Requirements
            </h3>
            <p className="text-gray-300 leading-relaxed text-base">
              Scholarships are available to students from households with income no more than{' '}
              <span className="font-bold text-accent-400">300%</span> of area median gross income. 
              Funds can be used for tuition, books, supplies, tutoring, educational therapies, 
              and other qualified educational expenses.
            </p>
          </div>
        </div>
        
        <div className="pt-10 border-t-2 border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm font-medium">
              © {new Date().getFullYear()} American Federation for Children. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="https://www.federationforchildren.org/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-white transition-all duration-300 font-semibold
                         hover:scale-110 transform inline-block text-sm px-4 py-2 rounded-lg hover:bg-primary-900/50"
              >
                Learn More
              </a>
              <a 
                href="https://www.federationforchildren.org/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-400 hover:text-white transition-all duration-300 font-semibold
                         hover:scale-110 transform inline-block text-sm px-4 py-2 rounded-lg hover:bg-accent-900/50"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

