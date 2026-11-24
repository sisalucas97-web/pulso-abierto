import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CoinId } from '../types/coin';
interface FavoritesState {
 favorites: CoinId[];
 toggleFavorite: (id: CoinId) => void;
}
export const useFavorites = create<FavoritesState>()(persist(
 (set) => ({
  favorites: [],
  toggleFavorite: (id) => set((state) => ({
   favorites: state.favorites.includes(id)
    ? state.favorites.filter((item) => item !== id)
    : [...state.favorites, id],
  })),
 }),
 { name: 'pulso-abierto-favorites', storage: createJSONStorage(() => localStorage),
   partialize: (state) => ({ favorites: state.favorites }) },
));
