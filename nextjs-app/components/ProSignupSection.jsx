'use client';

import Link from 'next/link';
import Image from 'next/image';

const ProSignupSection = ({ translations }) => {
  console.log('ProSignupSection rendering with translations:', translations);
  return (
    <section className="bg-[#203563] relative overflow-hidden py-16 md:py-20 min-h-[600px]" style={{backgroundColor: '#203563', minHeight: '600px'}}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px] items-center gap-8 md:gap-12">
          
          {/* Left side - Professional Photo */}
          <div className="relative flex-1 flex justify-center lg:justify-start">
            {/* Professional photo */}
            <Image 
              src="https://customer-assets.emergentagent.com/job_icejobs/artifacts/l41dnwnm_ChatGPT%20Image%20Sep%205%2C%202025%2C%2009_10_12%20PM.png"
              alt="Professional contractor"
              width={400}
              height={520}
              className="w-80 h-96 lg:w-96 lg:h-[500px] xl:w-[400px] xl:h-[520px] object-contain object-bottom"
            />
            
            {/* Subtle decorative overlay */}
            <div className="absolute top-4 right-4 opacity-30">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" 
                       style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 py-12 lg:py-16 flex flex-col justify-center">
            {/* Logo */}
            <div className="mb-6 lg:mb-8">
              <div className="flex items-center text-white">
                <svg className="w-7 h-7 lg:w-8 lg:h-8 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span className="text-lg lg:text-xl font-bold">verki</span>
                <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  PROFF
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 lg:mb-6 leading-tight">
              {translations.proSignupTitle || "Want more customers?"}
            </h2>

            {/* Subtitle */}
            <p className="text-base lg:text-lg xl:text-xl text-slate-300 mb-6 lg:mb-8 leading-relaxed max-w-lg">
              {translations.proSignupSubtitle || "Register your company on verki and get access to new jobs every week."}
            </p>

            {/* CTA Button */}
            <Link 
              href="/register-company" 
              className="inline-flex items-center px-6 lg:px-8 py-3 lg:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {translations.proSignupCta || "Start here"}
              <svg className="ml-2 w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
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