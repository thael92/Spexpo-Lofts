import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Loader2 } from 'lucide-react';
import { Property, FilterState } from '../types';
import { fetchProperties } from '../services/propertyService';
import { PropertyCard } from '../components/PropertyCard';
import { FilterSidebar } from '../components/FilterSidebar';

export const Listings: React.FC = () => {
  const location = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filters matching the screenshot structure
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    minPrice: 0,
    maxPrice: 2000000,
    type: 'Todos',
    bedrooms: 'Qualquer'
  });

  // URL Parsing
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters: Partial<FilterState> = {};
    if (searchParams.get('search')) newFilters.search = searchParams.get('search')!;
    if (searchParams.get('type')) newFilters.type = searchParams.get('type')!;
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, [location.search]);

  // Data Loading
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetchProperties(page, 50, filters); // Load more at once for marketplace feel
      setProperties(res.data);
      setLoading(false);
    };
    const timeoutId = setTimeout(load, 500);
    return () => clearTimeout(timeoutId);
  }, [page, filters]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen">
        {/* Breadcrumb / Top Bar */}
        <div className="bg-white border-b border-gray-200 py-3 shadow-sm">
            <div className="container mx-auto px-4 flex items-center text-xs text-gray-500 gap-2">
                <span>Brasil</span> 
                <span className="text-gray-300">{'>'}</span> 
                <span>São Paulo</span> 
                <span className="text-gray-300">{'>'}</span> 
                <span className="font-bold text-gray-800">Zona Sul (Expo)</span>
            </div>
        </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* SIDEBAR FILTER */}
          <FilterSidebar 
            filters={filters} 
            isOpen={filtersOpen} 
            onClose={() => setFiltersOpen(false)} 
            onFilterChange={handleFilterChange} 
          />

          {/* RIGHT CONTENT - Listing Grid */}
          <div className="flex-1">
            
            {/* Sort/Count Bar */}
            <div className="bg-[#D32F2F] text-white p-3 rounded-t-lg flex justify-between items-center text-sm font-medium mb-4 shadow-sm">
                <span>Mostrando {properties.length} imóveis na região</span>
                <span>São Paulo Expo</span>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button 
                className="lg:hidden w-full bg-white p-3 rounded shadow mb-4 text-[#D32F2F] font-bold border border-[#D32F2F] flex justify-center items-center gap-2"
                onClick={() => setFiltersOpen(true)}
            >
                <Filter size={18} /> Filtrar Busca
            </button>

            {loading ? (
                 <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#D32F2F]" size={40} /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {properties.map(prop => (
                        <PropertyCard key={prop.id} property={prop} />
                    ))}
                </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};