import React from 'react';
import type { TranslationResult } from '../types';
import { SoundIcon } from './icons/SoundIcon';

interface ResultDisplayProps {
  result: TranslationResult;
  word: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, word }) => {
  const handleSpeakSentence = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Sorry, your browser does not support text-to-speech.');
      return;
    }

    // Cancel any ongoing speech to prevent overlap
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Attempt to find a Turkish voice. The list might be loaded asynchronously.
    const voices = window.speechSynthesis.getVoices();
    const turkishVoice = voices.find((v) => v.lang.startsWith('tr'));

    if (turkishVoice) {
      utterance.voice = turkishVoice;
    } else {
      console.warn(
        'Turkish voice not found, using default. Voices may still be loading.'
      );
    }

    utterance.lang = 'tr-TR';
    utterance.rate = 0.85; // A comfortable pace for sentences
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 animate-fade-in space-y-8">
      {/* Main Translation */}
      <section>
        <h2 className="text-xl font-semibold text-slate-400 mb-2">
          Turkish Word
        </h2>
        <p className="text-4xl font-bold text-cyan-400">{word}</p>
        <div className="border-t border-slate-700 my-4"></div>
        <h2 className="text-xl font-semibold text-slate-400 mb-2">
          Arabic Translation
        </h2>
        <p className="text-4xl font-bold text-emerald-400" dir="rtl">
          {result.arabicTranslation}
        </p>
      </section>

      {/* Usage Cases */}
      {result.usageCases && result.usageCases.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-3">
            Usage Cases
          </h3>
          <ul className="space-y-3 list-disc list-inside text-slate-300">
            {result.usageCases.map((usage, index) => (
              <li key={index} className="text-lg">
                {usage}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Example Sentences */}
      {result.exampleSentences && result.exampleSentences.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-3">
            Examples from Daily Life
          </h3>
          <div className="space-y-6">
            {result.exampleSentences.map((example, index) => (
              <div
                key={index}
                className="bg-slate-900/70 p-4 rounded-lg border border-slate-700"
              >
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={() => handleSpeakSentence(example.turkish)}
                    className="text-slate-400 hover:text-cyan-400 focus:text-cyan-400 focus:outline-none transition-colors duration-200"
                    aria-label="Pronounce Turkish sentence"
                  >
                    <SoundIcon className="w-5 h-5" />
                  </button>
                  <p className="text-lg text-cyan-300">"{example.turkish}"</p>
                </div>
                <p
                  className="text-lg text-emerald-300 text-right pl-8"
                  dir="rtl"
                >
                  "{example.arabic}"
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResultDisplay;
