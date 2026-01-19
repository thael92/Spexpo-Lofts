import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Property } from '../../types';
import { getProperties, deleteProperty } from '../../services/propertyService';
import { Search } from 'lucide-react';

const Lofts: React.FC = () => {
    const navigate = useNavigate();
    const [lofts, setLofts] = useState<Property[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated !== 'true') {
            navigate('/admin');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchProperties = async () => {
            const properties = await getProperties();
            setLofts(properties);
        };
        fetchProperties();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/admin');
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this loft?')) {
            await deleteProperty(id);
            setLofts(lofts.filter((loft) => loft.id !== id));
        }
    };

    const filteredLofts = lofts.filter(loft => {
        const searchLower = searchTerm.toLowerCase();
        return (
            loft.title.toLowerCase().includes(searchLower) ||
            loft.address?.neighborhood?.toLowerCase().includes(searchLower) ||
            loft.address?.street?.toLowerCase().includes(searchLower)
        );
    });

    return (

        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Gerenciar Imóveis</h2>

                <div className="flex w-full md:w-auto gap-3">
                    <div className="relative flex-1 md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-red focus:border-brand-red sm:text-sm transition duration-150 ease-in-out"
                            placeholder="Buscar por unidade, bairro..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => navigate('/admin/lofts/new')}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-red rounded-lg hover:bg-red-700 transition-colors shadow-sm whitespace-nowrap"
                    >
                        + Novo Imóvel
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-semibold text-left text-gray-500 uppercase tracking-wider">
                                    Imóvel
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-left text-gray-500 uppercase tracking-wider">
                                    Tipo
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-left text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-right text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredLofts.map((loft) => (
                                <tr key={loft.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {loft.photos && loft.photos.length > 0 && (
                                                <div className="flex-shrink-0 h-10 w-10 mr-4">
                                                    <img className="h-10 w-10 rounded-lg object-cover" src={loft.photos[0]} alt="" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{loft.title}</p>
                                                <p className="text-xs text-gray-500">{loft.address?.neighborhood}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {loft.type}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`
                                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${loft.status === 'aluguel' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                                        `}>
                                            {loft.status === 'aluguel' ? 'Aluguel' : 'Venda'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm">
                                        <button
                                            onClick={() => navigate(`/admin/lofts/edit/${loft.id}`)}
                                            className="text-brand-red hover:text-red-800 font-medium mr-4"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(loft.id)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredLofts.length === 0 && (
                    <div className="p-10 text-center text-gray-500">
                        {searchTerm ? 'Nenhum imóvel encontrado para sua busca.' : 'Nenhum imóvel cadastrado.'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lofts;
