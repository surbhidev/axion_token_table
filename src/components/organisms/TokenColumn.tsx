import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Token } from '@/types';
import { Badge } from '../atoms/Badge';
import { Skeleton } from '../atoms/Skeleton';
import { TokenRow } from '../molecules/TokenRow';

interface TokenColumnProps {
  title: string;
  icon: LucideIcon;
  color: 'blue' | 'emerald' | 'purple';
  tokens: Token[];
  loading: boolean;
  onTokenClick: (token: Token) => void;
}

export const TokenColumn = ({ title, icon: Icon, color, tokens, loading, onTokenClick }: TokenColumnProps) => {
  return (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-zinc-800 last:border-r-0 min-w-[340px] md:min-w-0">
      {/* Header - Bigger & Bolder */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md bg-${color}-500/10 text-${color}-500 ring-1 ring-${color}-500/20`}>
            <Icon size={18} />
          </div>
          <h2 className="font-bold text-base tracking-wide text-zinc-100 uppercase drop-shadow-sm">{title}</h2>
          <Badge variant="neutral" className="text-xs px-2 py-0.5">{tokens.length}</Badge>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <div key={i} className="p-4 border-b border-zinc-800/50 flex gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2.5">
                <Skeleton className="w-24 h-5" />
                <Skeleton className="w-16 h-4" />
              </div>
            </div>
          ))
        ) : (
          tokens.map((token) => (
            <TokenRow key={token.id} token={token} onClick={onTokenClick} />
          ))
        )}
      </div>
    </div>
  );
};