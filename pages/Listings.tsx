import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, ChevronDown, Loader2 } from 'lucide-react';
import { Property, FilterState } from '../types';
import { fetchProperties } from '../services/propertyService';
import { PropertyCard } from '../components/PropertyCard';

export const Listings: React.FC = () => {
  const location = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Initial Filter State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    minPrice: 0,
    maxPrice: 2000000,
    type: 'Todos',
    bedrooms: 'Qualquer'
  });

  // Parse URL search params on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    const newFilters: Partial<FilterState> = {};
    
    const searchQ = searchParams.get('search');
    if (searchQ) newFilters.search = searchQ;
    
    const typeQ = searchParams.get('type');
    if (typeQ) newFilters.type = typeQ;

    const bedroomsQ = searchParams.get('bedrooms');
    if (bedroomsQ) newFilters.bedrooms = bedroomsQ === '4+' || bedroomsQ === 'Qualquer' ? bedroomsQ : Number(bedroomsQ);

    const maxPriceQ = searchParams.get('maxPrice');
    if (maxPriceQ) newFilters.maxPrice = Number(maxPriceQ);

    setFilters(prev => ({ ...prev, ...newFilters }));
  }, [location.search]);

  // Load Data
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetchProperties(page, 12, filters);
      if (page === 1) {
        setProperties(res.data);
      } else {
        setProperties(prev => [...prev, ...res.data]);
      }
      setHasMore(res.data.length === 12);
      setLoading(false);
    };

    // Debounce for filter changes (simple implementation)
    const timeoutId = setTimeout(() => {
        load();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [page, filters]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to page 1 on filter change
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden bg-white p-4 rounded-xl shadow-sm flex items-center justify-between font-semibold text-gray-700"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <span className="flex items-center gap-2"><Filter size={20} /> Filtros</span>
            <ChevronDown size={20} className={`transform transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Filter size={20} className="text-brand-red" /> Filtrar Imóveis
              </h3>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Busca</label>
                  <input 
                    type="text" 
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Bairro, Rua..."
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select 
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none bg-white"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Loft">Loft</option>
                    <option value="Studio">Studio</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quartos</label>
                  <div className="flex gap-2">
                    {['Qualquer', '1', '2', '3', '4+'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleFilterChange('bedrooms', opt === 'Qualquer' ? opt : (opt === '4+' ? opt : Number(opt)))}
                        className={`flex-1 py-2 text-xs font-medium rounded-md border ${filters.bedrooms === (opt === 'Qualquer' ? opt : (opt === '4+' ? opt : Number(opt))) ? 'bg-brand-red text-white border-brand-red' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preço Máximo (Diária)</label>
                  <input 
                    type="range" 
                    min="100" 
                    max="1000" 
                    step="50"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-red"
                  />
                  <div className="text-right text-sm text-brand-red font-semibold mt-1">
                    Até {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(filters.maxPrice)}
                  </div>
                </div>

                {/* Reset */}
                <button 
                  onClick={() => {
                    setFilters({
                      search: '',
                      minPrice: 0,
                      maxPrice: 2000000,
                      type: 'Todos',
                      bedrooms: 'Qualquer'
                    });
                    setPage(1);
                  }}
                  className="w-full py-2 text-sm text-gray-500 underline hover:text-brand-red"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="lg:w-3/4">
            {properties.length === 0 && !loading ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-lg">Nenhum imóvel encontrado com estes filtros.</p>
                <button 
                    onClick={() => {
                        setFilters({
                          search: '',
                          minPrice: 0,
                          maxPrice: 2000000,
                          type: 'Todos',
                          bedrooms: 'Qualquer'
                        });
                    }}
                    className="mt-4 text-brand-red font-medium hover:underline"
                >
                    Limpar busca
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(prop => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-brand-red" size={32} />
              </div>
            )}

            {!loading && hasMore && properties.length > 0 && (
              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => setPage(prev => prev + 1)}
                  className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 hover:border-brand-red hover:text-brand-red transition-colors shadow-sm"
                >
                  Carregar Mais Imóveis
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};