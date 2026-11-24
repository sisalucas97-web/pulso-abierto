import { expect, it, vi } from 'vitest';
import { fetchPrices } from '../services/prices';
it('transforma la respuesta HTTP exitosa a monedas tipadas', async()=>{
 const signal=new AbortController().signal;
 vi.mocked(fetch).mockResolvedValue({ok:true,json:async()=>({bitcoin:{usd:65000},ethereum:{usd:-1},solana:{usd:'150'}})} as Response);
 const result=await fetchPrices(signal);
 expect(result).toHaveLength(1);
 expect(result[0]).toMatchObject({id:'bitcoin',name:'Bitcoin',symbol:'BTC',usd:65000});
 expect(fetch).toHaveBeenCalledWith(expect.stringContaining('api.coingecko.com'),{signal});
});
it('rechaza una respuesta con ok false sin procesar el JSON',async()=>{
 const json=vi.fn();
 vi.mocked(fetch).mockResolvedValue({ok:false,status:503,json} as unknown as Response);
 await expect(fetchPrices()).rejects.toThrow('503');
 expect(json).not.toHaveBeenCalled();
});
it('devuelve una lista vacía si la API no contiene precios',async()=>{
 vi.mocked(fetch).mockResolvedValue({ok:true,json:async()=>({})} as Response);
 await expect(fetchPrices()).resolves.toEqual([]);
});
