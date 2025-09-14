
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { ReviewOutput } from './components/ReviewOutput';
import { Loader } from './components/Loader';
import { ErrorDisplay } from './components/ErrorDisplay';
import { reviewCode } from './services/geminiService';
import type { FeedbackItem } from './types';

export default function App() {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('cpp');
  const [reviewFeedback, setReviewFeedback] = useState<FeedbackItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError("Please enter some code to review.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setReviewFeedback(null);
    try {
      const feedback = await reviewCode(code, language);
      setReviewFeedback(feedback);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during the review.');
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CodeInput
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            onSubmit={handleReview}
            isLoading={isLoading}
          />
          <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Review Feedback</h2>
            {isLoading && <Loader />}
            {error && <ErrorDisplay message={error} />}
            {reviewFeedback && <ReviewOutput feedback={reviewFeedback} />}
            {!isLoading && !error && !reviewFeedback && (
              <div className="text-center text-gray-500 py-16">
                <p>Your code review results will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}