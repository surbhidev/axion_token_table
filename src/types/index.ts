export type Category = 'new_pairs' | 'final_stretch' | 'migrated';

export interface Token {
  id: string;
  ticker: string;
  name: string;
  address: string;
  price: number;
  mcap: number;
  liquidity: number;
  change1m: number;
  change5m: number;
  age: string;
  txns: number;
  volume: number;
  type: Category;
  image: string;
}

export type SortOption = 'age' | 'mcap' | 'volume';