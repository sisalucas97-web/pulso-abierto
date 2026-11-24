import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import App from '../App';
import { useFavorites } from '../stores/favorites';
const prices = {bitcoin:{usd:65000},ethereum:{usd:3200},solana:{usd:150}};
function response(data = prices) {return {ok:true,json:async()=>data} as Response;}
function mount() {return render(<MemoryRouter><App/></MemoryRouter>);}
describe('Recorridos de la aplicación', () => {
 it('muestra carga y después el resultado', async () => {
  let resolve!: (value:Response)=>void;
  vi.mocked(fetch).mockImplementation(()=>new Promise(r=>{resolve=r;}));
  const user=userEvent.setup(); mount();
  await user.click(screen.getByRole('button',{name:'Consultar precios'}));
  expect(screen.getByRole('status')).toHaveTextContent('Estamos consultando');
  expect(screen.getByRole('button',{name:'Consultando…'})).toBeDisabled();
  await act(async()=>{resolve(response());});
  expect(await screen.findByText('$65,000.00')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Resultados: 3');
 });
 it('comparte altas y bajas de favoritos entre listado y detalle', async () => {
  vi.mocked(fetch).mockResolvedValue(response());
  const user=userEvent.setup(); mount();
  await user.click(screen.getByRole('button',{name:'Consultar precios'}));
  await user.click(await screen.findByRole('button',{name:'Agregar BTC a favoritos'}));
  expect(screen.getByRole('button',{name:'Quitar BTC de favoritos'})).toHaveAttribute('aria-pressed','true');
  expect(screen.getByLabelText('Cantidad de favoritos')).toHaveTextContent('1');
  await user.click(screen.getByRole('link',{name:'Ver detalle de Bitcoin'}));
  await user.click(await screen.findByRole('button',{name:'Quitar BTC de favoritos'}));
  expect(screen.getByRole('button',{name:'Agregar BTC a favoritos'})).toHaveAttribute('aria-pressed','false');
  await user.click(screen.getByRole('link',{name:/Volver a cotizaciones/}));
  await user.click(screen.getByRole('button',{name:'Consultar precios'}));
  expect(await screen.findByRole('button',{name:'Agregar BTC a favoritos'})).toHaveAttribute('aria-pressed','false');
  expect(screen.getByLabelText('Cantidad de favoritos')).toHaveTextContent('0');
 });
 it('informa que no hay datos', async () => {
  vi.mocked(fetch).mockResolvedValue(response({} as typeof prices));
  const user=userEvent.setup(); mount();
  await user.click(screen.getByRole('button',{name:'Consultar precios'}));
  expect(await screen.findByText(/No hay cotizaciones/)).toBeInTheDocument();
 });
 it('muestra un error y se recupera al reintentar', async () => {
  vi.mocked(fetch).mockResolvedValueOnce({ok:false,status:503} as Response).mockResolvedValueOnce(response());
  const user=userEvent.setup(); mount();
  await user.click(screen.getByRole('button',{name:'Consultar precios'}));
  expect(await screen.findByText(/No se pudieron cargar los precios/)).toBeInTheDocument();
  await user.click(screen.getByRole('button',{name:'Reintentar consulta'}));
  expect(await screen.findByText('$65,000.00')).toBeInTheDocument();
  expect(screen.queryByRole('button',{name:'Reintentar consulta'})).not.toBeInTheDocument();
 });
 it('persiste altas y bajas y recupera la selección desde almacenamiento', async () => {
  vi.mocked(fetch).mockResolvedValue(response());
  const user=userEvent.setup(); mount();
  await user.click(screen.getByRole('button',{name:'Consultar precios'}));
  await user.click(await screen.findByRole('button',{name:'Agregar BTC a favoritos'}));
  const saved=localStorage.getItem('pulso-abierto-favorites')!;
  expect(JSON.parse(saved).state).toEqual({favorites:['bitcoin']});
  await act(async()=>{
   useFavorites.setState({favorites:[]});
   localStorage.setItem('pulso-abierto-favorites',saved);
   await useFavorites.persist.rehydrate();
  });
  expect(screen.getByRole('button',{name:'Quitar BTC de favoritos'})).toHaveAttribute('aria-pressed','true');
  await user.click(screen.getByRole('button',{name:'Quitar BTC de favoritos'}));
  expect(JSON.parse(localStorage.getItem('pulso-abierto-favorites')!).state).toEqual({favorites:[]});
  await act(async()=>{await useFavorites.persist.rehydrate();});
  expect(screen.getByRole('button',{name:'Agregar BTC a favoritos'})).toHaveAttribute('aria-pressed','false');
 });
});
