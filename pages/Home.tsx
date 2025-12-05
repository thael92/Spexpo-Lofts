import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, MapPin, BedDouble, Home as HomeIcon, DollarSign } from 'lucide-react';
import { Property } from '../types';
import { fetchFeaturedProperties } from '../services/propertyService';
import { PropertyCard } from '../components/PropertyCard';

export const Home: React.FC = () => {
  const [featured, setFeatured] = useState<Property[]>([]);
  const navigate = useNavigate();
  
  // Advanced Search State
  const [searchFilters, setSearchFilters] = useState({
    query: '',
    type: 'Todos',
    bedrooms: 'Qualquer',
    maxPrice: ''
  });

  useEffect(() => {
    fetchFeaturedProperties().then(setFeatured);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchFilters.query) params.append('search', searchFilters.query);
    if (searchFilters.type !== 'Todos') params.append('type', searchFilters.type);
    if (searchFilters.bedrooms !== 'Qualquer') params.append('bedrooms', searchFilters.bedrooms);
    if (searchFilters.maxPrice) params.append('maxPrice', searchFilters.maxPrice);
    
    navigate(`/imoveis?${params.toString()}`);
  };

  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[650px] md:h-[750px] flex items-center bg-neutral-900 overflow-hidden">
        
        {/* Background Image - Occupying ~30% on the right */}
        <div className="absolute top-0 right-0 w-full md:w-[45%] lg:w-[30%] h-full z-0">
          <div className="relative h-full w-full">
            <img 
              src="/fundo-hero.jpg" 
              alt="Interior moderno" 
              className="w-full h-full object-cover opacity-50 md:opacity-100"
            />
            {/* Gradient for smooth transition to the dark background */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent md:bg-gradient-to-l md:from-transparent md:via-neutral-900/20 md:to-neutral-900"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 z-10 relative text-center md:text-left">
          <div className="max-w-4xl">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-red/20 border border-brand-red/30 text-red-200 text-sm font-semibold mb-6 backdrop-blur-sm">
              Temporada & Estadias Curtas
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Conforto de Hotel, <br/>
              <span className="text-brand-red">Aconchego de Casa</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-light leading-relaxed">
              Apartamentos, Lofts e Studios completos e equipados. A melhor localização para quem vai ao São Paulo Expo.
            </p>

            {/* Advanced Search Bar */}
            <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* Keyword */}
              <div className="w-full md:w-1/3 flex items-center px-2 border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0">
                <MapPin className="text-brand-red mr-3 shrink-0" size={20} />
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Localização</label>
                    <input 
                    type="text" 
                    placeholder="Bairro ou ref..." 
                    className="w-full outline-none text-gray-800 font-medium placeholder-gray-400 bg-transparent"
                    value={searchFilters.query}
                    onChange={(e) => handleFilterChange('query', e.target.value)}
                    />
                </div>
              </div>

              {/* Type */}
              <div className="w-full md:w-1/4 flex items-center px-2 border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0">
                <HomeIcon className="text-brand-red mr-3 shrink-0" size={20} />
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Tipo</label>
                    <select 
                        className="w-full outline-none text-gray-800 font-medium bg-transparent cursor-pointer appearance-none"
                        value={searchFilters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                        <option value="Todos">Todos os tipos</option>
                        <option value="Loft">Loft</option>
                        <option value="Studio">Studio</option>
                        <option value="Apartamento">Apartamento</option>
                    </select>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="w-full md:w-1/5 flex items-center px-2 border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0">
                <BedDouble className="text-brand-red mr-3 shrink-0" size={20} />
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Quartos</label>
                    <select 
                        className="w-full outline-none text-gray-800 font-medium bg-transparent cursor-pointer appearance-none"
                        value={searchFilters.bedrooms}
                        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    >
                        <option value="Qualquer">Qualquer</option>
                        <option value="1">1 Quarto</option>
                        <option value="2">2 Quartos</option>
                        <option value="3">3+ Quartos</option>
                    </select>
                </div>
              </div>

               {/* Price */}
               <div className="w-full md:w-1/5 flex items-center px-2 pb-2 md:pb-0">
                <DollarSign className="text-brand-red mr-3 shrink-0" size={20} />
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Até R$/dia</label>
                    <select 
                        className="w-full outline-none text-gray-800 font-medium bg-transparent cursor-pointer appearance-none"
                        value={searchFilters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    >
                        <option value="">Sem limite</option>
                        <option value="150">R$ 150</option>
                        <option value="250">R$ 250</option>
                        <option value="350">R$ 350</option>
                        <option value="500">R$ 500+</option>
                    </select>
                </div>
              </div>

              <button type="submit" className="w-full md:w-auto bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 whitespace-nowrap">
                <Search size={20} />
                Buscar
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Destaques da Temporada</h2>
            <p className="text-gray-500">Confira nossa seleção exclusiva para sua estadia</p>
          </div>
          <Link to="/imoveis" className="hidden md:flex items-center text-brand-red font-medium hover:text-red-800 transition-colors">
            Ver todos <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(prop => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

        <Link to="/imoveis" className="md:hidden mt-8 flex items-center justify-center text-brand-red font-medium">
            Ver todos <ArrowRight size={18} className="ml-2" />
        </Link>
      </section>

      {/* Features/Banner */}
      <section className="bg-neutral-900 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Por que escolher a Spexpo Lofts?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="p-6 rounded-2xl bg-neutral-800 border border-neutral-700">
                    <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-red">
                        <MapPin size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Localização Privilegiada</h3>
                    <p className="text-gray-400">Ao lado do São Paulo Expo e do Centro Paralímpico Brasileiro.</p>
                </div>
                <div className="p-6 rounded-2xl bg-neutral-800 border border-neutral-700">
                    <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-red">
                        <BedDouble size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Totalmente Equipados</h3>
                    <p className="text-gray-400">Imóveis completos com cozinha, Wi-Fi e tudo que você precisa para uma estadia tranquila.</p>
                </div>
                <div className="p-6 rounded-2xl bg-neutral-800 border border-neutral-700">
                    <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-red">
                        <Search size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Reserva Simplificada</h3>
                    <p className="text-gray-400">Processo rápido e seguro via plataformas parceiras para sua conveniência.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};