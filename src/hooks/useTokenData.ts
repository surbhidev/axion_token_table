import { useState, useEffect } from 'react';
import { Token } from '@/types';
import { INITIAL_DATA } from '@/lib/constants';

export const useTokenData = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial Load
  useEffect(() => {
    const timer = setTimeout(() => {
      setTokens(INITIAL_DATA);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // WebSocket Simulation
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setTokens(currentTokens => {
        const indices = [
            Math.floor(Math.random() * currentTokens.length),
            Math.floor(Math.random() * currentTokens.length),
            Math.floor(Math.random() * currentTokens.length)
        ];
        
        const newTokens = [...currentTokens];
        indices.forEach(idx => {
            const token = newTokens[idx];
            if (!token) return;
            
            const priceChange = (Math.random() - 0.5) * 0.0001;
            const newPrice = Math.max(0.000001, token.price + priceChange);
            const mcapChange = priceChange * 1000000;
            
            newTokens[idx] = {
                ...token,
                price: newPrice,
                mcap: token.mcap + mcapChange,
                change1m: token.change1m + (Math.random() - 0.5) * 2 
            };
        });
        return newTokens;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [loading]);

  return { tokens, loading };
};
