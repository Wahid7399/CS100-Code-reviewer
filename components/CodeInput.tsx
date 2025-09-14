
import React, { useRef } from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, language, setLanguage, onSubmit, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const fileReadPromises = Array.from(files).map(file => {
      return new Promise<{ name: string; content: string }>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result;
          if (typeof text === 'string') {
            resolve({ name: file.name, content: text });
          } else {
            reject(new Error(`Failed to read file ${file.name}`));
          }
        };
        reader.onerror = () => reject(new Error(`Error reading file ${file.name}`));
        reader.readAsText(file);
      });
    });

    Promise.all(fileReadPromises)
      .then(fileContents => {
        const combinedCode = fileContents
          .map(file => `// --- FILE: ${file.name} ---\n\n${file.content}`)
          .join('\n\n');
        setCode(combinedCode);
      })
      .catch(error => {
        console.error("Error reading files:", error);
        // Here you could set an error state to show a message to the user
      });
    
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-cyan-400">Your Code</h2>
        <div className="flex items-center gap-2">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".c,.cpp,.h,.hpp,.txt"
                multiple
            />
            <button
                onClick={handleUploadClick}
                className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
                aria-label="Upload a code file"
            >
                Upload File(s)
            </button>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Select programming language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={`Paste your ${language} code here or upload one or more files...`}
        className="flex-grow w-full bg-gray-900 text-gray-300 font-mono p-4 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
        spellCheck="false"
        aria-label="Code input area"
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !code.trim()}
        className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-200 ease-in-out flex items-center justify-center"
      >
        {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
            </>
        ) : 'Review Code'}
      </button>
    </div>
  );
};