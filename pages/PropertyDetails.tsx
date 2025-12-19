import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchPropertyById, fetchProperties } from '../services/propertyService';
import { Property } from '../types';
import { 
  MapPin, BedDouble, Bath, Car, Square, ChevronLeft, Users, 
  CheckCircle2, Map as MapIcon, ArrowRight, Info, Minus, Plus, 
  Wifi, Coffee, Wind, Shield, Tv, Maximize2, Share2, Heart,
  Sparkles
} from 'lucide-react';
import { LocationModal } from '../components/LocationModal';
import { AvailabilityCalendar } from '../components/AvailabilityCalendar';
import { PhotoGalleryModal } from '../components/PhotoGalleryModal';
import { PropertyCard } from '../components/PropertyCard';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  
  // Date calculation state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [nights, setNights] = useState(0);
  
  // Detailed Guest State
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  
  const maxGuests = 4;

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll on ID change
    if (id) {
      setLoading(true);
      fetchPropertyById(id).then(data => {
        setProperty(data || null);
        
        // Load similar properties
        if (data) {
          fetchProperties(1, 4, { type: data.tipo }).then(res => {
            // Filter out current property and take up to 3
            const filtered = res.data.filter(p => p.id !== data.id).slice(0, 3);
            setSimilarProperties(filtered);
          });
        }
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        setNights(diffDays > 0 ? diffDays : 0);
    } else {
        setNights(0);
    }
  }, [checkIn, checkOut]);

  const handleRangeChange = (start: string, end: string) => {
      setCheckIn(start);
      setCheckOut(end);
  };

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  const getReservationUrl = () => {
    if (!property) return "#";
    const baseUrl = property.airbnbUrl || "https://www.airbnb.com.br/rooms/1553101057890730646";
    let url = baseUrl;
    const params: string[] = [];
    if (checkIn && checkOut) {
        params.push(`check_in=${checkIn}`);
        params.push(`check_out=${checkOut}`);
    }
    params.push(`adults=${adults}`);
    if (childrenCount > 0) params.push(`children=${childrenCount}`);
    
    if (params.length > 0) {
        const separator = url.includes('?') ? '&' : '?';
        url = `${url}${separator}${params.join('&')}`;
    }
    return url;
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Carregando Detalhes...</span>
      </div>
    </div>
  );
  
  if (!property) return <div className="h-screen flex flex-col items-center justify-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Hospedagem não encontrada</h2>
    <Link to="/imoveis" className="text-brand-red hover:underline">Voltar para listagem</Link>
  </div>;

  const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const totalValue = nights * property.preco;

  const allImages = property.imagens.length > 1 
    ? property.imagens 
    : [
        property.imagens[0],
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000&auto=format&fit=crop"
      ];

  return (
    <div className="bg-white min-h-screen pb-20 pt-20">
      <LocationModal 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        initialAddress={`${property.endereco.rua}, ${property.endereco.bairro}`} 
      />
      
      <PhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={allImages}
        initialIndex={galleryIndex}
      />

      {/* Title & Location Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
           <div>
              <div className="flex items-center gap-2 text-xs font-black text-brand-red uppercase tracking-[0.2em] mb-3">
                 <div className="h-[2px] w-8 bg-brand-red"></div>
                 {property.tipo} em {property.endereco.bairro}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-neutral-900 leading-tight">
                {property.titulo}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 mt-4 text-sm font-medium">
                 <MapPin size={18} className="text-brand-red" />
                 {property.endereco.rua}, {property.endereco.bairro} - São Paulo, SP
              </div>
           </div>
           <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all font-bold text-xs text-gray-600">
                 <Share2 size={16} /> COMPARTILHAR
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all font-bold text-xs text-gray-600">
                 <Heart size={16} /> FAVORITAR
              </button>
           </div>
        </div>
      </div>

      {/* HERO GALLERY - 5 Image Layout */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[600px] rounded-3xl overflow-hidden relative group">
           <div onClick={() => openGallery(0)} className="md:col-span-2 md:row-span-2 relative overflow-hidden cursor-pointer">
              <img src={allImages[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Vista Principal" />
           </div>
           <div onClick={() => openGallery(1)} className="hidden md:block overflow-hidden cursor-pointer">
              <img src={allImages[1]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Quarto" />
           </div>
           <div onClick={() => openGallery(2)} className="hidden md:block overflow-hidden rounded-tr-3xl cursor-pointer">
              <img src={allImages[2]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Banheiro" />
           </div>
           <div onClick={() => openGallery(3)} className="hidden md:block overflow-hidden cursor-pointer">
              <img src={allImages[3]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Interior" />
           </div>
           <div onClick={() => openGallery(4)} className="hidden md:block overflow-hidden rounded-br-3xl cursor-pointer">
              <img src={allImages[4]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Cozinha" />
           </div>
           
           <button 
            onClick={() => openGallery(0)}
            className="absolute bottom-6 right-6 bg-white text-neutral-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 hover:bg-neutral-100 transition-all"
           >
              <Maximize2 size={16} /> Ver Todas as Fotos
           </button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT CONTENT */}
          <div className="lg:w-2/3">
            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-8 py-8 border-b border-gray-100 mb-10">
               <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl text-brand-red"><Users size={24} /></div>
                  <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hóspedes</p>
                     <p className="font-bold text-gray-900">Até 4</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl text-brand-red"><BedDouble size={24} /></div>
                  <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quartos</p>
                     <p className="font-bold text-gray-900">1 Suíte</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl text-brand-red"><Bath size={24} /></div>
                  <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Banheiros</p>
                     <p className="font-bold text-gray-900">1 Banheiro</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl text-brand-red"><Square size={24} /></div>
                  <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Área</p>
                     <p className="font-bold text-gray-900">{property.area_m2}m²</p>
                  </div>
               </div>
            </div>

            {/* Description */}
            <div className="mb-16">
               <h3 className="text-2xl font-black text-neutral-900 mb-6 flex items-center gap-3">
                  <div className="h-6 w-1 bg-brand-red"></div>
                  Descrição da Hospedagem
               </h3>
               <p className="text-gray-500 text-lg leading-relaxed font-light">
                 {property.descricao}
               </p>
            </div>

            {/* Bedrooms */}
            <div className="mb-16">
               <h3 className="text-2xl font-black text-neutral-900 mb-8 flex items-center gap-3">
                  <div className="h-6 w-1 bg-brand-red"></div>
                  Onde você vai dormir
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 border border-gray-100 rounded-3xl bg-gray-50/50 flex flex-col items-center text-center group hover:border-brand-red transition-all">
                     <BedDouble size={40} className="text-brand-red mb-6" />
                     <h4 className="font-black text-neutral-900 mb-2 uppercase tracking-widest text-sm">Quarto Principal</h4>
                     <p className="text-gray-500 font-medium">1 Cama Casal Queen, Ar Condicionado, TV Smart</p>
                  </div>
                  <div className="p-8 border border-gray-100 rounded-3xl bg-gray-50/50 flex flex-col items-center text-center group hover:border-brand-red transition-all">
                     <Users size={40} className="text-brand-red mb-6" />
                     <h4 className="font-black text-neutral-900 mb-2 uppercase tracking-widest text-sm">Área de Estar</h4>
                     <p className="text-gray-500 font-medium">Sofá-Cama confortável para 2 pessoas adicionais</p>
                  </div>
               </div>
            </div>

            {/* Amenities */}
            <div className="mb-16">
               <h3 className="text-2xl font-black text-neutral-900 mb-8 flex items-center gap-3">
                  <div className="h-6 w-1 bg-brand-red"></div>
                  O que este lugar oferece
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center"><Wifi size={20} /></div>
                     <span className="font-bold text-neutral-800 text-sm">Wi-Fi Premium</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center"><Wind size={20} /></div>
                     <span className="font-bold text-neutral-800 text-sm">Ar-Condicionado</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center"><Tv size={20} /></div>
                     <span className="font-bold text-neutral-800 text-sm">Cabo / Smart TV</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center"><Coffee size={20} /></div>
                     <span className="font-bold text-neutral-800 text-sm">Café Nespresso</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center"><Shield size={20} /></div>
                     <span className="font-bold text-neutral-800 text-sm">Segurança 24h</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center"><Car size={20} /></div>
                     <span className="font-bold text-neutral-800 text-sm">Estacionamento</span>
                  </div>
               </div>
               <button className="mt-12 w-full md:w-auto border-2 border-neutral-900 text-neutral-900 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all">
                  Mostrar todas as comodidades
               </button>
            </div>

            {/* Map Preview */}
            <div className="mb-16">
               <h3 className="text-2xl font-black text-neutral-900 mb-8 flex items-center gap-3">
                  <div className="h-6 w-1 bg-brand-red"></div>
                  Localização Privilegiada
               </h3>
               <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl group cursor-pointer" onClick={() => setIsMapOpen(true)}>
                  <iframe 
                    title="Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.endereco.rua)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                  ></iframe>
                  <div className="absolute inset-0 bg-neutral-900/10 flex items-center justify-center">
                     <div className="bg-white text-neutral-900 px-8 py-4 rounded-2xl shadow-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:scale-110 transition-transform">
                        <MapIcon size={20} className="text-brand-red" /> Explorar Arredores
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:w-1/3">
             <div className="sticky top-28 bg-white border border-gray-100 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-8">
                <div className="flex justify-between items-end mb-8">
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">A partir de</p>
                      <div className="flex items-baseline gap-1">
                         <span className="text-4xl font-black text-neutral-900">{formatter.format(property.preco).split(',')[0]}</span>
                         <span className="text-sm font-bold text-gray-400">/noite</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-1 text-xs font-bold text-brand-red bg-red-50 px-3 py-1.5 rounded-full">
                      5.0 ★ <span className="text-gray-400 font-medium">(Airbnb)</span>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden">
                      <AvailabilityCalendar icalUrl={property.icalUrl} onRangeChange={handleRangeChange} />
                   </div>

                   {nights > 0 && (
                      <div className="bg-neutral-900 text-white rounded-3xl p-6 animate-in slide-in-from-top duration-300">
                         <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60 mb-4">
                            <span>Resumo da Reserva</span>
                            <span>{nights} Noites</span>
                         </div>
                         <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                               <span className="opacity-70">{formatter.format(property.preco)} x {nights} noites</span>
                               <span className="font-bold">{formatter.format(totalValue)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                               <span className="opacity-70">Taxa de Limpeza</span>
                               <span className="font-bold">Grátis</span>
                            </div>
                         </div>
                         <div className="flex justify-between items-center pt-4 border-t border-white/10">
                            <span className="text-lg font-black uppercase tracking-tighter">Total</span>
                            <span className="text-2xl font-black">{formatter.format(totalValue)}</span>
                         </div>
                      </div>
                   )}

                   <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
                         <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Hóspedes</p>
                            <p className="font-bold text-neutral-900 text-sm">{adults} Adultos, {childrenCount} Crianças</p>
                         </div>
                         <div className="flex items-center gap-2">
                            <button onClick={() => setAdults(Math.max(1, adults-1))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white">-</button>
                            <span className="font-bold w-4 text-center">{adults}</span>
                            <button onClick={() => setAdults(Math.min(maxGuests, adults+1))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white">+</button>
                         </div>
                      </div>

                      <a
                        href={getReservationUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-brand-red text-white py-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-red-800 transition-all flex items-center justify-center gap-3 group"
                      >
                        RESERVAR AGORA <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                   </div>

                   <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                      Você será redirecionado para a plataforma oficial da Unidade {property.id.replace('sp-', '')}.
                   </p>
                </div>
             </div>
          </div>
        </div>
        
        {/* EXPLORE SIMILAR SECTION */}
        {similarProperties.length > 0 && (
          <div className="mt-24 pt-24 border-t border-gray-100">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black text-brand-red uppercase tracking-[0.2em] mb-4">
                    <Sparkles size={16} /> Recomendações Exclusivas
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-neutral-900">Explore similares</h3>
                  <p className="text-gray-500 mt-4 text-lg max-w-2xl">
                    Selecionamos outras hospedagens que podem ser do seu interesse na região de {property.endereco.bairro}.
                  </p>
                </div>
                <Link to="/imoveis" className="text-brand-red font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:underline">
                  Ver todas as hospedagens <ArrowRight size={18} />
                </Link>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarProperties.map(prop => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};