import React from 'react';
import { Filter, Wallet } from 'lucide-react';
import { SearchBar } from '../molecules/SearchBar';

interface HeaderProps {
  search: string;
  onSearchChange: (val: string) => void;
  sortBy: string;
  onSortChange: (val: string) => void;
}

export const Header = ({ search, onSearchChange, sortBy, onSortChange }: HeaderProps) => {
  return (
    <header className="flex-none h-16 border-b border-zinc-800/50 bg-black/60 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 blur opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
            <div className="relative w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded flex items-center justify-center font-bold text-black shadow-lg shadow-emerald-500/20">
                A
            </div>
          </div>
          <span className="font-bold text-white text-lg tracking-tight hidden sm:block group-hover:text-emerald-400 transition-colors">
            AXIOM <span className="text-[10px] text-zinc-500 font-mono border border-zinc-800 rounded px-1 py-0.5 ml-1">PRO</span>
          </span>
        </div>
        
        <SearchBar value={search} onChange={onSearchChange} />
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg p-1">
            {['Time', 'M.Cap', 'Vol'].map((opt) => {
                const val = opt.toLowerCase().replace('.', '');
                const active = sortBy === val || (val === 'time' && sortBy === 'age');
                return (
                    <button 
                        key={opt}
                        onClick={() => onSortChange(val === 'time' ? 'age' : val)}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded transition-all ${active ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        {opt}
                    </button>
                )
            })}
        </div>

        <button className="relative group overflow-hidden flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-md text-sm font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
             <Wallet size={16} />
             <span>Connect</span>
        </button>
      </div>
    </header>
  );
};