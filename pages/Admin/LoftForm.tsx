import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Property } from '../../types';
import { getPropertyById, addProperty, updateProperty } from '../../services/propertyService';
import { AMENITIES_OPTIONS } from '../../components/Admin/AmenitiesConfig';

const LoftForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    // Estado inicial
    const [loft, setLoft] = useState<Partial<Property>>({
        title: '',
        description: '',
        type: 'Loft',
        status: 'aluguel',
        area_m2: 0,
        bedrooms: 1,
        bathrooms: 1,
        parking: 0,
        ical_url: '',
        airbnb_url: '',
        map_iframe_url: '',
        photos: [],
        features: [],
        address: {
            street: '',
            neighborhood: '',
            city: 'São Paulo',
            state: 'SP',
            zip: ''
        }
    });

    // Verificação de autenticação
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated !== 'true') {
            navigate('/admin');
        }
    }, [navigate]);

    // Carregar dados se for edição
    useEffect(() => {
        if (id) {
            const fetchLoft = async () => {
                setLoading(true);
                try {
                    const currentLoft = await getPropertyById(id);
                    if (currentLoft) {
                        setLoft(currentLoft);
                    }
                } catch (error) {
                    console.error("Erro ao carregar loft:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchLoft();
        }
    }, [id]);

    // Manipulador de inputs genéricos (incluindo objetos aninhados como address)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setLoft(prev => ({
                ...prev,
                [parent]: {
                    ...(prev as any)[parent],
                    [child]: value
                }
            }));
        } else {
            setLoft(prev => ({ ...prev, [name]: value }));
        }
    };

    // Manipulador de Comodidades (Features)
    const handleFeatureToggle = (featureId: string) => {
        setLoft(prev => {
            const currentFeatures = prev.features || [];
            if (currentFeatures.includes(featureId)) {
                return { ...prev, features: currentFeatures.filter(f => f !== featureId) };
            } else {
                return { ...prev, features: [...currentFeatures, featureId] };
            }
        });
    };

    // Estado e manipuladores de Fotos
    const [imageUrlInput, setImageUrlInput] = useState('');
    const [activeTab, setActiveTab] = useState<'pt' | 'en' | 'es'>('pt');

    const handleAddPhotoByUrl = () => {
        if (imageUrlInput.trim()) {
            setLoft(prev => ({ ...prev, photos: [...(prev.photos || []), imageUrlInput.trim()] }));
            setImageUrlInput('');
        }
    };

    const removePhoto = (index: number) => {
        setLoft(prev => ({
            ...prev,
            photos: prev.photos?.filter((_, i) => i !== index)
        }));
    };

    // Handler de Traduções
    const handleTranslationChange = (lang: 'en' | 'es' | 'pt', field: 'title' | 'description', value: string) => {
        if (lang === 'pt') {
            setLoft(prev => ({ ...prev, [field]: value }));
        } else {
            setLoft(prev => ({
                ...prev,
                translations: {
                    ...prev.translations,
                    [lang]: {
                        ...prev.translations?.[lang],
                        [field]: value
                    }
                }
            }));
        }
    };

    // Função de Salvar (Submit)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await updateProperty(id, loft as Property);
            } else {
                await addProperty(loft as Property);
            }
            navigate('/admin/lofts');
        } catch (error) {
            console.error('Erro ao salvar propriedade:', error);
            alert('Erro ao salvar as alterações. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto my-8">
            <div className="mb-6 border-b pb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {id ? 'Editar Loft' : 'Novo Loft'}
                    </h1>
                    <p className="text-gray-500 mt-1">Preencha as informações do imóvel abaixo.</p>
                </div>
                <button
                    onClick={() => navigate('/admin/lofts')}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Seção 1: Informações Básicas */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 border-b pb-2">Informações Básicas</h3>

                    {/* Tabs de Tradução */}
                    <div className="mb-4 flex space-x-2 border-b border-gray-200">
                        {['pt', 'en', 'es'].map((lang) => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => setActiveTab(lang as 'pt' | 'en' | 'es')}
                                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === lang
                                    ? 'bg-white border-x border-t border-gray-200 text-brand-red'
                                    : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {lang === 'pt' ? 'Português (Padrão)' : lang === 'en' ? 'Inglês' : 'Espanhol'}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título do Anúncio ({activeTab.toUpperCase()})</label>
                            <input
                                type="text"
                                value={
                                    activeTab === 'pt'
                                        ? loft.title
                                        : (loft.translations?.[activeTab]?.title || '')
                                }
                                onChange={(e) => handleTranslationChange(activeTab, 'title', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                                required={activeTab === 'pt'}
                                placeholder={activeTab === 'pt' ? "Ex: Loft Moderno..." : "Ex: Modern Loft..."}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                            <select
                                name="type"
                                value={loft.type}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            >
                                <option value="Loft">Loft</option>
                                <option value="Apartamento">Apartamento</option>
                                <option value="Studio">Studio</option>
                                <option value="Casa">Casa</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                value={loft.status}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            >
                                <option value="aluguel">Disponível para Aluguel</option>
                                <option value="vendido">Vendido</option>
                                <option value="alugado">Alugado</option>
                                <option value="indisponivel">Indisponível</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição ({activeTab.toUpperCase()})</label>
                        <textarea
                            value={
                                activeTab === 'pt'
                                    ? loft.description
                                    : (loft.translations?.[activeTab]?.description || '')
                            }
                            onChange={(e) => handleTranslationChange(activeTab, 'description', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            placeholder={activeTab === 'pt' ? "Descrição detalhada..." : "Detailed description..."}
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
                            <input
                                type="number"
                                name="area_m2"
                                value={loft.area_m2}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quartos</label>
                            <input
                                type="number"
                                name="bedrooms"
                                value={loft.bedrooms}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Capacidade (Pessoas)</label>
                            <input
                                type="number"
                                name="maxGuests"
                                value={loft.maxGuests || 4}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Banheiros</label>
                            <input
                                type="number"
                                name="bathrooms"
                                value={loft.bathrooms}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vagas</label>
                            <input
                                type="number"
                                name="parking"
                                value={loft.parking}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                    </div>
                </div>

                {/* Seção 2: Endereço */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 border-b pb-2">Localização</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rua / Logradouro</label>
                            <input
                                type="text"
                                name="address.street"
                                value={loft.address?.street}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                            <input
                                type="text"
                                name="address.neighborhood"
                                value={loft.address?.neighborhood}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                            <input
                                type="text"
                                name="address.zip"
                                value={loft.address?.zip}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                            <input
                                type="text"
                                name="address.city"
                                value={loft.address?.city}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                            <input
                                type="text"
                                name="address.state"
                                value={loft.address?.state}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                    </div>
                </div>

                {/* Seção 3: Links Externos */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 border-b pb-2">Links & Integrações</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link do Airbnb</label>
                            <input
                                type="text"
                                name="airbnb_url"
                                value={loft.airbnb_url}
                                onChange={handleChange}
                                placeholder="https://www.airbnb.com.br/rooms/..."
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL do iCal (Calendário)</label>
                            <input
                                type="text"
                                name="ical_url"
                                value={loft.ical_url}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL do Google Maps (Embed)</label>
                            <input
                                type="text"
                                name="map_iframe_url"
                                value={loft.map_iframe_url}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring focus:ring-red-200 p-2 border"
                            />
                        </div>
                    </div>
                </div>

                {/* Seção 4: Comodidades (Amenities) */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 border-b pb-2">Comodidades</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {AMENITIES_OPTIONS.map((option) => (
                            <label key={option.id} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-white rounded transition-colors">
                                <input
                                    type="checkbox"
                                    checked={loft.features?.includes(option.id) || false}
                                    onChange={() => handleFeatureToggle(option.id)}
                                    className="rounded border-gray-300 text-brand-red focus:ring-brand-red"
                                />
                                <span className="text-sm text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Seção 5: Fotos (Código fornecido) */}
                <div className="mb-6">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 border-b pb-2">Fotos (URLs)</h3>

                    <div className="mb-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Adicionar Foto por Link</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={imageUrlInput}
                                onChange={(e) => setImageUrlInput(e.target.value)}
                                placeholder="https://exemplo.com/imagem.jpg"
                                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-brand-red focus:ring-4 focus:ring-red-500/10 transition-all font-medium"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddPhotoByUrl();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={handleAddPhotoByUrl}
                                className="px-6 py-2 bg-brand-red text-white font-medium rounded-lg hover:bg-black transition-colors"
                            >
                                Adicionar
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Cole o link direto da imagem e clique em Adicionar ou aperte Enter.</p>
                    </div>

                    {loft.photos && loft.photos.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {loft.photos.map((photo, index) => (
                                <div key={index} className="relative group aspect-w-16 aspect-h-9">
                                    <img src={photo} alt={`Foto ${index + 1}`} className="object-cover w-full h-32 rounded-lg bg-gray-100 border border-gray-200" />
                                    <button
                                        type="button"
                                        onClick={() => removePhoto(index)}
                                        className="absolute top-1 right-1 p-1.5 text-white bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 shadow-sm"
                                        title="Remover foto"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            Nenhuma foto adicionada ainda.
                        </div>
                    )}
                </div>

                {/* Footer com Ações */}
                <div className="flex justify-end pt-5 border-t">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/lofts')}
                        className="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-brand-red rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                        {loading ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoftForm;