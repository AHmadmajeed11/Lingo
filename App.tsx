
import React, { useState, useCallback } from 'react';
import { TranslationResult } from './types';
import { fetchTranslation } from './services/geminiService';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WelcomeMessage from './components/WelcomeMessage';

const App: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = useCallback(async () => {
    if (!word.trim()) {
      setError('Please enter a Turkish word.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setTranslationResult(null);
    try {
      const result = await fetchTranslation(word);
      setTranslationResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [word]);

  const handlePronounce = useCallback(() => {
    if (!word.trim()) {
      setError('Please enter a Turkish word to pronounce.');
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(word);
    
    // Find a Turkish voice
    const voices = window.speechSynthesis.getVoices();
    const turkishVoice = voices.find(v => v.lang.startsWith('tr'));
    
    if (turkishVoice) {
      utterance.voice = turkishVoice;
    } else {
        // Fallback or alert
        console.warn("Turkish voice not found, using default.");
    }
    
    utterance.lang = 'tr-TR';
    utterance.rate = 0.7; // Slower for educational purposes
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
    setError(null);
  }, [word]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <main className="mt-8">
          <SearchInput
            word={word}
            setWord={setWord}
            onTranslate={handleTranslate}
            onPronounce={handlePronounce}
            isLoading={isLoading}
          />
          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {translationResult && <ResultDisplay result={translationResult} word={word}/>}
            {!isLoading && !error && !translationResult && <WelcomeMessage />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
