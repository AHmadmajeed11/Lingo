
import React from 'react';
import { SoundIcon } from './icons/SoundIcon';
import { TranslateIcon } from './icons/TranslateIcon';

interface SearchInputProps {
  word: string;
  setWord: (word: string) => void;
  onTranslate: () => void;
  onPronounce: () => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ word, setWord, onTranslate, onPronounce, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onTranslate();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-lg bg-slate-800 border border-slate-700 shadow-lg focus-within:ring-2 focus-within:ring-cyan-500 transition-shadow duration-300">
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a Turkish word..."
        className="w-full sm:flex-1 bg-transparent text-white text-lg px-4 py-3 placeholder-slate-500 focus:outline-none"
        disabled={isLoading}
      />
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          onClick={onPronounce}
          disabled={isLoading || !word}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 text-slate-200 rounded-md hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Pronounce word"
        >
          <SoundIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Pronounce</span>
        </button>
        <button
          onClick={onTranslate}
          disabled={isLoading || !word}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Translate word"
        >
          <TranslateIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Translate</span>
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
