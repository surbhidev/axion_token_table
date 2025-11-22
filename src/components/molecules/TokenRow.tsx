import React, { useRef, useState, useEffect, memo } from 'react';
import { Token } from '@/types';
import { FORMATTERS } from '@/lib/utils';
import { Avatar } from '../atoms/Avatar';
import Popover from '@/components/atoms/Popover';
import { Info } from 'lucide-react';

// Simple Sparkline
const Sparkline = ({ isPositive }: { isPositive: boolean }) => {
  const color = isPositive ? '#34d399' : '#f43f5e';
  const d = isPositive
    ? "M0 20 Q10 18 20 15 T40 10 T60 5"
    : "M0 5 Q10 8 20 12 T40 18 T60 22";

  return (
    <svg
      width="60"
      height="25"
      className="opacity-50 group-hover:opacity-100 transition-opacity will-change-transform"
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const TokenRow = memo(({ token, onClick }: { token: Token, onClick: (token: Token) => void }) => {
  const prevPriceRef = useRef(token.price);
  const [flash, setFlash] = useState<'green' | 'red' | null>(null);
  const rippleRef = useRef<HTMLDivElement | null>(null);

  const createRipple = (e: React.MouseEvent) => {
    const el = rippleRef.current;
    if (!el) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rip = document.createElement("span");
    rip.style.left = `${x}px`;
    rip.style.top = `${y}px`;
    rip.className =
      "absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 animate-ripple pointer-events-none";

    el.appendChild(rip);
    setTimeout(() => {
      try {
        el.removeChild(rip);
      } catch (_) { }
    }, 650);
  };

  useEffect(() => {
    if (token.price > prevPriceRef.current) setFlash("green");
    else if (token.price < prevPriceRef.current) setFlash("red");

    prevPriceRef.current = token.price;
    setTimeout(() => setFlash(null), 600);
  }, [token.price]);

  const borderClass =
    flash === "green"
      ? "border-emerald-500/50 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)] animate-flashFade"
      : flash === "red"
        ? "border-rose-500/50 shadow-[inset_0_0_20px_rgba(244,63,94,0.1)] animate-flashFade"
        : "border-zinc-800/30 hover:border-zinc-700 hover:bg-zinc-900/40";

  return (
    <div
      onClick={(e) => {
        createRipple(e);
        onClick(token);
      }}
      className={`group relative flex items-center gap-3 p-3 border-b cursor-pointer 
      transition-all duration-300 hover:scale-[1.007] hover:-translate-y-1 
      hover:shadow-xl ${borderClass}`}
    >
      {/* Ripple Container */}
      <div ref={rippleRef} className="absolute inset-0 overflow-hidden"></div>

      {/* Flash Indicator */}
      {flash === "green" && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500 shadow-[0_0_10px_#10b981]" />
      )}
      {flash === "red" && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-rose-500 shadow-[0_0_10px_#f43f5e]" />
      )}

      <div className="relative flex items-center gap-2">
        <Popover
          placement="right"
          hover
          trigger={
            <div className="cursor-pointer">
              <Avatar
                src={token.image}
                size="sm"
                className="ring-1 ring-zinc-800 group-hover:ring-zinc-600 transition-all"
              />
            </div>
          }
        >
          <div className="text-left">
            <div className="font-medium">
              {token.name}{" "}
              <span className="text-xs text-zinc-500">
                ({token.ticker})
              </span>
            </div>

            <div className="text-sm mt-1">
              Price:{" "}
              <span className="font-mono">{token.price.toFixed(4)}</span>
            </div>

            <div className="text-sm text-zinc-400 mt-1">
              Market Cap: {FORMATTERS.compact(token.mcap)}
            </div>

            <div className="text-sm text-zinc-400 mt-1">
              Volume: {FORMATTERS.compact(token.volume)}
            </div>
          </div>
        </Popover>

        <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">
          <Info size={14} />
        </button>
      </div>

      {/* Identity */}
      <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-4 flex flex-col justify-center">
          <span className="font-bold text-zinc-100 text-base group-hover:text-white transition-colors">
            {token.ticker}
          </span>
          <span className="text-zinc-500 text-xs">
            /SOL
          </span>
        </div>

        {/* Sparkline */}
        <div className="col-span-3 flex items-center justify-center">
          <Sparkline isPositive={token.change1m >= 0} />
        </div>

        {/* Stats */}
        <div className="col-span-5 flex flex-col items-end">
          <div
            className={`flex items-center gap-1 text-base font-mono 
            ${token.change1m >= 0 ? "text-emerald-400" : "text-rose-400"}`}
          >
            {FORMATTERS.percent(token.change1m)}
          </div>

          <span className="text-xs text-zinc-500 font-mono">
            Vol: {FORMATTERS.compact(token.volume)}
          </span>
        </div>
      </div>
    </div>
  );
}, (prev, next) => {
  return (
    prev.token.price === next.token.price &&
    prev.token.change1m === next.token.change1m &&
    prev.token.mcap === next.token.mcap
  );
});

TokenRow.displayName = "TokenRow";
