
import React from 'react';
import { BookIcon } from './icons/BookIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
            <BookIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-500">
                Lisan Lingo
            </h1>
        </div>
      <p className="text-lg text-slate-400">Your Modern Turkish-Arabic Dictionary</p>
    </header>
  );
};

export default Header;
