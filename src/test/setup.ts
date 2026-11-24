import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import { useFavorites } from '../stores/favorites';
beforeEach(() => {
 localStorage.clear();
 useFavorites.setState({ favorites: [] });
 vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('Solicitud no simulada'))));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
