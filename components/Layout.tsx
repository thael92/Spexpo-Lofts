import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, Home, Instagram, Facebook } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // Novo estado para rolagem
  const { favorites } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Ajuste 50px conforme necessário para o ponto de rolagem
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-700 bg-gray-50">
      
      {/* Marketplace Header */}
      <header className={`sticky top-0 z-50 shadow-sm transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-[#FDF8E4]'}`}>
        <div className="container mx-auto px-4 h-20 md:h-24 flex items-center justify-between">
          
        {/* Logo Area - Visível apenas ao rolar */}
          <Link to="/home.tsx" className="flex items-center gap-2">
             {scrolled && (
              <img 
                src="/public/logo.png" 
                alt="Spexpo Lofts" 
                className="h-[80px] w-auto object-contain md:h-[100px]" // Logo em sua cor original quando rolada
              />
             )}
          </Link>

          {/* Desktop Marketplace Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            
            <Link to="/" className="flex items-center gap-1 hover:text-brand-red transition-colors font-medium">
               <Home size={18} /> Início
            </Link>

            <Link to="/favoritos" className="flex items-center gap-1 hover:text-brand-red transition-colors font-medium">
               <Heart size={18} fill={favorites.length > 0 ? "currentColor" : "none"} className={favorites.length > 0 ? "text-brand-red" : ""} /> 
               Favoritos ({favorites.length})
            </Link>

            {/* Social Media Links */}
            <div className="flex items-center gap-4 ml-2 border-l border-gray-200 pl-6 h-8">
                <a 
                  href="https://www.instagram.com/saopauloexpolofts/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-brand-red transition-colors"
                  title="Instagram"
                >
                    <Instagram size={20} />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61560904164722" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-brand-red transition-colors"
                  title="Facebook"
                >
                    <Facebook size={20} />
                </a>
            </div>
          </div>

          {/* Mobile Actions (Favorites + Menu Toggle) */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Favorites Icon */}
            <Link to="/favoritos" className="p-2 relative text-gray-600 hover:text-brand-red">
                <Heart size={24} fill={favorites.length > 0 ? "currentColor" : "none"} className={favorites.length > 0 ? "text-brand-red" : ""} />
                {favorites.length > 0 && (
                    <span className="absolute top-1 right-0 bg-brand-red text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-white">
                        {favorites.length}
                    </span>
                )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
                className="text-gray-700 p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMenuOpen && (
          <div className={`md:hidden border-t border-gray-100 absolute w-full shadow-lg h-screen z-50 ${scrolled ? 'bg-white' : 'bg-[#FDF8E4]'}`}>
            <div className="flex flex-col p-6 space-y-6">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 border-b pb-2 flex items-center gap-2">
                <Home size={20} /> Início
              </Link>
              <Link to="/favoritos" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 border-b pb-2 flex items-center gap-2">
                <Heart size={20} fill={favorites.length > 0 ? "currentColor" : "none"} className={favorites.length > 0 ? "text-brand-red" : ""} />
                Favoritos ({favorites.length})
              </Link>

              <div className="pt-4">
                 <p className="text-xs font-bold text-gray-400 uppercase mb-4">Siga-nos</p>
                 <div className="flex gap-6">
                    <a href="https://www.instagram.com/saopauloexpolofts/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-red flex items-center gap-2">
                        <Instagram size={24} /> <span className="font-medium">Instagram</span>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61560904164722" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-red flex items-center gap-2">
                        <Facebook size={24} /> <span className="font-medium">Facebook</span>
                    </a>
                 </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Simplified Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          
          <div className="flex items-center gap-2 order-2 md:order-1">
            <img src="/public/logo.png" alt="Logo" className="h-8 opacity-50 grayscale" />
            <span>&copy; 2024 Spexpo Lofts.</span>
          </div>

          {/* Social Links Footer */}
          <div className="flex gap-4 order-1 md:order-2">
             <a href="https://www.instagram.com/saopauloexpolofts/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-red transition-colors p-2 bg-gray-50 rounded-full">
                <Instagram size={20} />
             </a>
             <a href="https://www.facebook.com/profile.php?id=61560904164722" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-red transition-colors p-2 bg-gray-50 rounded-full">
                <Facebook size={20} />
             </a>
          </div>

          <div className="flex gap-6 order-3">
             <a href="#" className="hover:text-brand-red">Termos de Uso</a>
             <a href="#" className="hover:text-brand-red">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
};