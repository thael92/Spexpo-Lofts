import React, { useState } from 'react';
import { X, MapPin, Navigation, RotateCcw } from 'lucide-react';
import { POI_ICONS, POINTS_OF_INTEREST, Category, POI } from '../data/pointsOfInterest';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAddress: string;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, initialAddress }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('Transporte');
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

  if (!isOpen) return null;

  const getMapUrl = () => {
    // Origem limpa: Rua, Bairro, São Paulo, SP
    const origin = encodeURIComponent(`${initialAddress}, São Paulo, SP`);
    
    if (selectedPOI) {
      // Destino limpo: Nome do Local, Endereço, São Paulo, SP
      const dest = encodeURIComponent(`${selectedPOI.name}, ${selectedPOI.address}, São Paulo, SP`);
      // O formato 'q=from:X+to:Y' é o mais eficaz para forçar a exibição do trajeto no iframe embed
      return `https://maps.google.com/maps?f=d&saddr=${origin}&daddr=${dest}&hl=pt-br&ie=UTF8&output=embed&z=14&t=m`;
    }
    
    // Visualização simples do ponto da hospedagem
    return `https://maps.google.com/maps?q=${origin}&hl=pt-br&ie=UTF8&output=embed&z=16&t=m`;
  };

  const mapUrl = getMapUrl();

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-300">
      
      {/* Modal Container */}
      <div className="bg-white w-full h-full md:h-[90vh] md:max-w-7xl md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Painel Lateral de Controle */}
        <div className="w-full md:w-[350px] flex flex-col bg-white border-r border-gray-100 z-20 shadow-xl md:shadow-none">
          
          {/* Header do Modal */}
          <div className="p-6 md:p-8 pb-4 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-black text-neutral-900 tracking-tighter uppercase italic flex items-center gap-2">
                <Navigation className="text-brand-red" size={20} /> Explorar Rotas
              </h2>
              <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mt-1">Clique nos locais para ver o trajeto</p>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all">
              <X size={20} />
            </button>
          </div>

          {/* Seleção de Categorias */}
          <div className="px-6 md:px-8 mb-4">
            <div className="flex md:grid md:grid-cols-2 gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                {(Object.keys(POINTS_OF_INTEREST) as Category[]).map((cat) => {
                  const Icon = POI_ICONS[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setSelectedPOI(null); }}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl whitespace-nowrap text-[9px] font-black uppercase tracking-widest transition-all ${
                          activeCategory === cat 
                          ? 'bg-neutral-900 text-white shadow-lg' 
                          : 'bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-100'
                      }`}
                    >
                      <Icon size={12} /> {cat}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Lista de Locais - Desktop */}
          <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-10 hidden md:block">
            <div className="space-y-3">
               <button 
                  onClick={() => setSelectedPOI(null)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all group flex items-center justify-between ${
                    !selectedPOI 
                      ? 'border-brand-red bg-red-50/30' 
                      : 'border-transparent bg-gray-50'
                  }`}
               >
                  <div>
                    <h4 className="font-black text-neutral-900 text-[10px] uppercase tracking-widest mb-1 flex items-center gap-2">
                       <MapPin size={12} className={!selectedPOI ? "text-brand-red" : "text-gray-300"} /> Minha Hospedagem
                    </h4>
                    <p className="text-[9px] text-gray-400 font-bold truncate max-w-[180px]">{initialAddress}</p>
                  </div>
                  {selectedPOI && <RotateCcw size={12} className="text-gray-300 group-hover:text-neutral-900" />}
               </button>

               <div className="pt-4 pb-1 border-b border-gray-50">
                  <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em]">{activeCategory} na região</span>
               </div>

               {POINTS_OF_INTEREST[activeCategory].map((poi, idx) => (
                <button
                  key={`${activeCategory}-${idx}`}
                  onClick={() => setSelectedPOI(poi)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    selectedPOI?.name === poi.name 
                      ? 'border-brand-red bg-white shadow-lg -translate-y-0.5' 
                      : 'border-transparent bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center gap-2 mb-1">
                      <h3 className="font-black text-neutral-900 text-[10px] uppercase tracking-tight line-clamp-1">{poi.name}</h3>
                      <span className="text-[8px] font-black px-1.5 py-0.5 rounded-md bg-neutral-900 text-white shrink-0">
                        {poi.distance || 'ver rota'}
                      </span>
                  </div>
                  <p className="text-[9px] text-gray-400 font-bold truncate">{poi.address}</p>
                </button>
               ))}
            </div>
          </div>
          
          {/* Lista de Locais - Mobile (Horizontal e Compacta) */}
          <div className="md:hidden overflow-x-auto px-6 pb-6 flex gap-2 scrollbar-hide">
              <button 
                  onClick={() => setSelectedPOI(null)}
                  className={`p-3.5 rounded-xl border-2 flex-shrink-0 transition-all ${!selectedPOI ? 'border-brand-red bg-red-50' : 'bg-gray-50 border-transparent'}`}
              >
                  <MapPin size={16} className={!selectedPOI ? "text-brand-red" : "text-gray-300"} />
              </button>
              {POINTS_OF_INTEREST[activeCategory].map((poi, idx) => (
                <button
                  key={`mob-${idx}`}
                  onClick={() => setSelectedPOI(poi)}
                  className={`px-4 py-3 rounded-xl border-2 flex-shrink-0 transition-all ${selectedPOI?.name === poi.name ? 'border-brand-red bg-white shadow-md scale-95' : 'bg-gray-50 border-transparent'}`}
                >
                  <div className="flex flex-col items-start gap-0.5">
                      <span className="text-[9px] font-black text-neutral-900 uppercase whitespace-nowrap">{poi.name}</span>
                      <span className="text-[8px] font-bold text-gray-400">Ver Trajeto</span>
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* Área do Mapa - Totalmente limpa e despoluída */}
        <div className="flex-1 relative bg-gray-50 h-full">
            <iframe
                key={selectedPOI ? `route-v2-${selectedPOI.name}` : 'default-v2'}
                title="Mapa de Trajeto"
                width="100%"
                height="100%"
                frameBorder="0"
                src={mapUrl}
                className="w-full h-full transition-opacity duration-500"
                allowFullScreen
            ></iframe>
        </div>
      </div>
    </div>
  );
};