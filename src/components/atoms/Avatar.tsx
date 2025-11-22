import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({ src, size = 'sm', className }: AvatarProps) => {
  const sizeClasses = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-16 h-16' };
  return (
    <div className={cn(sizeClasses[size], "rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0", className)}>
      <img 
        src={src} 
        alt="Token" 
        className="w-full h-full object-cover" 
        onError={(e) => e.currentTarget.style.display='none'} 
      />
    </div>
  );
};