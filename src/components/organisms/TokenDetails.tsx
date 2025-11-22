import React, { useState } from 'react';
import { Activity, Globe, Copy, CheckCircle2 } from 'lucide-react';
import { Token } from '@/types';
import { FORMATTERS } from '@/lib/utils';
import { Avatar } from '../atoms/Avatar';
import { Badge } from '../atoms/Badge';

export const TokenDetails = ({ token }: { token: Token }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar src={token.image} size="lg" />
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {token.name} <span className="text-zinc-500 font-normal text-sm">({token.ticker})</span>
              </h3>
              <div 
                className="flex items-center gap-2 mt-1 text-xs text-zinc-400 cursor-pointer hover:text-white transition-colors"
                onClick={copyToClipboard}
              >
                <span className="font-mono bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                  {token.address}
                </span>
                {copied ? <CheckCircle2 size={14} className="text-emerald-500"/> : <Copy size={14} />}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold text-white">
               ${token.price.toFixed(6)}
            </div>
            <Badge variant={token.change1m >= 0 ? 'green' : 'red'}>
               {FORMATTERS.percent(token.change1m)} (1m)
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-px bg-zinc-800">
         <div className="bg-zinc-950 p-4">
            <div className="text-zinc-500 text-xs uppercase mb-1">Market Cap</div>
            <div className="text-white font-mono">{FORMATTERS.currency(token.mcap)}</div>
         </div>
         <div className="bg-zinc-950 p-4">
            <div className="text-zinc-500 text-xs uppercase mb-1">Liquidity</div>
            <div className="text-white font-mono">{FORMATTERS.currency(token.liquidity)}</div>
         </div>
         <div className="bg-zinc-950 p-4">
            <div className="text-zinc-500 text-xs uppercase mb-1">Volume (24h)</div>
            <div className="text-white font-mono">{FORMATTERS.compact(token.volume)}</div>
         </div>
         <div className="bg-zinc-950 p-4">
            <div className="text-zinc-500 text-xs uppercase mb-1">Transactions</div>
            <div className="text-white font-mono">{token.txns}</div>
         </div>
      </div>

      <div className="p-4 bg-zinc-950 flex gap-2">
        <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded text-sm transition-colors">
          Buy {token.ticker}
        </button>
        <button className="p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors">
          <Activity size={20} />
        </button>
        <button className="p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors">
           <Globe size={20} />
        </button>
      </div>
    </div>
  );
};