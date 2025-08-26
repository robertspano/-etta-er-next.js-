'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../contexts/TranslationsContext';
import { CheckCircle, Shield, Smartphone, Star, AlertTriangle } from 'lucide-react';

const ReviewsSystemPage = () => {
  const { translations } = useTranslations();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F7F5F3] pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {translations.reviewsPageTitle || 'Reviews on BuildConnect'}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {translations.reviewsPageSubtitle || 'Reviews make it easier to choose the right company. Through our routines and systems, we ensure that they are genuine and reliable, so you can make a safe choice when choosing the right company.'}
          </p>
        </div>

        {/* Hero Image with Phone */}
        <div className="mb-16 text-center">
          <div className="relative inline-block">
            <img 
              src="https://customer-assets.emergentagent.com/job_craft-connect-11/artifacts/czdu1dn3_pexels-freestockpro-12932486.jpg"
              alt="BuildConnect mobile app showing reviews" 
              className="w-full max-w-md h-96 object-cover rounded-lg shadow-lg mx-auto"
            />
            {/* Overlay showing mobile app interface */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 rounded-lg p-4 shadow-lg max-w-xs">
                <div className="text-center">
                  <div className="text-blue-600 font-semibold mb-2">⬅ {translations.reviewCompany || 'Review Company'}</div>
                  <div className="bg-gray-100 rounded-lg p-3 mb-3">
                    <div className="text-sm font-medium">{translations.sampleCompanyName || 'Reykjavik Contractors'}</div>
                  </div>
                  <div className="flex justify-center mb-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  </div>
                  <div className="text-xs text-gray-600 mb-3">{translations.sampleReviewText || 'Great job with our renovation!'}</div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">
                    {translations.reviewButton || 'Review Company'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Reviews Controlled Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            {translations.allReviewsControlledTitle || 'All reviews are controlled and verified by BuildConnect'}
          </h2>
          
          <div className="space-y-6 mb-8">
            <p className="text-gray-600 leading-relaxed">
              {translations.reviewsControlDescription1 || 'When you are looking for a craftsman, you rely on reviews from other customers. Most people use these to choose a safe, solid and reliable company.'}
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              {translations.reviewsControlDescription2 || 'All reviews on BuildConnect are written by real customers who have completed a job through the service. It is important that the reviews are there to rely on, so we have several routines and systems that ensure the reliability of each individual review.'}
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {translations.reviewVerificationTitle || 'This is what we do to ensure that all reviews on BuildConnect are genuine:'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  {translations.bankIdVerification || 'BankID verification is used to confirm that the review comes from a real customer, so that the reviews are reliable and honest.'}
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  {translations.technicalControls || 'Our reliable and technical control systems detect and alert us if anything seems abnormal.'}
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  {translations.noPaymentForReviews || 'No companies can pay to get rid of negative reviews or influence the controls.'}
                </p>
              </div>
            </div>
          </div>

          <a href="#" className="text-blue-600 hover:underline">
            {translations.learnMoreBankId || 'Read more about how we use BankID verification to secure the service here!'}
          </a>
        </section>

        {/* What to Know Before Writing Review */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.beforeWritingReviewTitle || 'This is what you need to know before you write a review:'}
          </h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.reviewRule1 || 'You can only review jobs completed through BuildConnect.'}
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.reviewRule2 || 'The review must be written after the job is completed.'}
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.reviewRule3 || 'You must provide your full name.'}
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.reviewRule4 || 'The company has the right to respond to your review.'}
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.reviewRule5 || 'If a review is based on misunderstandings, or other circumstances that are resolved directly between customer and company, the customer has the opportunity to change the review.'}
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                {translations.reviewRule6 || 'Fake, offensive or legally questionable reviews are not published.'}
              </p>
            </div>
          </div>
        </section>

        {/* We Take Fraud Seriously */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.fraudSeriouslyTitle || 'We take fraud seriously'}
          </h2>
          
          <div className="space-y-6 mb-8">
            <p className="text-gray-600 leading-relaxed">
              {translations.fraudDescription1 || 'To ensure the quality and reliability of the reviews on BuildConnect, we can intervene if we discover fraud in the review guidelines. If a company tries to post fake reviews, we have the right to permanently or temporarily close the company\'s access to BuildConnect. This can also include stopping the deal with immediate effect.'}
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              {translations.fraudDescription2 || 'Remember: Your review means a lot. It helps others choose the right craftsman - and contributes to BuildConnect being a safe and reliable service for everyone.'}
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>{translations.publishedDate || 'Published'}:</strong> {translations.samplePublishDate || 'March 5, 2025, 09:03'}<br />
              <strong>{translations.updatedDate || 'Updated'}:</strong> {translations.sampleUpdateDate || 'March 17, 2025, 12:31'}
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {translations.postJobToReview || 'Post your job to receive reviews'}
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

export default ReviewsSystemPage;