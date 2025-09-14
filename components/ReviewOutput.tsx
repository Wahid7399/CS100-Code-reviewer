
import React from 'react';
import type { FeedbackItem } from '../types';
import { FeedbackCategory } from '../types';

interface ReviewOutputProps {
  feedback: FeedbackItem[];
}

const categoryStyles: Record<FeedbackCategory, { bg: string, text: string, icon: JSX.Element }> = {
  [FeedbackCategory.BUG]: {
    bg: 'bg-red-900/50 border-red-500',
    text: 'text-red-400',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  },
  [FeedbackCategory.PERFORMANCE]: {
    bg: 'bg-yellow-900/50 border-yellow-500',
    text: 'text-yellow-400',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>,
  },
  [FeedbackCategory.STYLE]: {
    bg: 'bg-blue-900/50 border-blue-500',
    text: 'text-blue-400',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>,
  },
  [FeedbackCategory.SUGGESTION]: {
    bg: 'bg-green-900/50 border-green-500',
    text: 'text-green-400',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
  },
  [FeedbackCategory.SECURITY]: {
    bg: 'bg-purple-900/50 border-purple-500',
    text: 'text-purple-400',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5.026a12.005 12.005 0 01-1.12 6.012A11.955 11.955 0 012.166 14.974a11.954 11.954 0 017.834 3.082 11.954 11.954 0 017.834-3.082 11.955 11.955 0 011.12-6.012A12.005 12.005 0 0117.834 5.026 11.954 11.954 0 0110 1.944zM9 13a1 1 0 112 0v2a1 1 0 11-2 0v-2zm1-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  },
};

const FeedbackCard: React.FC<{ item: FeedbackItem }> = ({ item }) => {
    const style = categoryStyles[item.category] || categoryStyles[FeedbackCategory.SUGGESTION];

    return (
        <div className={`border rounded-lg p-4 ${style.bg}`}>
            <div className={`flex items-center text-lg font-semibold ${style.text}`}>
                {style.icon}
                <span>{item.category} on Line {item.line}</span>
            </div>
            <p className="mt-2 text-gray-300">{item.comment}</p>
            <div className="mt-3">
                <h4 className="font-semibold text-gray-400">Suggestion:</h4>
                <pre className="bg-gray-900/70 p-3 rounded-md mt-1 overflow-x-auto">
                    <code className="font-mono text-sm text-yellow-300">{item.suggestion}</code>
                </pre>
            </div>
        </div>
    );
};

export const ReviewOutput: React.FC<ReviewOutputProps> = ({ feedback }) => {
  if (feedback.length === 0) {
    return (
      <div className="text-center text-green-400 py-16">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold">Excellent!</h3>
        <p>No issues found in your code.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {feedback.map((item, index) => (
        <FeedbackCard key={index} item={item} />
      ))}
    </div>
  );
};
