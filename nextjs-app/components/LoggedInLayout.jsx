'use client';

import React, { useState } from 'react';
import LoggedInHeader from './LoggedInHeader';
import Sidebar from './Sidebar';

const LoggedInLayout = ({ children, language, translations }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <LoggedInHeader 
        language={language}
        translations={translations}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          language={language}
          translations={translations}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          <main className="py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LoggedInLayout;