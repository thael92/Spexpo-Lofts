import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Square, Car } from 'lucide-react';
import { Property } from '../types';

export const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative overflow-hidden h-56">
        <Link to={`/imoveis/${property.id}`}>
          <img 
            src={property.imagens[0]} 
            alt={property.titulo} 
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        <div className="absolute top-3 left-3 flex gap-2">
          {property.destaque && (
            <span className="px-3 py-1 text-xs font-bold uppercase rounded-md shadow-sm bg-yellow-400 text-yellow-900">
              Destaque
            </span>
          )}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-xs text-brand-red font-semibold tracking-wider mb-1 uppercase">{property.tipo}</p>
          <Link to={`/imoveis/${property.id}`}>
            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-brand-red transition-colors line-clamp-1">{property.titulo}</h3>
          </Link>
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <MapPin size={14} className="mr-1 text-gray-400" />
            <span className="truncate">{property.endereco.bairro}, {property.endereco.cidade}</span>
          </div>
          
          <div className="flex items-center justify-between py-4 border-t border-gray-100 text-gray-600 text-sm">
            <div className="flex flex-col items-center gap-1" title="Área">
              <Square size={16} />
              <span>{property.area_m2}m²</span>
            </div>
            <div className="flex flex-col items-center gap-1" title="Quartos">
              <BedDouble size={16} />
              <span>{property.quartos}</span>
            </div>
            <div className="flex flex-col items-center gap-1" title="Banheiros">
              <Bath size={16} />
              <span>{property.banheiros}</span>
            </div>
            <div className="flex flex-col items-center gap-1" title="Vagas">
              <Car size={16} />
              <span>{property.vagas}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="block text-xs text-gray-400">Diária a partir de</span>
            <span className="text-xl font-bold text-brand-red">{formatter.format(property.preco)}</span>
          </div>
          <Link 
            to={`/imoveis/${property.id}`}
            className="px-6 py-2 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-brand-red transition-colors uppercase tracking-wide"
          >
            RESERVAR
          </Link>
        </div>
      </div>
    </div>
  );
};