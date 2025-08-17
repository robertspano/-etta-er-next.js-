import React from 'react';

const TrustSection = ({ translations }) => {
  const cards = [
    {
      icon: (
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      ),
      title: translations.trustCard1Title,
      description: translations.trustCard1Description
    },
    {
      icon: (
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      title: translations.trustCard2Title,
      description: translations.trustCard2Description
    },
    {
      icon: (
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      ),
      title: translations.trustCard3Title,
      description: translations.trustCard3Description
    }
  ];

  return (
    <section className="py-16 bg-stone-50 relative overflow-hidden">
      {/* Decorative Background Motif - CSS only approach */}
      <div 
        className="absolute top-0 right-0 pointer-events-none opacity-10 hidden md:block"
        style={{
          width: 'clamp(240px, 30vw, 520px)',
          height: '400px',
          background: `
            radial-gradient(ellipse 400px 600px at 70% 30%, 
              rgba(16, 185, 129, 0.25) 0%, 
              rgba(59, 130, 246, 0.20) 35%, 
              rgba(168, 85, 247, 0.15) 65%, 
              transparent 100%
            )
          `,
          transform: 'rotate(-15deg) scale(1.2)',
          mixBlendMode: 'multiply',
          filter: 'blur(1px)'
        }}
        aria-hidden="true"
      />
      
      {/* Additional organic shapes */}
      <div 
        className="absolute top-8 right-16 pointer-events-none opacity-8 hidden lg:block"
        style={{
          width: '300px',
          height: '200px',
          background: `
            radial-gradient(circle at 40% 60%, rgba(34, 197, 94, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 60%)
          `,
          transform: 'rotate(25deg)',
          filter: 'blur(2px)'
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {translations.trustSectionTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {translations.trustSectionSubtitle}
          </p>
        </div>

        {/* Cards Grid - Always 3 columns side by side on desktop like Mittanbud */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
            >
              {/* Icon */}
              <div className="mb-6 group-hover:scale-105 transition-transform duration-300">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {card.title}
              </h3>

              {/* Description - flex-grow pushes the link to bottom */}
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                {card.description}
              </p>

              {/* Learn More Link - always at bottom */}
              <a 
                href="#" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 group-hover:translate-x-1"
              >
                {translations.learnMore}
                <svg className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;