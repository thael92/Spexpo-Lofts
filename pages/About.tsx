import React from 'react';
import { Phone, Mail, Award, Briefcase, UserCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-neutral-900 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nós</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Conheça quem faz da sua estadia uma experiência única e memorável.</p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-50/5"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Profile Card */}
            <div className="md:col-span-4 sticky top-24">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="h-32 bg-brand-red relative">
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 p-1.5 bg-white rounded-full">
                            {/* Placeholder for Raul's photo */}
                            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                <span className="text-4xl text-gray-400 font-bold">RC</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-20 pb-8 px-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Raul Cavalcante</h2>
                        <p className="text-brand-red font-semibold mb-6">Administrador da SP Expo Lofts</p>
                        
                        <div className="space-y-4">
                            <a href="https://wa.me/5511981280238" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg">
                                <Phone size={20} />
                                (11) 98128-0238
                            </a>
                            <a href="mailto:raul@spexpolofts.com.br" className="flex items-center justify-center gap-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-medium transition-colors">
                                <Mail size={20} />
                                Email de Contato
                            </a>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-center">
                        <div>
                            <span className="block text-2xl font-bold text-gray-900">7+</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Anos SP Expo</span>
                        </div>
                        <div>
                            <span className="block text-2xl font-bold text-gray-900">11</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Anos Itaú</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="md:col-span-8 space-y-8">
                
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Briefcase className="text-brand-red" /> Trajetória Profissional
                    </h3>
                    <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
                        <p>
                            Raul Cavalcante é um profissional experiente e dedicado, atuando como administrador da 
                            <strong className="text-gray-900"> SP Expo Lofts há sete anos</strong>.
                        </p>
                        <p>
                            Sua sólida formação em <span className="font-semibold text-gray-800">Tecnologia da Informação</span> e <span className="font-semibold text-gray-800">MBA em Administração</span> o capacitam a gerir de forma eficaz e estratégica o empreendimento. Com uma trajetória profissional de 11 anos na sede do Banco Itaú, Raul acumulou conhecimentos valiosos que contribuem para o seu sucesso na administração da SP Expo Lofts.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Award className="text-brand-red" /> Qualidade e Excelência
                    </h3>
                    <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
                        <p>
                            Sua proximidade com os imóveis da SP Expo Lofts, durante sua atuação no mundo corporativo, proporcionou-lhe um entendimento aprofundado do mercado imobiliário e das necessidades dos clientes. 
                        </p>
                        <p className="text-lg font-medium text-gray-800 border-l-4 border-brand-red pl-4 italic bg-gray-50 py-2 rounded-r-lg">
                            "Raul tem o cuidado de preparar as acomodações com esmero, garantindo que ofereçam o mesmo conforto e qualidade de um quarto de hotel."
                        </p>
                        <p>
                             Seu comprometimento com a excelência e o bem-estar dos hóspedes é evidente em cada detalhe das instalações.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <UserCheck className="text-brand-red" /> Atendimento Personalizado
                    </h3>
                    <div className="prose max-w-none text-gray-600 leading-relaxed">
                        <p>
                            A dedicação de Raul Cavalcante em proporcionar uma experiência única aos visitantes da SP Expo Lofts reflete-se na atenção aos detalhes e na busca constante pela satisfação dos clientes.
                        </p>
                        <p className="mt-4">
                            Seu profissionalismo e expertise são fundamentais para o sucesso e a reputação do empreendimento. Com uma abordagem focada na qualidade e no atendimento personalizado, Raul eleva o padrão de hospedagem na SP Expo Lofts, tornando-a uma escolha distinta e memorável para quem busca conforto e hospitalidade em São Paulo.
                        </p>
                    </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};