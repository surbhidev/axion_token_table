"use client"

import React, { useState, useMemo } from 'react';
import { Zap, Flame, TrendingUp } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { Token, SortOption } from '@/types';
import { useTokenData } from '@/hooks/useTokenData';

import { Header } from '@/components/organisms/Header';
import { TokenColumn } from '@/components/organisms/TokenColumn';
import { Modal } from '@/components/molecules/Modal';
import { TokenDetails } from '@/components/organisms/TokenDetails';

export default function Dashboard() {
  const { tokens, loading } = useTokenData();
  
  const [search, setSearch] = useState('');
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [activeTab, setActiveTab] = useState(CATEGORIES.NEW);
  const [sortBy, setSortBy] = useState<SortOption>('age');

  const processedTokens = useMemo(() => {
    let result = [...tokens];

    if (search) {
      result = result.filter(t => 
        t.ticker.toLowerCase().includes(search.toLowerCase()) || 
        t.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    result.sort((a, b) => {
        if (sortBy === 'mcap') return b.mcap - a.mcap;
        if (sortBy === 'volume') return b.volume - a.volume;
        return 0; 
    });

    return {
      [CATEGORIES.NEW]: result.filter(t => t.type === CATEGORIES.NEW),
      [CATEGORIES.STRETCH]: result.filter(t => t.type === CATEGORIES.STRETCH),
      [CATEGORIES.MIGRATED]: result.filter(t => t.type === CATEGORIES.MIGRATED),
    };
  }, [tokens, search, sortBy]);

  return (
    <div className="flex flex-col h-screen bg-transparent text-zinc-300 font-sans overflow-hidden relative">
      
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <Header 
            search={search} 
            onSearchChange={setSearch} 
            sortBy={sortBy} 
            onSortChange={(val) => setSortBy(val as SortOption)} 
        />

        <main className="flex-1 min-h-0 relative">
            {/* Mobile Tab Switcher */}
            <div className="md:hidden flex border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
            {[
                { id: CATEGORIES.NEW, label: 'New Pairs', icon: Zap },
                { id: CATEGORIES.STRETCH, label: 'Final Stretch', icon: Flame },
                { id: CATEGORIES.MIGRATED, label: 'Migrated', icon: TrendingUp }
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 text-xs font-bold uppercase flex items-center justify-center gap-2 border-b-2 transition-colors ${
                    activeTab === tab.id 
                        ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' 
                        : 'border-transparent text-zinc-500'
                    }`}
                >
                <tab.icon size={14} />
                {tab.label}
                </button>
            ))}
            </div>

            {/* Columns */}
            <div className="h-full grid grid-cols-1 md:grid-cols-3 divide-x divide-zinc-800/50">
                <div className={`${activeTab === CATEGORIES.NEW ? 'block' : 'hidden'} md:block h-full overflow-hidden bg-black/20`}>
                    <TokenColumn 
                        title="New Pairs" 
                        icon={Zap} 
                        color="blue"
                        tokens={processedTokens[CATEGORIES.NEW]}
                        loading={loading}
                        onTokenClick={setSelectedToken}
                    />
                </div>

                <div className={`${activeTab === CATEGORIES.STRETCH ? 'block' : 'hidden'} md:block h-full overflow-hidden bg-black/20`}>
                    <TokenColumn 
                        title="Final Stretch" 
                        icon={Flame} 
                        color="emerald"
                        tokens={processedTokens[CATEGORIES.STRETCH]}
                        loading={loading}
                        onTokenClick={setSelectedToken}
                    />
                </div>

                <div className={`${activeTab === CATEGORIES.MIGRATED ? 'block' : 'hidden'} md:block h-full overflow-hidden bg-black/20`}>
                    <TokenColumn 
                        title="Migrated" 
                        icon={TrendingUp} 
                        color="purple"
                        tokens={processedTokens[CATEGORIES.MIGRATED]}
                        loading={loading}
                        onTokenClick={setSelectedToken}
                    />
                </div>
            </div>
        </main>
      </div>

      <Modal isOpen={!!selectedToken} onClose={() => setSelectedToken(null)}>
         {selectedToken && <TokenDetails token={selectedToken} />}
      </Modal>
    </div>
  );
}