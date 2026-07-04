import { create } from 'zustand';

export const useStore = create((set) => ({
  properties: [],
  favorites: [],

  fetchProperties: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/properties');
      const data = await response.json();
      set({ properties: data });
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    }
  },

  addProperty: async (property) => {
    try {
      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property),
      });
      const newProperty = await response.json();
      set((state) => ({
        properties: [...state.properties, newProperty]
      }));
    } catch (error) {
      console.error('Failed to add property:', error);
    }
  },

  toggleFavorite: (id) => set((state) => {
    if (state.favorites.includes(id)) {
      return { favorites: state.favorites.filter((favId) => favId !== id) };
    }
    return { favorites: [...state.favorites, id] };
  }),
}));
