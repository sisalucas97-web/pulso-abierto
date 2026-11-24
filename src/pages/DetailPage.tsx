import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { coins } from '../data/coins';
import { usePrices } from '../hooks/usePrices';
import OperationStatus from '../components/OperationStatus';
import CoinCard from '../components/CoinCard';
export default function DetailPage() {
 const {id} = useParams();
 const info = coins.find(coin => coin.id === id);
 const {data, status, error, load} = usePrices();
 useEffect(() => { if (info) void load(); }, [info, load]);
 if (!info) return <section className="intro"><h1>Criptomoneda no encontrada</h1><p>El identificador no corresponde a Bitcoin, Ethereum o Solana.</p><Link to="/">Volver a cotizaciones</Link></section>;
 const coin = data.find(item => item.id === id);
 const viewStatus = status === 'result' && !coin ? 'empty' : status;
 return <section className="detail"><Link to="/">← Volver a cotizaciones</Link><h1>{info.name}</h1><p className="intro-copy">{info.description}</p>
 <OperationStatus status={viewStatus} count={coin ? 1 : 0} error={error} onRetry={() => void load()}/>
 {coin && status === 'result' && <CoinCard coin={coin} detail/>}</section>;
}
