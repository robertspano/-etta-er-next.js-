'use client';

import React, { useState } from 'react';
import { useTranslations } from '../../../contexts/TranslationsContext';
import { Upload } from 'lucide-react';

const ComplaintUploadPage = () => {
  const { language, translations } = useTranslations();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleSubmit = () => {
    console.log('Files submitted:', selectedFiles);
    // Complete complaint submission or navigate to success page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Logo in top left corner */}
      <div className="absolute top-6 left-6">
        <img 
          src="https://customer-assets.emergentagent.com/job_construction-hub-19/artifacts/k90y66eg_Your%20paragraph%20text%20%283000%20x%203000%20px%29%20%281000%20x%201000%20px%29%20%28Logo%29%20%282%29-cropped.svg"
          alt="verki Logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Main Upload Form Content - Text block centered on page but text left-aligned */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-2xl w-full">
          
          {/* Upload Question Title with Step Number */}
          <h1 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-8 leading-relaxed">
            <span className="text-blue-600 mr-2">4→</span>
            {language === 'is' 
              ? 'Bættu við tengdum myndum og skrám, ef þú vilt.' 
              : 'Add related images and files, if desired.'}
          </h1>

          {/* File Upload Area */}
          <div 
            className={`mb-8 border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragOver 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Upload icon */}
            <div className="mb-4">
              <Upload className="w-12 h-12 text-blue-500 mx-auto" />
            </div>

            {/* Upload text */}
            <p className="text-lg text-gray-600 mb-2">
              {language === 'is' 
                ? 'Veldu skrá eða dragðu hér' 
                : 'Choose file or drag here'}
            </p>

            {/* File size limit */}
            <p className="text-sm text-gray-500 mb-4">
              {language === 'is' ? 'Hámark stærð: 10MB' : 'Max size: 10MB'}
            </p>

            {/* Hidden file input */}
            <input
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />

            {/* File upload button */}
            <label
              htmlFor="file-upload"
              className="inline-block bg-white border border-gray-300 rounded px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {language === 'is' ? 'Velja skrár' : 'Choose files'}
            </label>

            {/* File status */}
            <div className="mt-4">
              {selectedFiles.length > 0 ? (
                <div className="text-sm text-gray-600">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="mb-1">
                      {file.name} ({Math.round(file.size / 1024)} KB)
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  {language === 'is' ? 'Engin skrá valin' : 'No file chosen'}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded transition-colors duration-200"
          >
            {language === 'is' ? 'Senda inn' : 'Send in'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ComplaintUploadPage;