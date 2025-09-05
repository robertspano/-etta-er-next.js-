'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Truck, Package, Trash2, Car, MoreHorizontal, Users, Music, Box, Warehouse, Archive, Plane, Calendar, MapPin } from 'lucide-react';

const MovingCategoryPicker = ({ translations, language }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    fromLocation: '',
    toLocation: '',
    startDate: '',
    description: ''
  });

  const movingSubcategories = [
    {
      key: 'sendibila',
      icon: <Truck className="w-full h-full" strokeWidth={1.5} />,
      name: translations.sendibila || (language === 'is' ? 'Sendibílaþjónusta' : 'Delivery Service'),
      showForm: true // This category will show the form
    },
    {
      key: 'flyttebyra',
      icon: <Package className="w-full h-full" strokeWidth={1.5} />,
      name: translations.flyttebyra || (language === 'is' ? 'Flutningafyrirtæki' : 'Moving Company'),
      showForm: true // This category will show the form
    },
    {
      key: 'avfallshandtering',
      icon: <Trash2 className="w-full h-full" strokeWidth={1.5} />,
      name: translations.avfallshandtering || (language === 'is' ? 'Sorpmeðhöndlun' : 'Waste Management')
    },
    {
      key: 'transportBilBat',
      icon: <Car className="w-full h-full" strokeWidth={1.5} />,
      name: translations.transportBilBat || (language === 'is' ? 'Bíla- og bátaflutningar' : 'Vehicle/Boat Transport')
    },
    {
      key: 'annetFlytting',
      icon: <MoreHorizontal className="w-full h-full" strokeWidth={1.5} />,
      name: translations.annetFlytting || (language === 'is' ? 'Annað (Flutningar)' : 'Other Moving/Transport')
    },
    {
      key: 'persontransport',
      icon: <Users className="w-full h-full" strokeWidth={1.5} />,
      name: translations.persontransport || (language === 'is' ? 'Persónuflutningar' : 'Personal Transport')
    },
    {
      key: 'pianotransport',
      icon: <Music className="w-full h-full" strokeWidth={1.5} />,
      name: translations.pianotransport || (language === 'is' ? 'Píanóflutningar' : 'Piano Moving')
    },
    {
      key: 'godstransport',
      icon: <Box className="w-full h-full" strokeWidth={1.5} />,
      name: translations.godstransport || (language === 'is' ? 'Vöruflutningar' : 'Freight Transport')
    }
  ];

  // Additional categories shown when expanded
  const additionalSubcategories = [
    {
      key: 'massetransport',
      icon: <Warehouse className="w-full h-full" strokeWidth={1.5} />,
      name: translations.massetransport || (language === 'is' ? 'Massaflutningar' : 'Bulk Transport')
    },
    {
      key: 'lager',
      icon: <Archive className="w-full h-full" strokeWidth={1.5} />,
      name: translations.lager || (language === 'is' ? 'Vörugeymsla' : 'Storage/Warehousing')
    },
    {
      key: 'helikoptertransport',
      icon: <Plane className="w-full h-full" strokeWidth={1.5} />,
      name: translations.helikoptertransport || (language === 'is' ? 'Þyrluflutningar' : 'Helicopter Transport')
    }
  ];

  const handleSubcategorySelect = (subcategoryKey, category) => {
    if (category.showForm) {
      // If this category should show the form, set it as selected
      setSelectedCategory(subcategoryKey);
    } else {
      // Store moving subcategory in localStorage for the wizard
      localStorage.setItem('bc_selected_category', 'moving');
      localStorage.setItem('bc_selected_subcategory', subcategoryKey);
      
      // Navigate to simplified contact info form
      router.push('/post/moving/contact');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Store the form data and selected category
    localStorage.setItem('bc_selected_category', 'moving');
    localStorage.setItem('bc_selected_subcategory', selectedCategory);
    localStorage.setItem('bc_form_data', JSON.stringify(formData));
    
    // Navigate to the next step
    router.push('/post/moving/contact');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggleExpansion = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Header - Same as cleaning/handcraft */}
        <div className="text-center mb-8">
          {/* Progress indicators - same style as handcraft */}
          <div className="flex items-center justify-center mb-8">
            {/* Step 1 - Active */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white text-sm font-medium">
              1
            </div>
            <div className="w-20 h-1 mx-2 bg-gray-200"></div>
            {/* Step 2 - Inactive */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 text-sm font-medium">
              2
            </div>
            <div className="w-20 h-1 mx-2 bg-gray-200"></div>
            {/* Step 3 - Inactive */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 text-sm font-medium">
              3
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">
          {translations.movingCategoryTitle || (language === 'is' ? 'Hvers konar flutningsþjónustu þarftu?' : 'What kind of moving service do you need?')}
        </h1>

        {/* Categories Grid - Hero section style with selective dividers */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-gray-200">
              {movingSubcategories.map((category, index) => (
                <button
                  key={category.key}
                  onClick={() => handleSubcategorySelect(category.key, category)}
                  className={`group flex items-center justify-start p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 gap-3 border border-slate-200 bg-white shadow-sm hover:shadow-md hover:scale-105 transition-transform ${
                    index === 0 ? 'border-b border-gray-200' : ''
                  } ${selectedCategory === category.key ? 'bg-blue-50 border-blue-300' : ''}`}
                >
                  {/* Icon - Same size and style as hero */}
                  <div className="w-14 h-14 lg:w-16 lg:h-16 text-honolulu_blue mb-0 group-hover:scale-110 transition-transform duration-200 flex-shrink-0 flex items-center justify-center">
                    {category.icon}
                  </div>
                  
                  {/* Category name - Same typography as hero */}
                  <span className="text-sm lg:text-base font-medium text-gray-800 text-left leading-tight flex items-center justify-center">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transport Details Form - Appears when delivery service is selected */}
        {selectedCategory === 'sendibila' && (
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
              <div className="p-6 lg:p-8">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {/* From Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2 text-honolulu_blue" />
                      {language === 'is' ? 'Hvaðan á að flytja?' : 'Where should it be transported from?'}
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder={language === 'is' ? 'Götuheiti' : 'Street address'}
                        value={formData.fromLocation}
                        onChange={(e) => handleInputChange('fromLocation', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder={language === 'is' ? 'Póstnúmer' : 'Postal code'}
                        className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* To Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2 text-honolulu_blue" />
                      {language === 'is' ? 'Hvert á að flytja?' : 'Where should it be transported to?'}
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder={language === 'is' ? 'Götuheiti' : 'Street address'}
                        value={formData.toLocation}
                        onChange={(e) => handleInputChange('toLocation', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder={language === 'is' ? 'Póstnúmer' : 'Postal code'}
                        className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2 text-honolulu_blue" />
                      {language === 'is' ? 'Hvenær vilt þú að verkið hefjist?' : 'When do you want the job to start?'}
                    </label>
                    <select
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">{language === 'is' ? 'Veldu tíma' : 'Select timing'}</option>
                      <option value="asap">{language === 'is' ? 'Eins fljótt og auðið er' : 'As soon as possible'}</option>
                      <option value="within_week">{language === 'is' ? 'Innan viku' : 'Within a week'}</option>
                      <option value="within_month">{language === 'is' ? 'Innan mánaðar' : 'Within a month'}</option>
                      <option value="flexible">{language === 'is' ? 'Sveigjanlegt' : 'Flexible'}</option>
                    </select>
                  </div>

                  {/* Job Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'is' ? 'Lýsing á verkinu' : 'Job description'}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={language === 'is' ? 'Lýstu verkinu sem þú þarft að láta gera...' : 'Describe the work that needs to be done...'}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 min-w-[200px]"
                    >
                      {language === 'is' ? 'Áfram' : 'Continue'}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovingCategoryPicker;