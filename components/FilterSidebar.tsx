import React from 'react';
import { Calendar, X } from 'lucide-react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (key: keyof FilterState, value: any) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, isOpen, onClose, onFilterChange }) => {
  
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    // If the user clicks on the semi-transparent background (aside), close the sidebar
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <aside 
        className={`
            lg:w-[280px] flex-shrink-0 z-50
            ${isOpen 
               ? 'fixed inset-0 bg-black/50 lg:bg-transparent flex justify-end lg:block transition-opacity duration-300' 
               : 'hidden lg:block'}
            lg:sticky lg:top-24
        `}
        onClick={handleOverlayClick}
     >
       
       <div 
          className={`
           bg-[#FFFF] lg:rounded-lg shadow-sm lg:border border-gray-200 overflow-y-auto lg:overflow-visible
           w-[85%] lg:w-full h-full lg:h-auto max-w-sm lg:max-w-none
           ${isOpen ? 'animate-in slide-in-from-right duration-300' : ''}
          `}
          // Prevent clicks inside the white box from closing the sidebar
          onClick={(e) => e.stopPropagation()}
       >
           {/* Red Header */}
           <div className="bg-[#D32F2F] text-white p-4 font-bold text-lg flex items-center justify-between sticky top-0 z-10 lg:static">
               <span className="flex items-center gap-2">Para onde você vai?</span>
               <button 
                   onClick={onClose} 
                   className="lg:hidden text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                   aria-label="Fechar"
               >
                   <X size={24} />
               </button>
           </div>

           <div className="p-4 space-y-6">
               
               {/* Período */}
               <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
                       <Calendar size={14} /> Período
                   </label>
                   <div className="space-y-2">
                       <input 
                           type="date" 
                           className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors" 
                           placeholder="Entrada"
                           value={filters.startDate || ''}
                           onChange={(e) => onFilterChange('startDate', e.target.value)}
                       />
                       <input 
                           type="date" 
                           className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors" 
                           placeholder="Saída"
                           value={filters.endDate || ''}
                           onChange={(e) => onFilterChange('endDate', e.target.value)}
                       />
                   </div>
               </div>

               {/* Quantas Pessoas */}
               <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Quantas Pessoas?</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none bg-white focus:border-[#D32F2F]">
                        <option>No mínimo 1</option>
                        <option>2 pessoas</option>
                        <option>3 pessoas</option>
                        <option>4+ pessoas</option>
                    </select>
               </div>

               {/* Acomodações (Checkbox Style) */}
               <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Acomodações</label>
                   <div className="space-y-2">
                       {['Loft', 'Studio', 'Apartamento', 'Casa'].map(type => (
                           <label key={type} className="flex items-center gap-2 cursor-pointer group">
                               <input 
                                   type="radio" 
                                   name="type"
                                   checked={filters.type === type}
                                   onChange={() => onFilterChange('type', type)}
                                   className="w-4 h-4 text-[#D32F2F] border-gray-300 focus:ring-[#D32F2F] accent-[#D32F2F]"
                               />
                               <span className={`text-sm ${filters.type === type ? 'text-[#D32F2F] font-bold' : 'text-gray-600 group-hover:text-[#D32F2F]'}`}>
                                   {type}
                               </span>
                           </label>
                       ))}
                        <label className="flex items-center gap-2 cursor-pointer group">
                               <input 
                                   type="radio" 
                                   name="type"
                                   checked={filters.type === 'Todos'}
                                   onChange={() => onFilterChange('type', 'Todos')}
                                   className="w-4 h-4 text-[#D32F2F] border-gray-300 focus:ring-[#D32F2F] accent-[#D32F2F]"
                               />
                               <span className="text-sm text-gray-600">Ver Todos</span>
                       </label>
                   </div>
               </div>

               {/* Quartos */}
               <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Quartos</label>
                    <div className="flex gap-2">
                       <select 
                           className="w-full border border-gray-300 rounded px-2 py-2 text-sm text-gray-600 outline-none focus:border-[#D32F2F]"
                           value={filters.bedrooms}
                           onChange={(e) => onFilterChange('bedrooms', e.target.value)}
                       >
                           <option value="Qualquer">Min</option>
                           <option value="1">1</option>
                           <option value="2">2</option>
                           <option value="3">3</option>
                       </select>
                       <select className="w-full border border-gray-300 rounded px-2 py-2 text-sm text-gray-600 outline-none focus:border-[#D32F2F]">
                           <option>Máx</option>
                           <option value="1">1</option>
                           <option value="2">2</option>
                           <option value="3">3</option>
                       </select>
                    </div>
               </div>
               
               {/* Distance (Mock) */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Distância do Expo</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none bg-white focus:border-[#D32F2F]">
                        <option>Selecione</option>
                        <option>Até 500m</option>
                        <option>Até 1km</option>
                        <option>Até 5km</option>
                    </select>
               </div>

               {/* Mobile Only: Action Button */}
               <div className="lg:hidden pt-4">
                   <button 
                       onClick={onClose}
                       className="w-full bg-[#D32F2F] text-white py-3 rounded-lg font-bold shadow-md"
                   >
                       Aplicar Filtros
                   </button>
               </div>

           </div>
       </div>
     </aside>
  );
};