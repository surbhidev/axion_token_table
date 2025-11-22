import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'green' | 'red' | 'blue';
  className?: string;
}

export const Badge = ({ children, variant = 'neutral', className }: BadgeProps) => {
  const styles = {
    neutral: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <span className={cn("px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider border rounded-sm", styles[variant], className)}>
      {children}
    </span>
  );
};