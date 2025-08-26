'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../contexts/TranslationsContext';
import { CheckCircle, Shield, FileText, Users } from 'lucide-react';

const CompanyRequirementsPage = () => {
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
            {translations.companyRequirementsTitle || 'What requirements does BuildConnect have for companies on the service?'}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {translations.companyRequirementsSubtitle || 'When you post a job on BuildConnect, you should be sure that you meet safe and serious companies. Therefore, we have strict requirements for companies on our service.'}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <img 
            src="https://customer-assets.emergentagent.com/job_craft-connect-11/artifacts/czdu1dn3_pexels-freestockpro-12932486.jpg"
            alt="Professional working on laptop" 
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Company Requirements Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.companiesOnBuildConnect || 'Companies on BuildConnect must:'}
          </h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-700">
                {translations.requirement1 || 'Be registered in the business register when business registration is required.'}
              </p>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-700">
                {translations.requirement2 || 'Have all approvals and permits that are necessary to operate the business.'}
              </p>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-700">
                {translations.requirement3 || 'Comply with relevant public legal requirements for:'}
              </p>
            </div>
          </div>

          <div className="ml-8 space-y-3 mb-8">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-600">
                {translations.reportingObligations || 'Reporting obligations'}
              </p>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-600">
                {translations.taxPayment || 'Payment of taxes and fees'}
              </p>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-600">
                {translations.legalWorkforce || 'Use of legal workforce'}
              </p>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-600">
                {translations.healthSafety || 'Health, environment and safety'}
              </p>
            </div>
          </div>
        </section>

        {/* Large Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.largeJobsRequireExtra || 'Large jobs require extra effort - and stricter requirements'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {translations.xlServiceDescription || 'BuildConnect XL is the service for the larger jobs. Since large jobs require extra effort, we set extra strict requirements for our XL companies. In this way, you can be sure that you are safe craftsmen when you are going to embark on larger construction or renovation projects.'}
          </p>
          <a href="/major-projects" className="text-blue-600 hover:underline">
            {translations.readMoreXL || 'Read more about BuildConnect XL here!'}
          </a>
        </section>

        {/* XL Company Requirements */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.xlCompanyRequirements || 'Companies on BuildConnect XL:'}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.xlRequirement1 || 'Must have at least ten years of experience, be a registered joint stock company or equivalent corporate form, be VAT registered and have liability insurance.'}
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.xlRequirement2 || 'Must have at least one of the following approvals: Master certificate, Central approval and/or Approved electrical company.'}
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.xlRequirement3 || 'Must have good credit score.'}
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.xlRequirement4 || 'Cannot have bad evaluations, references or complaints.'}
              </p>
            </div>
          </div>
        </section>

        {/* Learn More XL */}
        <div className="mb-16">
          <a href="/major-projects" className="text-blue-600 hover:underline">
            {translations.learnHowToQualify || 'Read more: How companies qualify for BuildConnect XL?'}
          </a>
        </div>

        {/* Non-Compliant Companies */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.nonCompliantTitle || 'What happens if the company does not meet the requirements?'}
          </h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {translations.nonCompliantSubtitle || 'Companies that do not meet the requirements for BuildConnect can:'}
          </h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.nonCompliant1 || 'Be rejected subscription'}
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.nonCompliant2 || 'Lose access to the service'}
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.nonCompliant3 || 'Risk having the agreement terminated'}
              </p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            {translations.qualityAssurance || 'BuildConnect\'s contract terms ensure that we can take action against companies based on previous negative history, experience with the company, or persons affiliated with the company.'}
          </p>
          
          <p className="text-gray-600 leading-relaxed">
            {translations.contactEncouragement || 'We therefore encourage you to contact us if you come across companies that do not follow Icelandic law, or the requirements of BuildConnect.'}
          </p>
        </section>

        {/* Safer Service Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.saferServiceTitle || 'A safer service with verified identity'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {translations.saferServiceDescription || 'In order for you to be able to trust the companies you find on BuildConnect, we have also introduced identity verification for the service. With this, we want to ensure reliability and combat malicious actors. Verified companies get a clear mark on their profile page, something that makes it easy for you to trust that the company you choose is a serious actor.'}
          </p>
          
          <p className="text-gray-600 leading-relaxed">
            {translations.identityVerificationBenefit || 'With the introduction of identity verification, we can identify companies that deliver good work, and exclude them from the service. In this way, we can also ensure that returning customers do not return under another company.'}
          </p>
        </section>

        {/* Job Documentation Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.jobDocumentationTitle || 'Get all jobs documented in PropertyFolder'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {translations.jobDocumentationDescription || 'There are strict requirements for documentation of construction jobs. In some cases, it is required by law, such as for work performed on wet rooms or in electrical installations. In other cases, it is smart and practical, such as when selling real estate or to maintain an overview during and after renovation.'}
          </p>
          
          <p className="text-gray-600 leading-relaxed mb-4">
            {translations.propertyFolderCollaboration || 'BuildConnect has therefore entered into a collaboration with PropertyFolder to make it easier for companies to operate seriously, and easier for private individuals to choose which work they want. Now all jobs on BuildConnect can be easily and free of charge documented in PropertyFolder. The only thing you need to do is ask for documentation of the work that is carried out, so the companies can easily add the papers to the PropertyFolder.'}
          </p>
          
          <a href="#" className="text-blue-600 hover:underline">
            {translations.learnMorePropertyFolder || 'Read more: We have entered into a collaboration with PropertyFolder'}
          </a>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.findQualifiedProfessionals || 'Find qualified professionals'}
          </h2>
          <button
            onClick={() => router.push('/post-job')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
          >
            {translations.postJobButton || 'Post your job now'}
          </button>
        </section>

      </div>
    </div>
  );
};

export default CompanyRequirementsPage;