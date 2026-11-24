import { useFavorites } from '../stores/favorites';
import type { CoinInfo } from '../types/coin';
export default function FavoriteButton({coin}: {coin: CoinInfo}) {
 const selected = useFavorites(state => state.favorites.includes(coin.id));
 const toggle = useFavorites(state => state.toggleFavorite);
 return <button type="button" className="mark-button" aria-pressed={selected}
  onClick={() => toggle(coin.id)}>{selected ? 'Quitar' : 'Agregar'} {coin.symbol} {selected ? 'de' : 'a'} favoritos</button>;
}
