'use client';

const TrustSection = ({ translations }) => {
  const cards = [
    {
      icon: (
        <div className="w-12 h-12 bg-blue_green-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-blue_green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      ),
      title: translations.trustCard1Title || "Find skilled professionals",
      description: translations.trustCard1Description || "verki makes it easy to find professionals, whether the job is big or small. You can contact companies directly, or let us find the right one!",
      link: "/how-it-works-detailed"
    },
    {
      icon: (
        <div className="w-12 h-12 bg-selective_yellow-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-selective_yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      title: translations.trustCard2Title || "Safe and reliable businesses",
      description: translations.trustCard2Description || "verki ensures that companies can perform your type of work. The reviews tell you what experience others have had with the company.",
      link: "/company-requirements"
    },
    {
      icon: (
        <div className="w-12 h-12 bg-ut_orange-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-ut_orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      ),
      title: translations.trustCard3Title || "Reviews you can trust",
      description: translations.trustCard3Description || "Reviews can only be given for jobs posted on verki. To rate work, those posting the job must also be BankID verified for who they are.",
      link: "/reviews-system"
    }
  ];

  return (
    <section className="py-16 bg-light_cyan relative overflow-hidden">
      {/* Decorative Background Motif - CSS only approach */}
      <div 
        className="absolute top-0 right-0 pointer-events-none opacity-10 hidden md:block"
        style={{
          width: 'clamp(240px, 30vw, 520px)',
          height: '400px',
          background: `
            radial-gradient(ellipse 400px 600px at 70% 30%, 
              rgba(33, 158, 188, 0.25) 0%, 
              rgba(142, 202, 230, 0.20) 35%, 
              rgba(255, 183, 3, 0.15) 65%, 
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
            radial-gradient(circle at 40% 60%, rgba(142, 202, 230, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse at 80% 20%, rgba(251, 133, 0, 0.12) 0%, transparent 60%)
          `,
          transform: 'rotate(25deg)',
          filter: 'blur(2px)'
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-federal_blue mb-4">
            {translations.trustSectionTitle || "A fast and secure way to find professionals"}
          </h2>
          <p className="text-lg text-honolulu_blue max-w-4xl mx-auto leading-relaxed">
            {translations.trustSectionSubtitle || "At verki we regularly review the companies on the service. We've also made it easier for you to ensure you've chosen the best company for your project:"}
          </p>
        </div>

        {/* Cards Grid - Force horizontal layout on all screen sizes with bigger gaps */}
        <div className="grid grid-cols-3 gap-4 lg:gap-8 items-stretch">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full group min-h-[280px]"
            >
              {/* Icon - Bigger and more visible */}
              <div className="mb-4 lg:mb-6 group-hover:scale-105 transition-transform duration-300 flex justify-center lg:justify-start">
                <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-blue_green-100' : index === 1 ? 'bg-selective_yellow-100' : 'bg-ut_orange-100'
                }`}>
                  {index === 0 && (
                    <svg className="w-6 h-6 lg:w-8 lg:h-8 text-blue_green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="w-6 h-6 lg:w-8 lg:h-8 text-selective_yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="w-6 h-6 lg:w-8 lg:h-8 text-ut_orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Title - Bigger and more readable */}
              <h3 className="text-lg lg:text-xl font-semibold text-prussian_blue mb-4 lg:mb-6 text-center lg:text-left">
                {card.title}
              </h3>

              {/* Description - Bigger text and proper line height */}
              <p className="text-prussian_blue-300 text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 flex-grow text-center lg:text-left">
                {card.description}
              </p>

              {/* Learn More Link - Bigger and more readable with dynamic link */}
              <a 
                href={card.link} 
                className="inline-flex items-center justify-center lg:justify-start text-blue_green hover:text-blue_green-600 font-medium text-sm lg:text-base transition-all duration-200 group-hover:translate-x-1"
              >
                {translations.learnMore || 'Learn more'}
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