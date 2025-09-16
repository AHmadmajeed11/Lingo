
import React from 'react';

const WelcomeMessage: React.FC = () => {
  return (
    <div className="text-center p-8 bg-slate-800/50 border border-slate-700 rounded-lg">
      <h2 className="text-2xl font-bold text-cyan-400 mb-2">Welcome to Lisan Lingo!</h2>
      <p className="text-slate-400">
        Enter a Turkish word above and click "Translate" to discover its Arabic meaning, usage, and examples from daily life.
      </p>
      <p className="text-slate-400 mt-2">
        You can also use the "Pronounce" button to hear how it's spoken.
      </p>
    </div>
  );
};

export default WelcomeMessage;
