import React, { useEffect, useState } from 'react';
import { FilterState, Property } from '../types';
import { fetchProperties } from '../services/propertyService';
import { PropertyCard } from '../components/PropertyCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { Loader2, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export const Home: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    minPrice: 0,
    maxPrice: 2000000,
    type: 'Todos',
    bedrooms: 'Qualquer'
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const PAGE_SIZE = 20;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // Fetch with pagination
      const res = await fetchProperties(page, PAGE_SIZE, filters);
      setProperties(res.data);
      setTotal(res.total);
      setLoading(false);
    };
    const timeoutId = setTimeout(load, 500);
    return () => clearTimeout(timeoutId);
  }, [filters, page]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page on filter change
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 400, behavior: 'smooth' }); // Scroll back to top of grid
    }
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen">
      
      {/* Short Banner - Video Background */}
      <section className="relative h-[250px] flex flex-col justify-center items-center shadow-md overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover brightness-[0.60]"
          >
            <source src="/public/video-fundo-hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container mx-auto px-4 z-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">
            Casas e Apartamentos para Aluguel de Temporada
          </h1>
          <p className="text-lg text-white/90 drop-shadow-sm font-medium">
            Mais de 80 imóveis disponíveis próximos ao São Paulo Expo e Metrô Jabaquara
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container-fluid max-w-[1600px] mx-auto px-4 py-6">
        
        {/* Mobile Filter Toggle */}
        <button 
            className="lg:hidden w-full bg-white p-3 rounded shadow mb-4 text-[#D32F2F] font-bold border border-[#D32F2F] flex justify-center items-center gap-2"
            onClick={() => setFiltersOpen(true)}
        >
            <MapPin size={18} /> Filtrar Busca
        </button>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* LEFT: Sidebar */}
          <FilterSidebar 
            filters={filters} 
            isOpen={filtersOpen} 
            onClose={() => setFiltersOpen(false)} 
            onFilterChange={handleFilterChange} 
          />

          {/* MIDDLE: Listings Grid */}
          <div className="flex-1 min-w-0">
            
            {/* Blue (Red) Info Bar - Updated text */}
            <div className="bg-[#D32F2F] text-white p-3 rounded-t-lg flex justify-between items-center text-sm font-medium mb-4 shadow-sm">
                <span>São Paulo (Zona Sul)</span>
                {/* Count removed as requested */}
                <span className="text-xs opacity-90">Aluguel Temporada</span>
            </div>

            {loading ? (
               <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#D32F2F]" size={40} /></div>
            ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px]">
                      {properties.map(prop => (
                          <PropertyCard key={prop.id} property={prop} />
                      ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center gap-2">
                      <button 
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                        // Show first, last, current, and adjacent pages
                        if (
                          p === 1 || 
                          p === totalPages || 
                          (p >= page - 1 && p <= page + 1)
                        ) {
                          return (
                            <button
                              key={p}
                              onClick={() => handlePageChange(p)}
                              className={`w-10 h-10 rounded-lg font-bold text-sm transition-colors ${
                                page === p 
                                  ? 'bg-[#D32F2F] text-white shadow-md' 
                                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {p}
                            </button>
                          );
                        } else if (
                          (p === page - 2 && p > 1) || 
                          (p === page + 2 && p < totalPages)
                        ) {
                          return <span key={p} className="text-gray-400">...</span>;
                        }
                        return null;
                      })}

                      <button 
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
            )}
          </div>

          {/* RIGHT: Map Column (Desktop Only) */}
          <div className="hidden xl:block w-[350px] sticky top-24 h-[calc(100vh-120px)] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
             {/* Simple Map Header */}
             <div className="bg-gray-100 p-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase flex justify-between">
                <span>Visualização no Mapa</span>
                <MapPin size={14} />
             </div>
             
             {/* Static Interactive-looking Map */}
             <div className="relative w-full h-full bg-blue-50 group">
                <img 
                    src="https://maps.googleapis.com/maps/api/staticmap?center=Vila+Guarani,Sao+Paulo&zoom=14&size=400x800&maptype=roadmap&key=YOUR_API_KEY&style=feature:all|element:all|saturation:-20"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://static-maps.yandex.ru/1.x/?lang=en-US&ll=-46.6385,-23.6465&z=14&l=map&size=400,600&pt=-46.6385,-23.6465,pm2rdm";
                    }}
                    alt="Mapa"
                    className="w-full h-full object-cover"
                />
                
                {/* Overlay simulated pins */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="relative">
                      <div className="w-4 h-4 bg-[#D32F2F] rounded-full border-2 border-white shadow-md animate-bounce"></div>
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-[10px] font-bold text-gray-800 whitespace-nowrap">
                         Expo Center
                      </div>
                   </div>
                </div>

                 {/* CTA */}
                 <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg text-center">
                    <p className="text-sm font-bold text-gray-700 mb-2">Navegue pelo mapa</p>
                    <button className="w-full bg-[#D32F2F] text-white py-2 rounded text-sm font-bold hover:bg-red-800 transition-colors">
                        Expandir Mapa
                    </button>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};