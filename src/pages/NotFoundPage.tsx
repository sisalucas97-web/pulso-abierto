import { Link } from 'react-router-dom';
export default function NotFoundPage() { return <section className="intro"><p className="eyebrow">ERROR 404</p><h1>Página no encontrada</h1><p>La dirección ingresada no existe.</p><Link to="/">Volver a cotizaciones</Link></section>; }
