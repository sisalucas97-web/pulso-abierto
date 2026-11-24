import { Link, Route, Routes } from 'react-router-dom';
import { useFavorites } from './stores/favorites';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
export default function App() {
 const favoriteCount = useFavorites(state => state.favorites.length);
 return <div className="app-shell"><a className="skip-link" href="#main">Saltar al contenido</a><header className="site-header"><Link className="brand" to="/" aria-label="Pulso Abierto inicio"><span className="brand-mark" aria-hidden="true">P</span><span>Pulso <strong>Abierto</strong></span></Link><nav aria-label="Principal"><Link to="/">Cotizaciones</Link><span aria-label="Cantidad de favoritos">Favoritos: {favoriteCount}</span></nav></header>
 <main id="main" tabIndex={-1}><Routes><Route path="/" element={<SearchPage/>}/><Route path="/criptomonedas/:id" element={<DetailPage/>}/><Route path="*" element={<NotFoundPage/>}/></Routes></main>
 <aside className="note"><p>Fuente: CoinGecko. Los precios corresponden a la última consulta, no se actualizan automáticamente y pueden variar.</p></aside><footer className="site-footer"><span>Pulso Abierto · Programación Web</span><a href="https://www.coingecko.com/" target="_blank" rel="noreferrer">Datos de CoinGecko</a></footer></div>;
}
