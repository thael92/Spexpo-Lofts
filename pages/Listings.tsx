import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Loader2, Search, Calendar, Users, MapPin } from 'lucide-react';
import { Property, FilterState } from '../types';
import { fetchProperties } from '../services/propertyService';
import { PropertyCard } from '../components/PropertyCard';

// Extend FilterState for Bairro locally if needed, but we'll use a dynamic state
export const Listings: React.FC = () => {
  const location = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [selectedBairro, setSelectedBairro] = useState('Todas as Regiões');

  const [filters, setFilters] = useState<any>({
    search: '',
    type: 'Todos',
    neighborhood: 'Todas as Regiões'
  });

  const bairros = [
    "Todas as Regiões",
    "Imigrantes", 
    "Fachini", 
    "Conceição", 
    "Jabaquara", 
    "Butantã", 
    "Santo Amaro"
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchParam = searchParams.get('search');
    if (searchParam) {
        setSearchValue(searchParam);
        setFilters(prev => ({ ...prev, search: searchParam }));
    }
  }, [location.search]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetchProperties(page, 50, { ...filters, neighborhood: selectedBairro });
      setProperties(res.data);
      setLoading(false);
    };
    load();
  }, [page, filters, selectedBairro]);

  const handleSearchTrigger = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchValue }));
    setPage(1);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <div className="container mx-auto px-6 pb-20">
        
        {/* Barra de Busca */}
        <div className="py-12">
            <div className="max-w-6xl mx-auto bg-white p-3 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-3 items-center">
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-brand-red transition-all">
                        <Search className="text-brand-red" size={20} />
                        <div className="text-left w-full">
                            <span className="block text-[9px] uppercase font-black text-gray-400 tracking-widest">Busca livre</span>
                            <input 
                                type="text" 
                                placeholder="Rua, ponto de referência..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
                                className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full placeholder:text-gray-300" 
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <Calendar className="text-brand-red" size={20} />
                        <div className="text-left">
                            <span className="block text-[9px] uppercase font-black text-gray-400 tracking-widest">Check-in</span>
                            <input type="date" className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full" defaultValue="2024-05-20" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <Calendar className="text-brand-red" size={20} />
                        <div className="text-left">
                            <span className="block text-[9px] uppercase font-black text-gray-400 tracking-widest">Check-out</span>
                            <input type="date" className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full" defaultValue="2024-05-25" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <Users className="text-brand-red" size={20} />
                        <div className="text-left w-full">
                            <span className="block text-[9px] uppercase font-black text-gray-400 tracking-widest">Hóspedes</span>
                            <select className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full appearance-none cursor-pointer">
                                <option>2 Hóspedes</option>
                                <option>1 Hóspede</option>
                                <option>4+ Hóspedes</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => handleSearchTrigger()}
                    className="w-full md:w-auto bg-brand-red text-white px-12 py-6 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-neutral-900 transition-all shadow-xl"
                >
                    ATUALIZAR
                </button>
            </div>
        </div>

        {/* Filtro de Regiões (Bairros) */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <MapPin size={18} className="text-brand-red" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400">Filtrar por Região</h2>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {bairros.map(bairro => (
                  <button 
                      key={bairro}
                      onClick={() => setSelectedBairro(bairro)}
                      className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${
                          selectedBairro === bairro 
                          ? 'bg-brand-red text-white border-brand-red shadow-lg' 
                          : 'bg-white text-gray-400 border-gray-100 hover:border-brand-red hover:text-brand-red'
                      }`}
                  >
                      {bairro}
                  </button>
              ))}
          </div>
        </div>

        {/* Listagem */}
        {loading ? (
             <div className="flex flex-col items-center justify-center py-32 gap-6">
                <Loader2 className="animate-spin text-brand-red" size={48} />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Carregando hospedagens...</span>
             </div>
        ) : (
            <>
              {properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {properties.map(prop => (
                        <PropertyCard key={prop.id} property={prop} />
                    ))}
                </div>
              ) : (
                <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Nenhuma hospedagem encontrada nesta região.</p>
                  <button onClick={() => setSelectedBairro('Todas as Regiões')} className="mt-6 text-brand-red font-black text-xs underline">VER TODAS AS HOSPEDAGENS</button>
                </div>
              )}
            </>
        )}
        
      </div>
    </div>
  );
};