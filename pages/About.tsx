import React from 'react';
import { Phone, Mail, Award, Briefcase, UserCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-neutral-900 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">Sobre Nós</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">Especialistas em hospitalidade para eventos e exposições.</p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-50/5"></div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 p-8 text-center sticky top-32">
                    <div className="w-40 h-40 bg-gray-100 rounded-full mx-auto mb-8 border-4 border-brand-red flex items-center justify-center">
                        <span className="text-4xl font-black text-gray-300">RC</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">Raul Cavalcante</h2>
                    <p className="text-brand-red font-black uppercase text-[10px] tracking-[0.3em] mb-8">Administrador Sênior</p>
                    <div className="space-y-4">
                        <a href="https://wa.me/5511981280238" className="flex items-center justify-center gap-3 w-full bg-neutral-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-red transition-all">
                            <Phone size={18} /> (11) 98128-0238
                        </a>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-8 space-y-12">
                <div className="prose prose-xl max-w-none text-gray-500 font-light leading-relaxed">
                    <h3 className="text-4xl font-black text-neutral-900 mb-8 tracking-tighter uppercase italic">Experiência e Gestão</h3>
                    <p>Raul Cavalcante lidera a <strong className="text-neutral-900">SPEXPO LOFTS</strong> há sete anos, unindo tecnologia e administração para oferecer o melhor em estadias de curta temporada.</p>
                    <p>Com formação em TI e MBA em Administração, Raul aplicou 11 anos de expertise no Banco Itaú para profissionalizar a gestão de acomodações na Vila Guarani e Jabaquara, garantindo um padrão hoteleiro em lofts modernos.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <Award className="text-brand-red mb-6" size={40} />
                        <h4 className="text-xl font-black text-neutral-900 mb-4 uppercase tracking-tighter">Padrão Elite</h4>
                        <p className="text-sm text-gray-500 font-medium">Cada loft é preparado com enxoval de alta gramatura e limpeza rigorosa.</p>
                    </div>
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <UserCheck className="text-brand-red mb-6" size={40} />
                        <h4 className="text-xl font-black text-neutral-900 mb-4 uppercase tracking-tighter">Atendimento</h4>
                        <p className="text-sm text-gray-500 font-medium">Suporte 24h dedicado exclusivamente aos hóspedes Spexpo.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};