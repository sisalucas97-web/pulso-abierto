import { act, renderHook, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { usePrices } from '../hooks/usePrices';
it('ignora una respuesta anterior que termina después de la consulta vigente',async()=>{
 const pending: ((r:Response)=>void)[]=[];
 vi.mocked(fetch).mockImplementation(()=>new Promise(resolve=>pending.push(resolve)));
 const {result}=renderHook(()=>usePrices());
 act(()=>{void result.current.load();});
 act(()=>{void result.current.load();});
 await act(async()=>{pending[1]({ok:true,json:async()=>({bitcoin:{usd:200}})} as Response);});
 await waitFor(()=>expect(result.current.data[0]?.usd).toBe(200));
 await act(async()=>{pending[0]({ok:true,json:async()=>({bitcoin:{usd:100}})} as Response);});
 expect(result.current.data[0]?.usd).toBe(200);
});
