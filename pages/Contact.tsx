import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-neutral-900 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fale Conosco</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Estamos prontos para atender você. Entre em contato para dúvidas, reservas ou parcerias.
            </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-50/5"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Canais de Atendimento</h2>
              <p className="text-gray-600 mb-8">
                Prefere um atendimento rápido? Chame nossa equipe no WhatsApp ou ligue diretamente.
              </p>
            </div>

            <div className="grid gap-6">
              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/5511981280238" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow group"
              >
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <span className="block text-sm font-bold text-gray-400 uppercase tracking-wide">WhatsApp</span>
                  <span className="block text-xl font-bold text-gray-900">(11) 98128-0238</span>
                  <span className="text-sm text-green-600 font-medium">Atendimento Rápido</span>
                </div>
              </a>

              {/* Phone Card */}
              <a 
                href="tel:+5511981280238" 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow group"
              >
                <div className="w-14 h-14 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <Phone size={28} />
                </div>
                <div>
                  <span className="block text-sm font-bold text-gray-400 uppercase tracking-wide">Telefone</span>
                  <span className="block text-xl font-bold text-gray-900">(11) 98128-0238</span>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:raul@spexpolofts.com.br" 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow group"
              >
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail size={28} />
                </div>
                <div>
                  <span className="block text-sm font-bold text-gray-400 uppercase tracking-wide">E-mail</span>
                  <span className="block text-lg font-bold text-gray-900 break-all">raul@spexpolofts.com.br</span>
                </div>
              </a>
            </div>

             <div className="bg-gray-100 p-6 rounded-2xl mt-8">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <Clock size={20} className="text-gray-500" /> Horário de Atendimento
                </h3>
                <p className="text-gray-600">Segunda a Sexta: 09h às 18h<br/>Sábados: 09h às 13h</p>
             </div>
          </div>

          {/* Map / Location */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 h-full min-h-[400px] flex flex-col">
             <div className="p-6 pb-2">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <MapPin className="text-brand-red" /> Nossa Localização
                </h3>
                <p className="text-gray-600 text-sm">
                    Rua Maringá, 106 - Vila Guarani<br/>
                    São Paulo - SP, 04311-000<br/>
                    <span className="text-brand-red font-semibold text-xs">(Próximo ao Metrô Jabaquara e SP Expo)</span>
                </p>
             </div>
             <div className="flex-grow mt-4 rounded-xl overflow-hidden bg-gray-200 relative">
                <iframe 
                    title="Localização Spexpo"
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://maps.google.com/maps?q=Rua%20Maring%C3%A1%2C%20106%20-%20Vila%20Guarani%2C%20S%C3%A3o%20Paulo&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0"
                ></iframe>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};