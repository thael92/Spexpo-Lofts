import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';

export const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [currentImg, setCurrentImg] = useState(0);
  const favorite = isFavorite(property.id);

  // Simulação de quantidade de pessoas baseada nos quartos (2 por quarto)
  const pessoas = property.quartos * 2;

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImg((prev) => (prev + 1) % property.imagens.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImg((prev) => (prev === 0 ? property.imagens.length - 1 : prev - 1));
  };

  return (
    <div className="group bg-white rounded-[2.5rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 flex flex-col overflow-hidden relative border border-gray-50">
      
      {/* Botão Favorito - Estilo Flutuante */}
      <button 
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property);
        }}
        className={`absolute top-5 right-5 z-30 p-2.5 rounded-full transition-all shadow-lg ${
            favorite ? 'bg-brand-red text-white' : 'bg-white/90 text-gray-400 hover:text-brand-red'
        }`}
      >
        <Heart size={18} fill={favorite ? "currentColor" : "none"} />
      </button>

      {/* Container de Imagem com Curva e Navegação */}
      <div className="relative aspect-[16/11] overflow-hidden bg-gray-100 group/img">
        <Link to={`/imoveis/${property.id}`}>
          <img 
            src={property.imagens[currentImg]} 
            alt={property.titulo} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Overlay Curvado (Estilo da Imagem) */}
          <div className="absolute bottom-0 left-0 w-full leading-[0] z-10">
            <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-12 fill-white">
              <path d="M0,50 L500,50 L500,0 C350,40 150,40 0,0 Z"></path>
            </svg>
          </div>

          {/* Setas de Navegação */}
          <button 
            onClick={prevImg}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/10 text-white opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-black/30"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextImg}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/10 text-white opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-black/30"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicadores (Dots) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {property.imagens.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentImg ? 'w-4 bg-white' : 'w-2 bg-white/40'}`}
              />
            ))}
          </div>
        </Link>
      </div>
      
      {/* Conteúdo Centralizado (Seguindo a foto) */}
      <div className="p-8 pt-2 flex flex-col items-center text-center">
        
        <Link to={`/imoveis/${property.id}`} className="block w-full">
            <h3 className="text-[1.35rem] font-extrabold text-[#111] leading-tight mb-4 group-hover:text-brand-red transition-colors">
                {property.titulo}
            </h3>
        </Link>
        
        {/* Atributos Principais */}
        <div className="flex items-center gap-3 text-[13px] font-medium text-gray-400 mb-2">
            <span>{pessoas} pessoas</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{property.quartos} {property.quartos > 1 ? 'quartos' : 'quarto'}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{property.banheiros} {property.banheiros > 1 ? 'banheiros' : 'banheiro'}</span>
        </div>

        {/* Tags de Comodidades (Segunda linha da foto) */}
        <div className="flex flex-wrap justify-center gap-3 text-[12px] font-medium text-gray-400">
            {property.caracteristicas.slice(0, 2).map((feature, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="w-1 h-1 bg-gray-300 rounded-full mt-1.5"></span>}
                <span className="lowercase italic">{feature}</span>
              </React.Fragment>
            ))}
        </div>

        {/* Preço e Localização Discretos (Opcional, mas mantendo o design limpo) */}
        <div className="mt-8 w-full flex items-center justify-between border-t border-gray-50 pt-6">
           <div className="text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 block">A partir de</span>
              <span className="text-xl font-black text-[#111]">R$ {property.preco}</span>
           </div>
           <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-red block">{property.endereco.bairro}</span>
              <span className="text-[10px] font-bold text-gray-400">São Paulo, SP</span>
           </div>
        </div>
      </div>
    </div>
  );
};