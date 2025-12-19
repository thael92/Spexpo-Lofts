import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

const Logo = ({ className = "h-12" }: { className?: string }) => (
  <svg viewBox="0 0 400 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ícone Minimalista de Loft/Prédio */}
    <rect x="45" y="45" width="25" height="45" fill="currentColor" />
    <rect x="75" y="25" width="25" height="65" fill="currentColor" />
    <rect x="105" y="55" width="25" height="35" fill="currentColor" />
    <path d="M40 90H135" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Texto Logotipo */}
    <text x="150" y="65" fontFamily="Inter" fontWeight="900" fontSize="38" letterSpacing="-1" fill="currentColor">SPEXPO</text>
    <text x="150" y="90" fontFamily="Inter" fontWeight="400" fontSize="18" letterSpacing="6" fill="#D32F2F">LOFTS</text>
  </svg>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { favorites } = useFavorites();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isCompact = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hospedagens', path: '/imoveis' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-700 bg-white">
      
      {/* HEADER DINÂMICO */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isCompact ? 'bg-white shadow-xl py-3' : 'bg-transparent pt-10 pb-6'
        }`}>
        
        <div className="container mx-auto px-6">
          <div className={`flex transition-all duration-500 items-center ${
            isCompact ? 'flex-row justify-between' : 'flex-col gap-8'
          }`}>
            
            {/* Logo - Centralizada na Home, Lateral no Compacto */}
            <Link to="/" className={`transition-all duration-500 transform ${
              isCompact ? 'scale-75 origin-left' : 'scale-125'
            }`}>
               <div className={`${isCompact ? 'text-neutral-900' : 'text-white'}`}>
                  <Logo className="h-16" />
               </div>
            </Link>

            {/* Menu Desktop */}
            <nav className={`hidden md:flex items-center gap-10 transition-all duration-500`}>
              {navLinks.map(link => (
                  <Link 
                      key={link.path} 
                      to={link.path}
                      className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:text-brand-red ${
                          location.pathname === link.path 
                          ? 'text-brand-red' 
                          : isCompact ? 'text-gray-600' : 'text-white/80'
                      }`}
                  >
                      {link.name}
                  </Link>
              ))}
              
              <div className="flex items-center gap-6 border-l border-current/10 pl-8 ml-2">
                <Link to="/favoritos" className="relative group">
                   <Heart size={18} className={`transition-colors ${isCompact ? 'text-gray-600' : 'text-white'} group-hover:text-brand-red`} fill={favorites.length > 0 ? "currentColor" : "none"} />
                   {favorites.length > 0 && (
                       <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full animate-bounce">
                           {favorites.length}
                       </span>
                   )}
                </Link>

                <a 
                    href="https://wa.me/5511981280238" 
                    className="bg-brand-red text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-900 transition-all shadow-lg hover:-translate-y-0.5"
                >
                    RESERVAR
                </a>
              </div>
            </nav>

            {/* Mobile Toggle */}
            <button 
              className={`md:hidden absolute right-6 ${isCompact ? 'top-1/2 -translate-y-1/2 text-neutral-900' : 'top-10 text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-[110] md:hidden animate-in fade-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full">
                <div className="p-8 flex justify-between items-center border-b border-gray-100">
                    <Logo className="h-12 text-neutral-900" />
                    <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center gap-10">
                    {navLinks.map(link => (
                        <Link key={link.path} to={link.path} className="text-4xl font-black text-gray-900 uppercase tracking-tighter hover:text-brand-red transition-colors">
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/favoritos" className="text-2xl font-black text-gray-400 uppercase flex items-center gap-4">
                        Favoritos <Heart fill={favorites.length > 0 ? "#D32F2F" : "none"} />
                    </Link>
                </div>
            </div>
          </div>
        )}
      </header>

      {/* Ajuste de Espaçamento para o Menu Fixo */}
      <main className={`flex-grow ${!isHome ? 'pt-28' : ''}`}>
        {children}
      </main>

      {/* FOOTER COM LOGO */}
      <footer className="bg-neutral-900 text-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            
            <div className="space-y-8">
                <Link to="/" className="text-white block">
                    <Logo className="h-14" />
                </Link>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                    Especialistas em locação de curta temporada para expositores do São Paulo Expo. Conforto, proximidade e excelência.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-red transition-all"><Instagram size={20}/></a>
                    <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-red transition-all"><Facebook size={20}/></a>
                </div>
            </div>

            <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red mb-10">Navegação</h4>
                <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-gray-500">
                    {navLinks.map(link => (
                        <li key={link.path}><Link to={link.path} className="hover:text-white transition-colors">{link.name}</Link></li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red mb-10">Contato</h4>
                <ul className="space-y-6 text-sm text-gray-400">
                    <li className="flex gap-4"><MapPin size={18} className="text-brand-red shrink-0" /> Rua Maringá, 106 - SP</li>
                    <li className="flex gap-4"><Phone size={18} className="text-brand-red shrink-0" /> (11) 98128-0238</li>
                    <li className="flex gap-4"><Mail size={18} className="text-brand-red shrink-0" /> contato@spexpolofts.com.br</li>
                </ul>
            </div>

            <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red mb-10">Localização</h4>
                <div className="h-40 bg-neutral-800 rounded-3xl overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                    <iframe title="Map" src="https://maps.google.com/maps?q=Rua%20Maring%C3%A1%2C%20106&t=&z=13&ie=UTF8&iwloc=&output=embed" className="w-full h-full border-0"></iframe>
                </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-[9px] font-black text-gray-600 uppercase tracking-widest text-center md:text-left">
            &copy; 2024 SPEXPO LOFTS. TODOS OS DIREITOS RESERVADOS.
          </div>
        </div>
      </footer>
    </div>
  );
};