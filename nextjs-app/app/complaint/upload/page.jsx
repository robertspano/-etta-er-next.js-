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
    const validFiles = files.filter(file => {
      // Check file size (10MB = 10 * 1024 * 1024 bytes)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });
    setSelectedFiles(prev => [...prev, ...validFiles]);
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
    const validFiles = files.filter(file => {
      // Check file size (10MB = 10 * 1024 * 1024 bytes)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const handleUploadAreaClick = () => {
    document.getElementById('file-upload').click();
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Complete complaint submission
    const complaintData = {
      files: selectedFiles,
      totalFiles: selectedFiles.length,
      timestamp: new Date().toISOString()
    };
    
    console.log('Complaint submitted with files:', complaintData);
    
    // Navigate to success page
    window.location.href = '/complaint/success';
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
          
          {/* Upload Question Title with Step Number - matching mittanbud.no */}
          <h1 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-8 leading-relaxed">
            <span className="text-blue-600 mr-2">4→</span>
            {language === 'is' 
              ? 'Legg við relaterte bilder og filer, om ønskelig.' 
              : 'Legg við relaterte bilder og filer, om ønskelig.'}
          </h1>

          {/* File Upload Area with dotted border matching mittanbud.no */}
          <div 
            className={`mb-8 border-2 border-dashed rounded-lg p-16 text-center transition-colors cursor-pointer ${
              isDragOver 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-blue-400 bg-white'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadAreaClick}
          >
            {/* Upload icon - matching mittanbud style */}
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto border-2 border-blue-400 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            {/* Upload text */}
            <p className="text-lg text-gray-600 mb-2">
              Velg fil eller dra her
            </p>

            {/* File size limit */}
            <p className="text-sm text-gray-500 mb-6">
              Maks. størrelse: 10MB
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
          </div>

          {/* Selected Files Display */}
          {selectedFiles.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Valgte filer:</h3>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{file.name}</p>
                      <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Fjern
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button - matching mittanbud.no style */}
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded transition-colors duration-200"
          >
            Send inn
          </button>

        </div>
      </div>
    </div>
  );
};

export default ComplaintUploadPage;