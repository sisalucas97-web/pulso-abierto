import { useState } from 'react';
import type { FormEvent } from 'react';
import { querySchema } from '../validation/query';
import type { Query } from '../validation/query';
interface Props { onSearch: (query: Query) => void; loading: boolean }
export default function QueryForm({onSearch, loading}: Props) {
 const [text, setText] = useState('todas');
 const [filter, setFilter] = useState('all');
 const [errors, setErrors] = useState<{text?: string; filter?: string}>({});
 function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const result = querySchema.safeParse({text, filter});
  if (!result.success) {
   const next: typeof errors = {};
   result.error.issues.forEach(issue => { const field = issue.path[0]; if (field === 'text' || field === 'filter') next[field] = issue.message; });
   setErrors(next); return;
  }
  setErrors({}); setText(result.data.text); onSearch(result.data);
 }
 return <form onSubmit={submit} noValidate>
  <div className="form-grid"><div><label htmlFor="search">Nombre o símbolo</label>
  <input id="search" value={text} onChange={e => setText(e.target.value)} aria-invalid={!!errors.text} aria-describedby={errors.text ? 'search-help search-error' : 'search-help'} />
  <p id="search-help" className="form-help">Ejemplos: bitcoin, ETH o todas.</p>
  {errors.text && <p id="search-error" className="field-error" role="alert">Error: {errors.text}</p>}</div>
  <div><label htmlFor="filter">Mostrar</label><select id="filter" value={filter} onChange={e => setFilter(e.target.value)} aria-invalid={!!errors.filter} aria-describedby={errors.filter ? 'filter-error' : undefined}>
  <option value="all">Todas</option><option value="marked">Solo favoritas</option></select>
  {errors.filter && <p id="filter-error" className="field-error" role="alert">Error: {errors.filter}</p>}</div></div>
  <button className="primary-button" disabled={loading}>{loading ? 'Consultando…' : 'Consultar precios'}</button>
 </form>;
}
