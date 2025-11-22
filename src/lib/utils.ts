import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Standard cn utility for Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FORMATTERS = {
  currency: (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val),
  compact: (val: number) => 
    new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(val),
  percent: (val: number) => 
    `${val > 0 ? '+' : ''}${val.toFixed(2)}%`,
  address: (addr: string) => 
    `${addr.slice(0, 4)}...${addr.slice(-4)}`
};