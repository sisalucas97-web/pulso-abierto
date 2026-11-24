import { useState } from 'react';
import QueryForm from '../components/QueryForm';
import OperationStatus from '../components/OperationStatus';
import CoinList from '../components/CoinList';
import { usePrices } from '../hooks/usePrices';
import type { Query } from '../validation/query';
import { useFavorites } from '../stores/favorites';
export default function SearchPage() {
 const {data, status, error, load} = usePrices();
 const [query, setQuery] = useState<Query>({text:'todas',filter:'all'});
 const marked = useFavorites(state => state.favorites);
 const term = query.text.toLowerCase();
 const visible = data.filter(coin => (term === 'todas' || coin.name.toLowerCase().includes(term) || coin.symbol.toLowerCase().includes(term)) && (query.filter === 'all' || marked.includes(coin.id)));
 const viewStatus = status === 'result' && visible.length === 0 ? 'empty' : status;
 function search(value: Query) { setQuery(value); void load(); }
 return <><section className="intro"><p className="eyebrow">MERCADO CRIPTO</p><h1>El mercado,<br/><span>un poco más claro.</span></h1><p className="intro-copy">Consultá Bitcoin, Ethereum y Solana. Filtrá los resultados y explorá cada moneda.</p></section>
 <section className="quote-panel" aria-labelledby="quotes-title"><div className="panel-heading"><h2 id="quotes-title">Cotizaciones</h2><span className="currency-badge">USD</span></div>
 <QueryForm onSearch={search} loading={status === 'loading'}/><p className="form-help mark-help">Tus favoritos se conservan al cambiar de vista y recargar.</p>
 <OperationStatus status={viewStatus} count={visible.length} error={error} onRetry={() => void load()}/>
 {viewStatus === 'result' && <CoinList coins={visible}/>}</section></>;
}
