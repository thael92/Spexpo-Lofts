import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-neutral-900 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{t('contact.title')}</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              {t('contact.subtitle')}
            </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-50/5"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-neutral-900 mb-6 tracking-tight">{t('contact.channels')}</h2>
              <p className="text-gray-500 mb-8 font-light">
                {t('contact.desc')}
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
                  <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp</span>
                  <span className="block text-xl font-black text-gray-900">(11) 98128-0238</span>
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
                  <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Telefone</span>
                  <span className="block text-xl font-black text-gray-900">(11) 98128-0238</span>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:contato@spexpolofts.com.br" 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow group"
              >
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail size={28} />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">E-mail</span>
                  <span className="block text-lg font-black text-gray-900 break-all">contato@spexpolofts.com.br</span>
                </div>
              </a>
            </div>

             <div className="bg-gray-100 p-8 rounded-3xl mt-8">
                <h3 className="font-black text-neutral-900 flex items-center gap-3 mb-4 uppercase text-xs tracking-widest">
                    <Clock size={18} className="text-brand-red" /> {t('contact.hours')}
                </h3>
                <p className="text-gray-500 whitespace-pre-line text-sm font-medium leading-relaxed">
                   {t('contact.hours.detail')}
                </p>
             </div>
          </div>

          {/* Map / Location */}
          <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 h-full min-h-[400px] flex flex-col">
             <div className="p-8 pb-4">
                <h3 className="text-xl font-black text-neutral-900 flex items-center gap-3 mb-4 uppercase text-xs tracking-widest">
                    <MapPin className="text-brand-red" /> {t('contact.loc')}
                </h3>
                <p className="text-gray-500 text-sm font-medium whitespace-pre-line leading-relaxed">
                    {t('contact.loc.detail')}
                </p>
             </div>
             <div className="flex-grow mt-4 rounded-2xl overflow-hidden bg-gray-200 relative grayscale hover:grayscale-0 transition-all duration-700">
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