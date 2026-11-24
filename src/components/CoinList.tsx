import CoinCard from './CoinCard';
import type { Coin } from '../types/coin';
export default function CoinList({coins}: {coins: Coin[]}) {
 return <div className="coin-grid">{coins.map(coin => <CoinCard key={coin.id} coin={coin}/>)}</div>;
}
