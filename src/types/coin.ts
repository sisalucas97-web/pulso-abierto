export type CoinId = 'bitcoin' | 'ethereum' | 'solana';
export interface CoinInfo { id: CoinId; name: string; symbol: string; initials: string; description: string }
export interface Coin extends CoinInfo { usd: number }
export type RequestState = 'initial' | 'loading' | 'result' | 'empty' | 'error';
