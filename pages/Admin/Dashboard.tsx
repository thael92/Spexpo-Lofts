import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = React.useState({ total: 0, sale: 0, rent: 0 });

    useEffect(() => {
        const checkAuthAndFetch = async () => {
            const isAuthenticated = localStorage.getItem('isAuthenticated');
            if (isAuthenticated !== 'true') {
                navigate('/admin');
                return;
            }

            const properties = await import('../../services/propertyService').then(m => m.getProperties());
            const total = properties.length;
            const sale = properties.filter(p => p.status === 'venda').length;
            const rent = properties.filter(p => p.status === 'aluguel').length;
            setStats({ total, sale, rent });
        };
        checkAuthAndFetch();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/admin');
    };

    // Chart Calculations
    const size = 100;
    const strokeWidth = 12;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // Rent percentage for donut
    const rentPercent = stats.total > 0 ? (stats.rent / stats.total) : 0;
    const rentOffset = circumference - (rentPercent * circumference);

    return (
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Visão Geral</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Stats Card with Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between relative overflow-hidden">
                    <div className="z-10">
                        <h4 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Total de Imóveis</h4>
                        <p className="text-4xl font-black text-gray-900">{stats.total}</p>
                        <div className="flex flex-col mt-3 space-y-1">
                            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                <div className="w-2 h-2 rounded-full bg-brand-red"></div>
                                <span>{stats.rent} Aluguel</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                                <span>{stats.sale} Venda</span>
                            </div>
                        </div>
                    </div>

                    {/* Donut Chart */}
                    <div className="w-24 h-24 relative">
                        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                            {/* Background Circle (Venda) */}
                            <circle
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="transparent"
                                stroke="#1f2937"
                                strokeWidth={strokeWidth}
                            />
                            {/* Foreground Circle (Aluguel) */}
                            <circle
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="transparent"
                                stroke="#dc2626"
                                strokeWidth={strokeWidth}
                                strokeDasharray={circumference}
                                strokeDashoffset={rentOffset}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        {stats.total === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 font-bold">
                                ---
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions (Placeholder for now, can be expanded) */}
                <div className="bg-gradient-to-br from-brand-red to-red-600 p-6 rounded-xl shadow-md text-white md:col-span-2 flex flex-col justify-center items-start">
                    <h4 className="text-white/80 font-bold text-xs uppercase tracking-widest mb-2">Acesso Rápido</h4>
                    <p className="text-lg font-bold mb-4">Gerencie seus imóveis com facilidade.</p>
                    <button
                        onClick={() => navigate('/admin/lofts/new')}
                        className="px-5 py-2 bg-white text-brand-red font-bold rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-sm"
                    >
                        + Adicionar Novo Imóvel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
