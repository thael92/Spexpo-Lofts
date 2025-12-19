import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, Instagram, Facebook, MapPin, Phone, Mail, ChevronDown, Globe } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

const Logo = ({ className = "", isCompact }: { className?: string, isCompact?: boolean }) => (
  <div className={`transition-all duration-500 w-fit ${!isCompact ? 'bg-white border-2 border-gray-200 rounded-lg p-2' : ''} ${className}`}>
    <img src="/logo.png" alt="SPEXPO Lofts Logo" className="h-full w-auto" />
  </div>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { favorites } = useFavorites();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

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
    setIsLangMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.listings'), path: '/imoveis' },
    { name: t('nav.about'), path: '/sobre' },
    { name: t('nav.contact'), path: '/contato' },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt', label: 'Brasil', flag: 'https://flagcdn.com/w80/br.png' },
    { code: 'en', label: 'English', flag: 'https://flagcdn.com/w80/us.png' },
    { code: 'es', label: 'Español', flag: 'https://flagcdn.com/w80/es.png' },
  ];

  const currentLangData = languages.find(l => l.code === language);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-700 bg-white">
      
      {/* HEADER DINÂMICO */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isCompact ? 'bg-white shadow-xl py-3' : 'bg-transparent pt-4 pb-6'
        }`}>
        
        {/* Idiomas Desktop - Mais no canto e discreto */}
        <div className="hidden md:block container mx-auto px-6 mb-2">
            <div className="flex justify-end gap-3">
                {languages.map(lang => (
                    <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`group flex items-center gap-1 transition-all duration-300 ${language === lang.code ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
                    >
                        <div className={`w-6 h-4 rounded-[2px] overflow-hidden border transition-all ${language === lang.code ? 'border-brand-red ring-1 ring-brand-red/30' : 'border-current/10'}`}>
                            <img src={lang.flag} alt={lang.label} className="w-full h-full object-cover" />
                        </div>
                        <span className={`text-[8px] font-black uppercase ${isCompact ? 'text-neutral-900' : 'text-white'}`}>
                            {lang.code}
                        </span>
                    </button>
                ))}
            </div>
        </div>

        <div className="container mx-auto px-6">
          {/* Layout DESKTOP: Logo acima do Menu */}
          <div className="hidden md:flex flex-col items-center transition-all duration-500">
            <Link to="/" className={`transition-all duration-500 transform ${isCompact ? 'scale-75 mb-2' : 'scale-110 mb-6'}`}>
               <div className={`${isCompact ? 'text-neutral-900' : 'text-white'}`}>
                  <Logo isCompact={isCompact} className={isCompact ? "h-[100px]" : "h-[130px]"} />
               </div>
            </Link>

            <nav className="flex items-center gap-10">
              {navLinks.map(link => (
                  <Link 
                      key={link.path} 
                      to={link.path}
                      className={`text-[9px] font-black uppercase tracking-[0.3em] transition-all hover:text-brand-red ${
                          location.pathname === link.path 
                          ? 'text-brand-red' 
                          : isCompact ? 'text-gray-500' : 'text-white/70'
                      }`}
                  >
                      {link.name}
                  </Link>
              ))}
              
              <div className="flex items-center gap-6 border-l border-current/10 pl-10 ml-2">
                <Link to="/favoritos" className="relative group">
                   <Heart size={18} className={`transition-colors ${isCompact ? 'text-gray-600' : 'text-white'} group-hover:text-brand-red`} fill={favorites.length > 0 ? "currentColor" : "none"} />
                   {favorites.length > 0 && (
                       <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full">
                           {favorites.length}
                       </span>
                   )}
                </Link>

                <button 
                    onClick={() => navigate('/imoveis')}
                    className="bg-brand-red text-white px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-900 transition-all shadow-lg hover:-translate-y-0.5"
                >
                    {t('nav.reserve')}
                </button>
              </div>
            </nav>
          </div>

          {/* Layout MOBILE: Logo Central e Hambúrguer na Direita */}
          <div className="md:hidden flex justify-between items-center w-full">
            <div className="w-[40px]">
               {favorites.length > 0 && (
                  <Link to="/favoritos" className={`relative ${isCompact ? 'text-brand-red' : 'text-white'}`}>
                    <Heart size={20} fill="currentColor" />
                  </Link>
               )}
            </div>
            
            <Link to="/" className={`transition-all duration-500 transform ${isCompact ? 'scale-75' : 'scale-90'}`}>
               <div className={`${isCompact ? 'text-neutral-900' : 'text-white'}`}>
                  <Logo isCompact={isCompact} className="h-[130px]" />
               </div>
            </Link>

            <button 
              className={`p-2 rounded-xl transition-colors ${isCompact ? 'text-neutral-900 bg-gray-100' : 'text-white bg-white/10'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-[110] md:hidden animate-in fade-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full overflow-y-auto">
                <div className="p-8 flex justify-between items-center border-b border-gray-100">
                    <Logo className="h-[70px] text-neutral-900" />
                    <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="flex-grow flex flex-col items-center justify-center gap-8 py-10">
                    {navLinks.map(link => (
                        <Link key={link.path} to={link.path} className="text-4xl font-black text-gray-900 uppercase tracking-tighter hover:text-brand-red transition-colors">
                            {link.name}
                        </Link>
                    ))}
                    
                    <Link to="/favoritos" className="text-xl font-black text-gray-400 uppercase flex items-center gap-4">
                        {t('nav.favorites')} <Heart fill={favorites.length > 0 ? "#D32F2F" : "none"} />
                    </Link>

                    {/* Mobile Language Selector */}
                    <div className="w-full max-w-[260px] border-t border-gray-100 mt-6 pt-8 flex flex-col items-center">
                        <button 
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="flex items-center gap-3 text-xs font-black text-neutral-400 uppercase tracking-widest mb-6"
                        >
                            <div className="w-7 h-4.5 rounded-[2px] overflow-hidden border border-gray-200">
                                <img src={currentLangData?.flag} className="w-full h-full object-cover" />
                            </div>
                            {t('nav.language')}
                            <ChevronDown size={14} className={`transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isLangMenuOpen && (
                            <div className="grid grid-cols-1 gap-3 w-full animate-in slide-in-from-top duration-300">
                                {languages.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setIsLangMenuOpen(false);
                                        }}
                                        className={`flex items-center justify-between px-6 py-4 rounded-2xl border transition-all ${language === lang.code ? 'bg-brand-red text-white border-brand-red shadow-lg' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-7 h-4.5 rounded-[2px] overflow-hidden border border-white/20">
                                                <img src={lang.flag} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-[11px] font-black uppercase tracking-widest">{lang.label}</span>
                                        </div>
                                        {language === lang.code && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={() => {
                            setIsMenuOpen(false);
                            navigate('/imoveis');
                        }}
                        className="mt-8 bg-brand-red text-white px-14 py-6 rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-2xl"
                    >
                        {t('nav.reserve')}
                    </button>
                </div>
            </div>
          </div>
        )}
      </header>

      <main className={`flex-grow ${!isHome ? 'pt-36 md:pt-48' : ''}`}>
        {children}
      </main>

      <footer className="bg-neutral-900 text-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            
            <div className="space-y-8">
                <Link to="/" className="text-white block">
                    <Logo isCompact={false} className="h-[90px]" />
                </Link>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                    {t('footer.desc')}
                </p>
                <div className="flex gap-4">
                    <a 
                      href="https://www.instagram.com/saopauloexpolofts/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-red transition-all"
                    >
                      <Instagram size={20}/>
                    </a>
                    <a 
                      href="https://www.facebook.com/profile.php?id=61560904164722" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-red transition-all"
                    >
                      <Facebook size={20}/>
                    </a>
                </div>
            </div>

            <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red mb-10">{t('footer.nav')}</h4>
                <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-gray-500">
                    {navLinks.map(link => (
                        <li key={link.path}><Link to={link.path} className="hover:text-white transition-colors">{link.name}</Link></li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red mb-10">{t('footer.contact')}</h4>
                <ul className="space-y-6 text-sm text-gray-400">
                    <li className="flex gap-4"><MapPin size={18} className="text-brand-red shrink-0" /> Rua Maringá, 106 - SP</li>
                    <li className="flex gap-4"><Phone size={18} className="text-brand-red shrink-0" /> (11) 98128-0238</li>
                    <li className="flex gap-4"><Mail size={18} className="text-brand-red shrink-0" /> contato@spexpolofts.com.br</li>
                </ul>
            </div>

            <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red mb-10">{t('footer.loc')}</h4>
                <div className="h-40 bg-neutral-800 rounded-3xl overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                    <iframe title="Map" src="https://maps.google.com/maps?q=Rua%20Maring%C3%A1%2C%20106&t=&z=13&ie=UTF8&iwloc=&output=embed" className="w-full h-full border-0"></iframe>
                </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-[9px] font-black text-gray-600 uppercase tracking-widest text-center md:text-left">
            &copy; 2024 SPEXPO LOFTS. {language === 'en' ? 'ALL RIGHTS RESERVED' : language === 'es' ? 'TODOS LOS DERECHOS RESERVADOS' : 'TODOS OS DIREITOS RESERVADOS'}.
          </div>
        </div>
      </footer>
    </div>
  );
};