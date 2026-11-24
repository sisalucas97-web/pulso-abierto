import type { RequestState } from '../types/coin';
interface Props { status: RequestState; count?: number; error?: string; onRetry: () => void }
export default function OperationStatus({status, count = 0, error = '', onRetry}: Props) {
 const message = {initial:'Elegí los criterios y consultá los precios para comenzar.', loading:'Estamos consultando CoinGecko…', result:`Consulta completada. Resultados: ${count}.`, empty:'No hay cotizaciones que coincidan con la consulta. Probá con todas o cambiá el filtro.', error:`No se pudieron cargar los precios. ${error}`}[status];
 return <><div className={`status status--${status}`} role="status" aria-live="polite" aria-atomic="true">{message}</div>
 {status === 'error' && <button className="retry-button" onClick={onRetry}>Reintentar consulta</button>}</>;
}
