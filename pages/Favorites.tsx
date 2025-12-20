import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { PropertyCard } from '../components/PropertyCard';
import { useLanguage } from '../contexts/LanguageContext';

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 py-12">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-black text-neutral-900 flex items-center gap-4 tracking-tighter uppercase">
                <Heart className="text-brand-red fill-current" /> {t('fav.title')}
            </h1>
            <p className="text-gray-400 mt-2 font-medium">{t('fav.subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {favorites.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-gray-100 max-w-2xl mx-auto px-8">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200">
                    <Heart size={48} />
                </div>
                <h2 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight uppercase italic">{t('fav.empty')}</h2>
                <p className="text-gray-400 mb-10 max-w-md mx-auto font-medium">
                    {t('fav.empty.desc')}
                </p>
                <Link to="/imoveis" className="inline-flex items-center gap-3 px-10 py-5 bg-neutral-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-brand-red transition-all shadow-xl">
                    <ArrowLeft size={18} /> {t('fav.explore')}
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {favorites.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};