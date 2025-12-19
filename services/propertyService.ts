import { Property } from '../types';

// Base mock data for the 80 properties
const generateProperties = (): Property[] => {
  const properties: Property[] = [];
  const types = ["Loft", "Studio", "Apartamento"] as const;
  // Locais reais fornecidos pelo usuário
  const bairros = [
    "Imigrantes", 
    "Fachini", 
    "Conceição", 
    "Jabaquara", 
    "Butantã", 
    "Santo Amaro"
  ];
  
  // Create 80 properties
  for (let i = 1; i <= 80; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const bairro = bairros[Math.floor(Math.random() * bairros.length)];
    const quartos = Math.random() > 0.7 ? 2 : 1; 
    
    properties.push({
      id: `sp-${String(i).padStart(3, '0')}`,
      slug: `hospedagem-${bairro.toLowerCase()}-${i}`,
      titulo: `Loft Moderno ${bairro} - Unidade ${String(i).padStart(2, '0')}`,
      preco: 190 + Math.floor(Math.random() * 300), 
      tipo: type as any,
      status: "aluguel",
      area_m2: 25 + Math.floor(Math.random() * 25),
      quartos: quartos,
      banheiros: 1,
      vagas: i % 4 === 0 ? 1 : 0,
      condominio: 0,
      endereco: {
        rua: `Rua Localizada em ${bairro}, ${100 + i}`,
        bairro: bairro,
        cidade: "São Paulo",
        uf: "SP",
        cep: "04311-000"
      },
      descricao: `Localizada na região de ${bairro}, esta hospedagem da Spexpo oferece total praticidade. Equipada com enxoval completo, Wi-Fi de alta velocidade e móveis planejados, é a escolha ideal para quem busca conforto e proximidade com centros de eventos e metrô.`,
      imagens: [
          `https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop&sig=${i}`,
          `https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop&sig=${i+100}`,
          `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop&sig=${i+200}`
      ],
      destaque: i <= 8,
      caracteristicas: ["wi-fi 500mb", "smart tv", "self check-in", "cama queen", "ar-condicionado"],
      airbnbUrl: `https://www.airbnb.com.br/rooms/1553101057890730646`,
      icalUrl: `https://www.airbnb.com.br/calendar/ical/1553101057890730646.ics?s=a6f2dbb1e63508441d685f149313b24b`
    });
  }
  return properties;
};

const ALL_PROPERTIES = generateProperties();

export const fetchProperties = async (page = 1, limit = 12, filters?: any): Promise<{ data: Property[], total: number }> => {
  await new Promise(resolve => setTimeout(resolve, 400));

  let filtered = ALL_PROPERTIES;

  if (filters) {
    if (filters.search) {
      const s = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.titulo.toLowerCase().includes(s) || 
        p.endereco.bairro.toLowerCase().includes(s) ||
        p.endereco.rua.toLowerCase().includes(s)
      );
    }
    if (filters.type && filters.type !== 'Todos') {
      filtered = filtered.filter(p => p.tipo === filters.type);
    }
    // Filtro por Bairro (Região)
    if (filters.bairro && filters.bairro !== 'Todas as Regiões') {
      filtered = filtered.filter(p => p.endereco.bairro === filters.bairro);
    }
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    data: filtered.slice(start, end),
    total: filtered.length
  };
};

export const fetchPropertyById = async (id: string): Promise<Property | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return ALL_PROPERTIES.find(p => p.id === id);
};

export const fetchFeaturedProperties = async (): Promise<Property[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return ALL_PROPERTIES.filter(p => p.destaque);
};