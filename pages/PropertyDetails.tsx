import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPropertyById } from '../services/propertyService';
import { Property } from '../types';
import { MapPin, BedDouble, Bath, Car, Square, ChevronLeft, ChevronRight, CheckCircle2, Map as MapIcon, Calendar, ArrowRight, Info, Users, Minus, Plus } from 'lucide-react';
import { LocationModal } from '../components/LocationModal';
import { AvailabilityCalendar } from '../components/AvailabilityCalendar';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  // Date calculation state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [nights, setNights] = useState(0);
  
  // Detailed Guest State
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  
  const maxGuests = 4; // Limit for Adults + Children

  useEffect(() => {
    if (id) {
      fetchPropertyById(id).then(data => {
        setProperty(data || null);
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

  const getReservationUrl = () => {
    if (!property) return "#";
    const baseUrl = property.airbnbUrl || "https://www.airbnb.com.br/rooms/1309713318273367376";
    
    let url = baseUrl;
    const params: string[] = [];

    if (checkIn && checkOut) {
        try {
            const startDate = new Date(checkIn);
            const endDate = new Date(checkOut);
            
            // Format dates as YYYY-MM-DD for Airbnb URL parameters
            const startStr = startDate.toISOString().split('T')[0];
            const endStr = endDate.toISOString().split('T')[0];
            
            params.push(`check_in=${startStr}`);
            params.push(`check_out=${endStr}`);
        } catch (e) {
            console.error("Error formatting dates for URL", e);
        }
    }

    // Add detailed guest parameters
    params.push(`adults=${adults}`);
    if (childrenCount > 0) params.push(`children=${childrenCount}`);
    if (infants > 0) params.push(`infants=${infants}`);

    if (params.length > 0) {
        const separator = url.includes('?') ? '&' : '?';
        url = `${url}${separator}${params.join('&')}`;
    }

    return url;
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div></div>;
  
  if (!property) return <div className="h-screen flex flex-col items-center justify-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Imóvel não encontrado</h2>
    <Link to="/imoveis" className="text-brand-red hover:underline">Voltar para listagem</Link>
  </div>;

  const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const fullAddress = `${property.endereco.rua}, ${property.endereco.bairro} - ${property.endereco.cidade}`;
  const totalValue = nights * property.preco;

  // Render a guest row
  const GuestRow = ({ 
    label, 
    subLabel, 
    value, 
    onPlus, 
    onMinus, 
    canPlus, 
    canMinus 
  }: { 
    label: string, 
    subLabel: string, 
    value: number, 
    onPlus: () => void, 
    onMinus: () => void, 
    canPlus: boolean, 
    canMinus: boolean 
  }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
        <div>
            <div className="font-bold text-gray-800 text-sm">{label}</div>
            <div className="text-xs text-gray-500">{subLabel}</div>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={onMinus}
                disabled={!canMinus}
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    !canMinus 
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                    : 'border-brand-red text-brand-red hover:bg-brand-red hover:text-white'
                }`}
            >
                <Minus size={14} />
            </button>
            <span className="w-4 text-center text-sm font-bold text-gray-900">{value}</span>
            <button 
                onClick={onPlus}
                disabled={!canPlus}
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    !canPlus 
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                    : 'border-brand-red text-brand-red hover:bg-brand-red hover:text-white'
                }`}
            >
                <Plus size={14} />
            </button>
        </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <LocationModal 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        initialAddress={fullAddress} 
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-brand-red">Home</Link> / 
          <Link to="/imoveis" className="hover:text-brand-red ml-1">Imóveis</Link> / 
          <span className="ml-1 text-gray-800 truncate">{property.titulo}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-[400px] md:h-[500px]">
                <img 
                  src={property.imagens[activeImage]} 
                  alt={property.titulo} 
                  className="w-full h-full object-cover"
                />
                <button 
                    onClick={() => setActiveImage(prev => prev === 0 ? property.imagens.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={() => setActiveImage(prev => prev === property.imagens.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                >
                    <ChevronRight size={24} />
                </button>
              </div>
              <div className="flex gap-2 p-4 overflow-x-auto">
                {property.imagens.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 ${activeImage === idx ? 'border-brand-red' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <span className="text-brand-red font-bold text-sm uppercase tracking-wide">{property.tipo} em {property.endereco.bairro}</span>
                  <h1 className="text-3xl font-bold text-gray-900 mt-1">{property.titulo}</h1>
                  <div className="flex items-center text-gray-500 mt-2">
                    <MapPin size={18} className="mr-1" />
                    {fullAddress}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-brand-red">
                    {formatter.format(property.preco)}
                    <span className="text-sm font-normal text-gray-500">/dia</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-b border-gray-100 mb-8">
                 <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Square className="mx-auto mb-2 text-gray-400" size={24} />
                    <span className="block text-lg font-bold text-gray-900">{property.area_m2}m²</span>
                    <span className="text-xs text-gray-500">Área Útil</span>
                 </div>
                 <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <BedDouble className="mx-auto mb-2 text-gray-400" size={24} />
                    <span className="block text-lg font-bold text-gray-900">{property.quartos}</span>
                    <span className="text-xs text-gray-500">Quartos</span>
                 </div>
                 <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Bath className="mx-auto mb-2 text-gray-400" size={24} />
                    <span className="block text-lg font-bold text-gray-900">{property.banheiros}</span>
                    <span className="text-xs text-gray-500">Banheiros</span>
                 </div>
                 <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Car className="mx-auto mb-2 text-gray-400" size={24} />
                    <span className="block text-lg font-bold text-gray-900">{property.vagas}</span>
                    <span className="text-xs text-gray-500">Vagas</span>
                 </div>
              </div>

              <div className="prose max-w-none text-gray-600 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sobre o Imóvel</h3>
                <p>{property.descricao}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Características</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.caracteristicas.map((car, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-600">
                            <CheckCircle2 size={16} className="text-brand-red" />
                            {car}
                        </div>
                    ))}
                </div>
              </div>

            </div>

             {/* Interactive Map Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-gray-900">Localização e Arredores</h3>
               </div>
               
               <div className="relative group rounded-xl overflow-hidden cursor-pointer" onClick={() => setIsMapOpen(true)}>
                    {/* Static placeholder map */}
                    <img 
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(fullAddress)}&zoom=14&size=800x400&maptype=roadmap&markers=color:red%7C${encodeURIComponent(fullAddress)}&key=YOUR_API_KEY_PLACEHOLDER`} 
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://static-maps.yandex.ru/1.x/?lang=en-US&ll=-46.6385,-23.6465&z=13&l=map&size=600,300&pt=-46.6385,-23.6465,pm2rdm";
                        }}
                        alt="Mapa de Localização" 
                        className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                    />
                    
                    {/* Overlay Button */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <button 
                            className="bg-brand-red text-white px-8 py-3 rounded-full shadow-lg font-bold hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            <MapIcon size={20} /> Ver Mapa Interativo
                        </button>
                    </div>
               </div>
               <p className="text-sm text-gray-500 mt-3 text-center">
                   Clique no mapa para explorar mercados, transporte e turismo na região.
               </p>
            </div>
          </div>

          {/* Sidebar Calculator & Booking */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
                
                {/* Price Header */}
                <div className="mb-6 flex justify-between items-end border-b border-gray-100 pb-4">
                    <div>
                        <span className="text-2xl font-bold text-brand-red">{formatter.format(property.preco)}</span>
                        <span className="text-gray-500 text-sm"> / noite</span>
                    </div>
                </div>

                {/* Date Calculator with New Calendar */}
                <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex gap-2 items-start">
                        <Info className="text-gray-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-xs text-gray-600">
                            Simulação de disponibilidade ativa. Datas riscadas estão ocupadas (exemplo iCal).
                        </p>
                    </div>

                    <AvailabilityCalendar onRangeChange={handleRangeChange} />

                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="block text-xs font-medium text-gray-500 mb-1">Check-in</span>
                            <span className="block text-sm font-bold text-gray-800">
                                {checkIn ? new Date(checkIn).toLocaleDateString('pt-BR') : '-'}
                            </span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="block text-xs font-medium text-gray-500 mb-1">Check-out</span>
                            <span className="block text-sm font-bold text-gray-800">
                                {checkOut ? new Date(checkOut).toLocaleDateString('pt-BR') : '-'}
                            </span>
                        </div>
                    </div>

                    {/* Guests Selection */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 mt-4 shadow-sm">
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-1">
                             <Users size={14} /> Hóspedes (Máx {maxGuests})
                        </h4>
                        
                        <GuestRow 
                            label="Adultos" 
                            subLabel="Com 13 anos ou mais"
                            value={adults}
                            onMinus={() => setAdults(Math.max(1, adults - 1))}
                            onPlus={() => setAdults(adults + 1)}
                            canMinus={adults > 1}
                            canPlus={adults + childrenCount < maxGuests}
                        />

                        <GuestRow 
                            label="Crianças" 
                            subLabel="De 2 a 12 anos"
                            value={childrenCount}
                            onMinus={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                            onPlus={() => setChildrenCount(childrenCount + 1)}
                            canMinus={childrenCount > 0}
                            canPlus={adults + childrenCount < maxGuests}
                        />

                        <GuestRow 
                            label="Bebês" 
                            subLabel="Menor de 2"
                            value={infants}
                            onMinus={() => setInfants(Math.max(0, infants - 1))}
                            onPlus={() => setInfants(infants + 1)}
                            canMinus={infants > 0}
                            canPlus={true} // Infants typically don't count towards the 4 person max in this logic
                        />
                    </div>

                    {/* Total Calculation */}
                    {nights > 0 ? (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 animate-in fade-in">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>{formatter.format(property.preco)} x {nights} noites</span>
                                <span>{formatter.format(totalValue)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-gray-900 text-lg border-t border-gray-200 pt-2 mt-2">
                                <span>Total estimado</span>
                                <span>{formatter.format(totalValue)}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-xs text-gray-400 py-2">
                            Selecione as datas no calendário acima
                        </div>
                    )}
                </div>

                {/* Booking Button */}
                <a
                    href={getReservationUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full bg-[#FF385C] hover:bg-[#D93250] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 group uppercase tracking-wide ${nights === 0 ? 'opacity-90' : ''}`}
                >
                    RESERVAR <ArrowRight size={20} />
                </a>

                <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
                    Você será redirecionado para o Airbnb (Unidade {property.id.replace('sp-', '')}) 
                    {nights > 0 ? ' com datas e hóspedes pré-selecionados' : ' para concluir a reserva'}.
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};