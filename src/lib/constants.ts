import { Token, Category } from "@/types";

export const CATEGORIES = {
  NEW: 'new_pairs' as Category,
  STRETCH: 'final_stretch' as Category,
  MIGRATED: 'migrated' as Category
};

// Mock Data Generator
const generateToken = (id: number, type: Category): Token => {
  const isUp = Math.random() > 0.4;
  return {
    id: `token-${id}`,
    ticker: ['AXI', 'PEPE', 'WIF', 'BONK', 'SOL', 'TRUMP', 'PULSE', 'MEME'][Math.floor(Math.random() * 8)] + Math.floor(Math.random() * 99),
    name: 'Mock Token',
    address: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
    price: Math.random() * 0.05,
    mcap: Math.floor(Math.random() * 1000000) + 5000,
    liquidity: Math.floor(Math.random() * 50000),
    change1m: (Math.random() * 10) * (isUp ? 1 : -1),
    change5m: (Math.random() * 20) * (Math.random() > 0.5 ? 1 : -1),
    age: Math.floor(Math.random() * 60) + 'm',
    txns: Math.floor(Math.random() * 500),
    volume: Math.floor(Math.random() * 100000),
    type: type,
    image: `https://api.dicebear.com/7.x/identicon/svg?seed=${id}`
  };
};

export const INITIAL_DATA: Token[] = [
  ...Array.from({ length: 15 }, (_, i) => generateToken(i + 100, CATEGORIES.NEW)),
  ...Array.from({ length: 15 }, (_, i) => generateToken(i + 200, CATEGORIES.STRETCH)),
  ...Array.from({ length: 15 }, (_, i) => generateToken(i + 300, CATEGORIES.MIGRATED))
];