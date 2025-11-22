import React from 'react';
import { Token } from '@/types';
import { FORMATTERS } from '@/lib/utils';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface HoverCardProps {
  token: Token;
  isVisible: boolean;
}

export const HoverCard = ({ token, isVisible }: HoverCardProps) => {
  if (!isVisible) return null;

  const isPositive = token.change1m >= 0;

  return (
    <div className="absolute left-[102%] top-1/2 -translate-y-1/2 w-64 bg-black/90 backdrop-blur-xl border border-zinc-700/50 rounded-xl p-4 shadow-2xl z-50 pointer-events-none animate-in fade-in slide-in-from-left-2 duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-white text-lg">{token.ticker}</h4>
          <span className="text-xs text-zinc-500">Quick View</span>
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {token.change1m.toFixed(2)}%
        </div>
      </div>

      {/* Mini Stats Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-zinc-900/50 p-2 rounded border border-zinc-800">
          <span className="text-zinc-500 block mb-0.5">Liquidity</span>
          <span className="font-mono text-zinc-200">{FORMATTERS.compact(token.liquidity)}</span>
        </div>
        <div className="bg-zinc-900/50 p-2 rounded border border-zinc-800">
          <span className="text-zinc-500 block mb-0.5">Txns (1h)</span>
          <span className="font-mono text-zinc-200">{token.txns}</span>
        </div>
        <div className="bg-zinc-900/50 p-2 rounded border border-zinc-800 col-span-2">
          <span className="text-zinc-500 block mb-0.5">Volume (24h)</span>
          <div className="flex items-center justify-between">
            <span className="font-mono text-zinc-200">{FORMATTERS.currency(token.volume)}</span>
            <Activity size={12} className="text-zinc-600" />
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className={`absolute -inset-px rounded-xl opacity-20 blur-md -z-10 ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
    </div>
  );
};