import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { PropertyCard } from '../components/PropertyCard';

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="text-brand-red fill-current" /> Meus Favoritos
            </h1>
            <p className="text-gray-500 mt-2">Gerencie os imóveis que você mais gostou.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {favorites.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <Heart size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Você ainda não tem favoritos</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Navegue pelos nossos imóveis e clique no coração para salvar aqueles que você mais gostar.
                </p>
                <Link to="/imoveis" className="inline-flex items-center gap-2 px-8 py-3 bg-brand-red text-white font-bold rounded-full hover:bg-red-800 transition-colors shadow-lg">
                    <ArrowLeft size={18} /> Explorar Imóveis
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};