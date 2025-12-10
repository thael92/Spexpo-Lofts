import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, BedDouble, Heart, Star } from 'lucide-react';
import { Property } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';

export const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-200 overflow-hidden relative">
      
      {/* Favorite Button (Overlay) */}
      <button 
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors shadow-sm ${
            favorite ? 'bg-white text-[#D32F2F]' : 'bg-white/80 text-gray-400 hover:text-[#D32F2F]'
        }`}
      >
        <Heart size={18} fill={favorite ? "currentColor" : "none"} />
      </button>

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Link to={`/imoveis/${property.id}`}>
          <img 
            src={property.imagens[0]} 
            alt={property.titulo} 
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {property.destaque && (
            <div className="absolute top-3 left-3 bg-[#FFB700] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase flex items-center gap-1">
                <Star size={10} fill="currentColor" /> Top
            </div>
        )}
        {/* High Demand Badge */}
        {Math.random() > 0.7 && (
            <div className="absolute bottom-3 left-3 bg-[#D32F2F] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase">
                Muita procura!
            </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        
        <Link to={`/imoveis/${property.id}`} className="block">
            <h3 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-[#D32F2F] transition-colors line-clamp-2 uppercase">
                {property.titulo}
            </h3>
        </Link>
        
        {/* Quick Location */}
        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
            <MapPin size={12} /> {property.endereco.bairro} / {property.endereco.cidade}
        </div>

        {/* Icons Row */}
        <div className="flex items-center gap-4 text-xs text-gray-600 mb-4 border-b border-gray-100 pb-3">
            <span className="flex items-center gap-1" title="Hóspedes">
                <Users size={14} className="text-[#D32F2F]" /> 
                <span className="font-semibold">{property.quartos * 2}</span> Pessoas
            </span>
            <span className="flex items-center gap-1" title="Quartos">
                <BedDouble size={14} className="text-[#D32F2F]" /> 
                <span className="font-semibold">{property.quartos}</span> Quartos
            </span>
        </div>

        {/* Footer: Price */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">A partir de</span>
            <div className="flex items-center gap-1 text-gray-800">
                <span className="text-lg font-bold">{formatter.format(property.preco)}</span>
                <span className="text-xs">a diária</span>
            </div>
          </div>
          <Link 
            to={`/imoveis/${property.id}`}
            className="px-4 py-2 bg-white border border-[#D32F2F] text-[#D32F2F] text-xs font-bold rounded hover:bg-[#D32F2F] hover:text-white transition-colors"
          >
            VER IMÓVEL
          </Link>
        </div>
      </div>
    </div>
  );
};