
import React from 'react';

const RobotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8" />
        <rect x="4" y="12" width="16" height="8" rx="2" />
        <path d="M4 12v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
        <path d="M12 12v8" />
        <path d="M9 16h6" />
        <circle cx="9" cy="8" r="1" />
        <circle cx="15" cy="8" r="1" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <RobotIcon />
        <div>
            <h1 className="text-3xl font-bold text-white">CS100 Code Reviewer</h1>
            <p className="text-md text-gray-400">Automated code analysis powered by AI</p>
        </div>
      </div>
    </header>
  );
};