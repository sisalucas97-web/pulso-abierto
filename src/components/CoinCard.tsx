import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import type { Coin } from '../types/coin';
interface Props { coin: Coin; detail?: boolean }
export default function CoinCard({coin, detail = false}: Props) {
 const price = new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:coin.usd < 1 ? 6 : 2}).format(coin.usd);
 return <article className="coin-card"><div className="coin-card-top"><span className={`coin-logo coin-logo--${coin.id}`} aria-hidden="true">{coin.initials}</span><div className="coin-identity"><h3>{coin.name}</h3><p>{coin.symbol}</p></div></div>
 <p className="price-label">Precio consultado</p><p className="coin-price">{price}</p><p className="price-unit">USD por unidad</p>
 <div className="card-actions">{!detail && <Link to={`/criptomonedas/${coin.id}`}>Ver detalle de {coin.name}</Link>}
 <FavoriteButton coin={coin}/></div></article>;
}
