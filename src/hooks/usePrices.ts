import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchPrices } from '../services/prices';
import type { Coin, RequestState } from '../types/coin';
export function usePrices() {
 const [data, setData] = useState<Coin[]>([]);
 const [status, setStatus] = useState<RequestState>('initial');
 const [error, setError] = useState('');
 const current = useRef<AbortController | null>(null);
 const load = useCallback(async () => {
  current.current?.abort();
  const controller = new AbortController();
  current.current = controller;
  setStatus('loading'); setError(''); setData([]);
  try {
   const result = await fetchPrices(controller.signal);
   if (controller.signal.aborted) return;
   setData(result); setStatus(result.length ? 'result' : 'empty');
  } catch (cause: unknown) {
   if (controller.signal.aborted) return;
   setError(cause instanceof Error ? cause.message : 'No se pudo completar la consulta.');
   setStatus('error');
  }
 }, []);
 useEffect(() => () => current.current?.abort(), []);
 return { data, status, error, load };
}
