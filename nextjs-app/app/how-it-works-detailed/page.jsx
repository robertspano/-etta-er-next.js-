'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../contexts/TranslationsContext';
import { ChevronDown, Star, Shield, FileText, Users } from 'lucide-react';

const HowItWorksDetailedPage = () => {
  const { translations } = useTranslations();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F7F5F3] pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-blue-600 font-medium mb-4">
            {translations.startGuide || 'Start Guide'}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {translations.detailedPageTitle || 'Find skilled professionals on BuildConnect'}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {translations.detailedPageSubtitle || 'BuildConnect gives you the opportunity to find skilled craftsmen and companies within a range of specialties. Whether you need to upgrade your bathroom, renovate your kitchen, or upgrade your bathroom, BuildConnect ensures that you get quotes from relevant and qualified professionals - for both large and small jobs.'}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <img 
            src="https://customer-assets.emergentagent.com/job_craft-connect-11/artifacts/czdu1dn3_pexels-freestockpro-12932486.jpg"
            alt="Professional craftswoman" 
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Content Dropdown */}
        <div className="mb-12">
          <details className="bg-white rounded-lg shadow-sm border">
            <summary className="p-6 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
              {translations.contentDropdown || 'Content'}
              <ChevronDown className="w-5 h-5" />
            </summary>
          </details>
        </div>

        {/* Get Multiple Quotes Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.multipleQuotesTitle || 'Get multiple quotes from multiple companies'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {translations.multipleQuotesDescription || 'One of the biggest advantages of BuildConnect is that you can receive multiple quotes from different companies for your job. This makes it easy to compare prices, terms and evaluations before you make a decision.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            {translations.uncertaintyText || 'So, are you unsure about which company suits your job best?'}
          </p>
          <p className="text-gray-600 leading-relaxed">
            <a href="/post-job" className="text-blue-600 hover:underline">
              {translations.postJobLink || 'Post the job on BuildConnect'}
            </a>
            {translations.postJobDescription || ', and we\'ll make sure it\'s shown to relevant companies. The companies you get in touch with will also have the necessary capacity to get the job done!'}
          </p>
        </section>

        {/* Contact Individual Companies */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.contactIndividualTitle || 'You can also contact individual companies'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {translations.contactIndividualDescription || 'Do you have good experience with a company, or a recommendation from family, friends or colleagues? You can also contact the company directly through their profile page.'}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {translations.companySearchDescription || 'You can find the profile via the company search, but if the company has helped you before on BuildConnect, you will be able to log in and also be able to find offers for the company there.'}
          </p>
        </section>

        {/* Boligmappa Integration */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <p className="text-center text-gray-600 leading-relaxed">
            {translations.boligmappaIntegration || 'BuildConnect collaborates with Boligmappa, where all jobs posted via BuildConnect cost nothing to document. By using BuildConnect to mediate the job, the craftsman (and you) can thus save money on the documentation!'}
          </p>
        </section>

        {/* How to Choose Right Company */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.chooseRightCompanyTitle || 'How to choose the right company?'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {translations.chooseRightCompanyDescription || 'To make the choice simpler, you can visit the company\'s profile page. There you will find reviews from previous customers, certifications they hold and also images from completed projects.'}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {translations.confidenceDescription || 'This gives you a good insight into the company\'s competence and experience, so that you can make a safe decision.'}
          </p>
        </section>

        {/* Reviews Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.reviewsConfidenceTitle || 'Reviews make you more confident in your choice'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {translations.reviewsDescription || 'Jobs posted via BuildConnect can be reviewed, and many choose to do this to help others make the right choice of company. All reviews on BuildConnect since autumn 2024 come from BankID-verified users. This way you can be sure that those who posted the job are someone we have checked that they are who they say they are. This (and more) is done so that the reviews are given on the right basis.'}
          </p>
          <a href="#" className="text-blue-600 hover:underline">
            {translations.readMoreReviews || 'Read more about reviews here!'}
          </a>
        </section>

        {/* Contract Writing */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.contractWritingTitle || 'The opportunity to write a contract with the company'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {translations.contractWritingDescription || 'When you have chosen the craftsman or company that best suits your project, BuildConnect offers the opportunity to enter into a formal contract. This ensures that all parties agree on scope of work, schedule and price, and gives you extra security that the work starts.'}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {translations.contractBenefits || 'A written contract is an important tool to avoid misunderstandings and ensure good cooperation.'}
          </p>
        </section>

        {/* Larger Projects */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.largerProjectsTitle || 'We also help you with larger projects'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {translations.largerProjectsDescription || 'If you are going to do a bigger project, BuildConnect XL is the service for you! Our project managers find relevant companies to quote your assignment, and help you through the entire process from A to Z.'}
          </p>
          <a href="/major-projects" className="text-blue-600 hover:underline">
            {translations.readMoreXL || 'Read more about BuildConnect XL here!'}
          </a>
        </section>

        {/* Housing Associations */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.housingAssociationsTitle || 'BuildConnect can also be used for housing associations and cooperatives'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {translations.housingAssociationsDescription || 'Should the housing association or cooperative be upgraded? By using BuildConnect or BuildConnect XL, housing associations can easily find professional specialists for everything from maintenance work to major renovation projects. The advantage is that the service is flexible - whether you need help with small, regular tasks or a major project, BuildConnect can deliver the right assistance.'}
          </p>
          <a href="#" className="text-blue-600 hover:underline">
            {translations.readMoreHousing || 'Read more about collaboration with housing associations and cooperatives here!'}
          </a>
        </section>

        {/* Documentation Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.documentationTitle || 'Job documentation in Boligmappa'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {translations.documentationDescription || 'Another big plus with BuildConnect is the opportunity to document the project in Boligmappa. This is a practical solution that ensures that all necessary documentation, for example contracts, guarantees and final invoices - is collected in one place.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {translations.boligmappaAdvantage || 'With Boligmappa you can easily keep track of all details related to the project, something that can be very valuable when reselling the property or during later maintenance work.'}
          </p>
          <a href="#" className="text-blue-600 hover:underline">
            {translations.readMoreBoligmappa || 'Read more about collaboration with Boligmappa here!'}
          </a>
        </section>

        {/* Qualified Professionals */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.qualifiedProfessionalsTitle || 'BuildConnect gives you qualified craftsmen'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {translations.qualifiedProfessionalsDescription || 'BuildConnect gives you easy access to qualified craftsmen by retrieving multiple quotes on your project. You can easily compare prices, terms and read reviews from previous customers before making your choice. The companies\' profiles give you insight into the quality of the work, and with BankID-verified reviews you can be sure of your choice. The service gives you security through the opportunity to enter into a contract with the craftsman and ensure good cooperation.'}
          </p>
          <a href="#" className="text-blue-600 hover:underline">
            {translations.readMoreFunction || 'Read more about how BuildConnect works here!'}
          </a>
          <p className="text-gray-600 leading-relaxed mt-6 font-medium">
            {translations.popularChoice || 'Fast, safe and simple - that\'s why over 300,000 Norwegians choose BuildConnect every year.'}
          </p>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.finalCTATitle || 'Do you have a job you want done?'}
          </h2>
          <button
            onClick={() => router.push('/post-job')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
          >
            {translations.finalCTAButton || 'Post your job now'}
          </button>
        </section>

      </div>
    </div>
  );
};

export default HowItWorksDetailedPage;