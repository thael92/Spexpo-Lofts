import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-brand-red font-bold" : "text-gray-600 hover:text-brand-red";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-neutral-900 text-gray-300 text-xs py-2 px-4 hidden md:flex justify-end gap-6">
        <span className="flex items-center gap-1"><Phone size={12} /> (11) 98128-0238</span>
        <span className="flex items-center gap-1">contato@spexpolofts.com.br</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            {/* Logo in Header */}
            <img 
              src="/logo.png" 
              alt="SP Expo Lofts" 
              className="h-14 md:h-16 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/imoveis" className={isActive('/imoveis')}>Imóveis</Link>
            <Link to="/sobre" className={isActive('/sobre')}>Sobre Nós</Link>
            <Link to="/contato" className={`px-5 py-2.5 rounded-full font-medium transition-colors ${location.pathname === '/contato' ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-800 hover:bg-brand-red hover:text-white'}`}>
              Contato
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800">Home</Link>
              <Link to="/imoveis" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800">Imóveis</Link>
              <Link to="/sobre" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800">Sobre Nós</Link>
              <Link to="/contato" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-brand-red">Fale Conosco</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div>
            {/* Logo in Footer with white background for visibility */}
            <div className="mb-6 bg-white rounded-xl p-3 inline-block shadow-sm">
               <img src="/logo.png" alt="Spexpo Lofts" className="h-10 md:h-12 w-auto" />
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              A melhor opção de hospedagem e moradia próxima ao São Paulo Expo. 
              Conforto, praticidade e qualidade para sua estadia ou novo lar.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-brand-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-brand-red transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-4 border-brand-red pl-3">Links Rápidos</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/imoveis" className="hover:text-white transition-colors">Buscar Imóveis</Link></li>
              <li><Link to="/sobre" className="hover:text-white transition-colors">Nossa História</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Fale Conosco</Link></li>
              <li><Link to="/politica" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-4 border-brand-red pl-3">Contato</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-red shrink-0" size={18} />
                <span>R. Exemplo, 123 - Jabaquara<br/>São Paulo - SP, 04321-000</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-brand-red shrink-0" size={18} />
                <span>(11) 98128-0238</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-neutral-800 text-center text-xs text-gray-500">
          <p>&copy; 2024 Spexpo Lofts. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};