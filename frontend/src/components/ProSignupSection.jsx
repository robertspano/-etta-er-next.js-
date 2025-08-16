import React from 'react';

const ProSignupSection = ({ translations }) => {
  return (
    <section className="bg-slate-800 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px] items-center">
          
          {/* Left side - Professional Image */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative">
              {/* Professional figure placeholder - using CSS to create a professional silhouette */}
              <div className="relative w-80 h-96 lg:w-96 lg:h-[480px]">
                {/* Base figure shape */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-700 opacity-80"
                  style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 85% 25%, 85% 75%, 70% 100%, 30% 100%, 15% 75%, 15% 25%)'
                  }}
                />
                
                {/* Professional icon overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center opacity-90">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Decorative dotted pattern overlay */}
                <div className="absolute top-4 right-4 opacity-30">
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" 
                           style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
                
                {/* Additional decorative shapes */}
                <div className="absolute bottom-8 left-4 w-16 h-16 bg-blue-500 opacity-20 rounded-full blur-xl" />
                <div className="absolute top-12 right-8 w-12 h-12 bg-green-500 opacity-20 rounded-full blur-lg" />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2 py-16 lg:py-20 lg:pl-16">
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
            <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-md">
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