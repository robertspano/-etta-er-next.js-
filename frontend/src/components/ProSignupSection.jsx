import React from 'react';

const ProSignupSection = ({ translations }) => {
  return (
    <section className="bg-slate-800 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px] items-center gap-8">
          
          {/* Left side - Professional Photo */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative">
              {/* Professional photo */}
              <img 
                src="https://images.unsplash.com/photo-1672748341520-6a839e6c05bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJ8ZW58MHx8fHwxNzU1MzY1Mzg3fDA&ixlib=rb-4.1.0&q=85&w=500&h=600"
                alt="Professional contractor"
                className="w-80 h-96 lg:w-96 lg:h-[480px] object-cover object-center rounded-lg shadow-2xl"
                loading="lazy"
              />
              
              {/* Subtle overlay with decorative elements */}
              <div className="absolute top-4 right-4 opacity-30">
                <div className="grid grid-cols-4 gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" 
                         style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
              
              {/* Additional subtle decorative shapes */}
              <div className="absolute bottom-8 left-4 w-12 h-12 bg-blue-500 opacity-20 rounded-full blur-xl" />
              <div className="absolute top-12 right-8 w-8 h-8 bg-green-500 opacity-20 rounded-full blur-lg" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2 py-16 lg:py-20">
            {/* Logo */}
            <div className="mb-8">
              <div className="flex items-center text-white">
                <svg className="w-8 h-8 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span className="text-xl font-bold">BuildConnect</span>
                <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  PROFF
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              {translations.proSignupTitle}
            </h2>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-lg">
              {translations.proSignupSubtitle}
            </p>

            {/* CTA Button */}
            <a 
              href="/register" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {translations.proSignupCta}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900 opacity-10 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-600 opacity-10 rounded-full blur-2xl transform -translate-x-24 translate-y-24" />
    </section>
  );
};

export default ProSignupSection;