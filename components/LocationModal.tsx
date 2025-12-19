import React, { useState } from 'react';
import { X, MapPin, ChevronRight, Navigation, Map as MapIcon, RotateCcw } from 'lucide-react';
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

  // Logic to construct the Map URL
  // If a POI is selected, we use 'saddr' (Start Address) and 'daddr' (Destination Address) to show a route line.
  // If no POI is selected, we just show the marker for the property ('q').
  const getMapUrl = () => {
    if (selectedPOI) {
      const origin = encodeURIComponent(initialAddress);
      const dest = encodeURIComponent(selectedPOI.address);
      // z=14 sets a good zoom level for routes
      return `https://maps.google.com/maps?saddr=${origin}&daddr=${dest}&ie=UTF8&output=embed`;
    }
    const location = encodeURIComponent(initialAddress);
    return `https://maps.google.com/maps?q=${location}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  };

  const mapUrl = getMapUrl();

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-sm">
      {/* Modal Window */}
      <div className="bg-white w-full h-[100dvh] sm:h-[90vh] md:max-w-6xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Sidebar (Header + List) */}
        <div className="w-full md:w-1/3 h-[60%] md:h-full flex flex-col bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 order-1 md:order-1 relative z-10">
          
          {/* Header */}
          <div className="p-4 md:p-6 bg-brand-red text-white relative overflow-hidden flex-shrink-0 flex justify-between items-start">
            <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <Navigation size={24} /> Explorar Região
                </h2>
                <p className="text-red-100 text-xs md:text-sm mt-1">Veja rotas e distâncias do imóvel</p>
            </div>
            <button 
                onClick={onClose}
                className="md:hidden text-white/80 hover:text-white p-1"
            >
                <X size={24} />
            </button>
            
            {/* Decorative shape */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          </div>

          {/* Category Tabs */}
          <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm z-10">
            <div className="flex overflow-x-auto p-3 gap-2 scrollbar-hide">
                {(Object.keys(POINTS_OF_INTEREST) as Category[]).map((cat) => {
                const Icon = POI_ICONS[cat];
                return (
                    <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setSelectedPOI(null); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-xs md:text-sm font-medium transition-all flex-shrink-0 ${
                        activeCategory === cat 
                        ? 'bg-brand-red text-white shadow-md' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    >
                    <Icon size={14} />
                    {cat}
                    </button>
                );
                })}
            </div>
          </div>

          {/* POI List */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 bg-gray-50">
            {/* Default Item (Property Location - Reset Button) */}
            <div 
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer group ${
                    !selectedPOI 
                        ? 'border-brand-red bg-white shadow-md' 
                        : 'border-transparent bg-white hover:bg-gray-100'
                }`}
                onClick={() => setSelectedPOI(null)}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1">
                            <MapPin size={16} className={!selectedPOI ? "text-brand-red" : "text-gray-400"} /> 
                            Sua Localização (Imóvel)
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{initialAddress}</p>
                    </div>
                    {selectedPOI && (
                        <span className="text-xs text-gray-400 group-hover:text-brand-red flex items-center gap-1">
                           <RotateCcw size={12} /> Resetar mapa
                        </span>
                    )}
                </div>
            </div>

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mt-4 mb-2 flex items-center justify-between">
                <span>{activeCategory}</span>
                <span className="text-[10px] bg-gray-200 px-2 rounded-full">Clique para ver rota</span>
            </p>

            {POINTS_OF_INTEREST[activeCategory].map((poi, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPOI(poi)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                  selectedPOI === poi 
                    ? 'border-brand-red bg-white shadow-md ring-1 ring-red-100' 
                    : 'border-transparent bg-white hover:bg-gray-100 border-gray-100'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{poi.name}</h3>
                    {poi.distance && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${selectedPOI === poi ? 'bg-brand-red text-white' : 'bg-gray-200 text-gray-700'}`}>
                            {poi.distance}
                        </span>
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{poi.address}</p>
                {selectedPOI === poi && (
                    <div className="mt-2 text-xs text-brand-red flex items-center gap-1 font-medium animate-pulse">
                        <Navigation size={12} />
                        <span>Mostrando rota no mapa...</span>
                    </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Map Area */}
        <div className="w-full md:w-2/3 h-[40%] md:h-full relative bg-gray-200 order-2 md:order-2">
            <iframe
                key={selectedPOI ? selectedPOI.name : 'default'} // Force re-render on change
                title="Map"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={mapUrl}
                className="w-full h-full"
                allowFullScreen
            ></iframe>

            {/* Desktop Close Button */}
            <button 
                onClick={onClose}
                className="hidden md:flex absolute top-4 right-4 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-lg transition-colors z-20"
            >
                <X size={24} />
            </button>

            {/* Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-100 pointer-events-none md:pointer-events-auto">
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full flex-shrink-0 ${selectedPOI ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {selectedPOI ? <Navigation size={20} /> : <MapPin size={20} />}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm md:text-base leading-tight">
                            {selectedPOI ? `Rota para ${selectedPOI.name}` : "Localização do Imóvel"}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {selectedPOI ? selectedPOI.address : initialAddress}
                        </p>
                        
                        {selectedPOI && selectedPOI.distance && (
                            <div className="mt-2 inline-flex items-center gap-1.5 bg-red-50 text-brand-red px-2 py-1 rounded-md text-xs font-bold border border-red-100">
                                <MapIcon size={12} />
                                Distância: {selectedPOI.distance}
                            </div>
                        )}
                        
                        <div className="mt-3 pointer-events-auto">
                            <a 
                                href={`https://www.google.com/maps/dir/${encodeURIComponent(initialAddress)}/${encodeURIComponent(selectedPOI ? selectedPOI.address : '')}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-xs font-bold text-brand-red hover:text-red-800 hover:underline flex items-center gap-1"
                            >
                                Abrir GPS (Google Maps) <ChevronRight size={12} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};