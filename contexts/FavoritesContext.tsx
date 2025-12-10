import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '../types';

interface FavoritesContextType {
  favorites: Property[];
  toggleFavorite: (property: Property) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Property[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('spexpo_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  // Save to LocalStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('spexpo_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (property: Property) => {
    setFavorites(prev => {
      const exists = prev.find(p => p.id === property.id);
      if (exists) {
        return prev.filter(p => p.id !== property.id);
      } else {
        return [...prev, property];
      }
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some(p => p.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};