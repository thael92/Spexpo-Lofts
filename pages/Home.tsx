import React, { useEffect, useState, useRef } from 'react';
import { FilterState, Property } from '../types';
import { fetchProperties } from '../services/propertyService';
import { PropertyCard } from '../components/PropertyCard';
import { Loader2, Calendar, Users, MapPin, Star, ShieldCheck, Zap, Camera, Search, ChevronRight, ChevronLeft, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HERO_ITEMS = [
  {
    type: 'video',
    url: 'https://player.vimeo.com/external/370331493.hd.mp4?s=33d596660df8903c73499cf29994c6f370f1a94e&profile_id=175', 
    poster: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop'
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop',
  },
  {
    type: 'video',
    url: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27dbed94f100366663f73c6a46f2c75a4d0f772&profile_id=164', 
    poster: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop'
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2000&auto=format&fit=crop',
  }
];

// Estilo customizado apenas para a animação do texto
const heroAnimations = `
  @keyframes textParticleEffect {
    0% { opacity: 0; filter: blur(10px); transform: scale(0.95); }
    15% { opacity: 1; filter: blur(0); transform: scale(1); }
    85% { opacity: 1; filter: blur(0); transform: scale(1); }
    100% { opacity: 0; filter: blur(15px); transform: scale(1.05); }
  }
`;

export const Home: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    minPrice: 0,
    maxPrice: 2000000,
    type: 'Todos',
    bedrooms: 'Qualquer'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % HERO_ITEMS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetchProperties(1, 12, filters);
      setProperties(res.data);
      setLoading(false);
    };
    load();
  }, [filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchValue }));
    const listingsSection = document.getElementById('listings');
    listingsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextHero = () => setCarouselIndex((prev) => (prev + 1) % HERO_ITEMS.length);
  const prevHero = () => setCarouselIndex((prev) => (prev === 0 ? HERO_ITEMS.length - 1 : prev - 1));

  return (
    <div className="bg-white min-h-screen">
      <style>{heroAnimations}</style>
      
      {/* HERO SECTION - Carousel */}
      <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-black">
        {HERO_ITEMS.map((item, idx) => (
          <div 
            key={idx} 
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === carouselIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {item.type === 'video' ? (
              <video 
                src={item.url} 
                autoPlay 
                muted 
                loop 
                playsInline 
                poster={item.poster}
                className="w-full h-full object-cover brightness-[0.4]"
              />
            ) : (
              <img 
                src={item.url} 
                className="w-full h-full object-cover brightness-[0.4]"
                alt="Hero Carousel"
              />
            )}
          </div>
        ))}

        {/* CENTERED CONTENT OVERLAY */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-40 px-4 pointer-events-none">
          <div className="relative text-center">
            <h1 
              key={carouselIndex} // Re-trigger animation on index change
              className="text-4xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] max-w-5xl leading-tight"
              style={{
                animation: 'textParticleEffect 8s ease-in-out infinite'
              }}
            >
              Dê valor ao seu tempo, <br className="hidden md:block"/> Nós cuidamos do resto!
            </h1>
            
            <div 
              className="mt-6 flex items-center justify-center gap-2 text-white/60 font-medium tracking-[0.3em] uppercase text-xs animate-pulse"
              style={{ animationDelay: '1.5s' }}
            >
              Spexpo Lofts
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4 z-20 pointer-events-auto">
          <button onClick={prevHero} className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-white backdrop-blur-md transition-all">
            <ChevronLeft size={32} />
          </button>
          <button onClick={nextHero} className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-white backdrop-blur-md transition-all">
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_ITEMS.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCarouselIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === carouselIndex ? 'w-8 bg-brand-red' : 'w-2 bg-white/50'}`}
            />
          ))}
        </div>

        {/* Wave Divider (Honda Branca) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-50">
          <svg className="relative block w-full h-[60px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,110.19,122.41,105,181.63,85.23,231.32,68.61,273.7,65.31,321.39,56.44Z" fill="#FFFFFF"></path>
          </svg>
        </div>
      </section>

      {/* SEARCH BAR SECTION - Fixed position below wave */}
      <section className="relative z-[60] -mt-10 md:-mt-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto bg-white p-2 md:p-3 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 flex flex-col md:flex-row gap-2 items-center">
             <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-2">
                {/* Text Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-brand-red transition-all">
                   <span className="text-brand-red"><Search size={20} /></span>
                   <div className="text-left w-full">
                      <span className="block text-[10px] uppercase font-black text-gray-400">Onde?</span>
                      <input 
                        type="text" 
                        placeholder="Bairro, rua ou nome..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full placeholder:font-medium placeholder:text-gray-300" 
                      />
                   </div>
                </div>
                {/* Date In */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100">
                   <Calendar className="text-brand-red" size={20} />
                   <div className="text-left">
                      <span className="block text-[10px] uppercase font-black text-gray-400">Check-in</span>
                      <input type="date" className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full" defaultValue="2024-05-20" />
                   </div>
                </div>
                {/* Date Out */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100">
                   <Calendar className="text-brand-red" size={20} />
                   <div className="text-left">
                      <span className="block text-[10px] uppercase font-black text-gray-400">Check-out</span>
                      <input type="date" className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full" defaultValue="2024-05-25" />
                   </div>
                </div>
                {/* Guests */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100">
                   <Users className="text-brand-red" size={20} />
                   <div className="text-left w-full">
                      <span className="block text-[10px] uppercase font-black text-gray-400">Hóspedes</span>
                      <select className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full appearance-none">
                         <option>2 Hóspedes</option>
                         <option>1 Hóspede</option>
                         <option>3 Hóspedes</option>
                         <option>4+ Hóspedes</option>
                      </select>
                   </div>
                </div>
             </div>
             <button 
                onClick={handleSearch}
                className="w-full md:w-auto bg-brand-red text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-800 transition-all shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap flex items-center justify-center gap-2"
             >
                <Search size={18} /> PESQUISAR AGORA
             </button>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section id="listings" className="py-24 md:py-32 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-black text-brand-red uppercase tracking-[0.2em] mb-4">
               <div className="h-[2px] w-8 bg-brand-red"></div>
               Opções Selecionadas
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-neutral-900 leading-tight">Diversas Opções de Lofts</h3>
            <p className="text-gray-500 mt-6 text-xl font-light">As hospedagens mais procuradas pelos expositores e visitantes do São Paulo Expo.</p>
          </div>
          <Link to="/imoveis" className="bg-gray-50 text-neutral-900 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-neutral-900 hover:text-white transition-all group">
            Ver todas as 80 hospedagens <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-24"><Loader2 className="animate-spin text-brand-red" size={56} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.slice(0, 6).map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-neutral-900 text-white py-32 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-red/5 skew-x-12 translate-x-32"></div>
         
         <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
            <div className="relative group">
               <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2000&auto=format&fit=crop" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Interior Loft"
                  />
               </div>
               <div className="absolute -bottom-10 -right-10 bg-brand-red p-12 rounded-[2.5rem] shadow-2xl hidden md:block max-w-[280px] transform rotate-3 group-hover:rotate-0 transition-transform">
                  <p className="text-6xl font-black mb-2">80+</p>
                  <p className="text-xs uppercase font-black tracking-widest leading-relaxed">Opções exclusivas de Hospedagem</p>
               </div>
            </div>
            
            <div className="space-y-12">
               <div>
                  <h2 className="text-xs font-black text-brand-red uppercase tracking-[0.4em] mb-6">Qualidade Spexpo Lofts</h2>
                  <h3 className="text-4xl md:text-7xl font-black leading-none tracking-tighter">Conforto que <br/> te aproxima do sucesso.</h3>
               </div>
               <p className="text-gray-400 text-xl leading-relaxed font-light">
                  Gerenciamos hospedagens estrategicamente localizadas na região da Vila Guarani e Jabaquara, focando em oferecer o conforto de casa com a eficiência de um hotel.
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-red"><ShieldCheck size={32} /></div>
                     <h4 className="font-black text-2xl uppercase tracking-tighter">Check-in Ágil</h4>
                     <p className="text-sm text-gray-500 font-medium leading-relaxed">Processo eletrônico e seguro via senha ou concierge dedicado.</p>
                  </div>
                  <div className="space-y-4">
                     <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-red"><Zap size={32} /></div>
                     <h4 className="font-black text-2xl uppercase tracking-tighter">Wi-Fi Premium</h4>
                     <p className="text-sm text-gray-500 font-medium leading-relaxed">Conexão dedicada de alta velocidade em todas as nossas unidades.</p>
                  </div>
               </div>

               <Link to="/sobre" className="inline-flex items-center gap-4 bg-white text-neutral-900 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-red hover:text-white transition-all shadow-xl">
                  CONHEÇA NOSSA HISTÓRIA <ChevronRight size={18} />
               </Link>
            </div>
         </div>
      </section>

      {/* GALLERY MOSAIC */}
      <section className="py-32 container mx-auto px-4">
         <div className="text-center mb-20">
            <h2 className="text-xs font-black text-brand-red uppercase tracking-[0.4em] mb-4">Experiência Visual</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter">Galeria Spexpo</h3>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-[700px]">
            <div className="col-span-2 row-span-2 rounded-[3rem] overflow-hidden relative group cursor-pointer">
               <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery" />
               <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-6 bg-white rounded-full text-neutral-900 shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-500">
                    <Camera size={32} />
                  </div>
               </div>
            </div>
            <div className="col-span-1 row-span-1 rounded-[2rem] overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Gallery" />
            </div>
            <div className="col-span-1 row-span-1 rounded-[2rem] overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Gallery" />
            </div>
            <div className="col-span-2 row-span-1 rounded-[2rem] overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1500&auto=format&fit=crop" className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Gallery" />
            </div>
         </div>
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="bg-brand-red py-32 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
            </svg>
         </div>
         <div className="container mx-auto px-4 text-center text-white relative z-10">
            <h3 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">Pronto para reservar?</h3>
            <p className="text-xl md:text-2xl mb-16 opacity-90 font-light max-w-3xl mx-auto">Garanta o melhor preço reservando diretamente em nosso marketplace exclusivo para o São Paulo Expo.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
               <Link to="/imoveis" className="bg-white text-brand-red px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all shadow-2xl hover:-translate-y-1">
                  VER DISPONIBILIDADE
               </Link>
               <a href="https://wa.me/5511981280238" target="_blank" rel="noreferrer" className="bg-neutral-900 text-white px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-2xl flex items-center justify-center gap-3 hover:-translate-y-1">
                  FALAR NO WHATSAPP <ChevronRight size={20} />
               </a>
            </div>
         </div>
      </section>

    </div>
  );
};