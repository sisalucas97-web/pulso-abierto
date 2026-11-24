import { coins } from '../data/coins';
import type { Coin } from '../types/coin';
const coinIds = coins.map(coin => coin.id).join(',');
const API_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`;
export async function fetchPrices(signal?: AbortSignal): Promise<Coin[]> {
 const response = await fetch(API_URL, { signal });
 if (!response.ok) throw new Error(response.status === 429 ? 'CoinGecko recibió demasiadas consultas. Esperá un momento y reintentá.' : `El servicio respondió con el código ${response.status}.`);
 const data: unknown = await response.json();
 if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('El servicio devolvió un formato inesperado.');
 const prices = data as Record<string, unknown>;
 return coins.flatMap(coin => {
  const item = prices[coin.id];
  if (!item || typeof item !== 'object' || !('usd' in item)) return [];
  const usd = item.usd;
  return typeof usd === 'number' && Number.isFinite(usd) && usd >= 0 ? [{...coin, usd}] : [];
 });
}
