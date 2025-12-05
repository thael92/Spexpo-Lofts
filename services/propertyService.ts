import { Property } from '../types';

// Helper to generate mock images
const getMockImage = (id: number, width = 800, height = 600) => 
  `https://picsum.photos/seed/${id}/${width}/${height}`;

// Base mock data with daily rates
const FEATURED_PROPERTIES: Property[] = [
  {
    id: "sp-001",
    slug: "loft-unidade-imigrantes",
    titulo: "Loft Unidade Imigrantes - Expo",
    preco: 220, // Daily rate
    tipo: "Loft",
    status: "aluguel",
    area_m2: 38,
    quartos: 1,
    banheiros: 1,
    vagas: 0,
    condominio: 0,
    iptu: 0,
    endereco: {
      rua: "Rua Maringá, 106",
      bairro: "Vila Guarani",
      cidade: "São Paulo",
      uf: "SP",
      cep: "04311-000"
    },
    descricao: "Unidade Imigrantes: Localização estratégica próximo ao São Paulo Expo (500m). O prédio conta com comodidades exclusivas como Mercadinho SmartStore no térreo, Lavanderia OMO compartilhada e Academia funcional. Ideal para investidores de Airbnb ou moradia prática. Acesso fácil ao Metrô Jabaquara.",
    imagens: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000&auto=format&fit=crop"
    ],
    destaque: true,
    caracteristicas: ["Mercadinho no Térreo", "Lavanderia OMO", "Academia", "Wi-Fi Dedicado", "Portaria Eletrônica", "500m do Expo"]
  },
  {
    id: "sp-002",
    slug: "studio-executive-guarani",
    titulo: "Studio Executive Guarani",
    preco: 180, // Daily rate
    tipo: "Studio",
    status: "aluguel",
    area_m2: 32,
    quartos: 1,
    banheiros: 1,
    vagas: 0,
    condominio: 0,
    endereco: {
      rua: "Av. do Café, 500",
      bairro: "Vila Guarani",
      cidade: "São Paulo",
      uf: "SP",
      cep: "04311-000"
    },
    descricao: "Praticidade e elegância. Studio compacto perfeito para quem precisa estar perto do aeroporto de Congonhas e do centro de eventos.",
    imagens: [getMockImage(201), getMockImage(202)],
    destaque: true,
    caracteristicas: ["Wi-Fi", "Coworking", "Lavanderia"]
  },
  {
    id: "sp-003",
    slug: "apartamento-familia-saude",
    titulo: "Apto 2 Quartos - Saúde",
    preco: 350, // Daily rate
    tipo: "Apartamento",
    status: "aluguel",
    area_m2: 70,
    quartos: 2,
    banheiros: 2,
    vagas: 1,
    condominio: 0,
    endereco: {
      rua: "Rua Carneiro da Cunha, 88",
      bairro: "Saúde",
      cidade: "São Paulo",
      uf: "SP",
      cep: "04100-000"
    },
    descricao: "Apartamento espaçoso em andar alto. Vista livre, varanda gourmet e lazer completo no condomínio.",
    imagens: [getMockImage(301), getMockImage(302), getMockImage(303)],
    destaque: false,
    caracteristicas: ["Piscina", "Varanda Gourmet", "Pet Friendly"]
  }
];

// Generator to create ~80 properties
const generateProperties = (): Property[] => {
  const properties = [...FEATURED_PROPERTIES];
  const types = ["Loft", "Studio", "Apartamento", "Casa"] as const;
  const bairros = ["Jabaquara", "Vila Guarani", "Saúde", "Vila Mariana", "Moema"];
  
  for (let i = 4; i <= 80; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const bairro = bairros[Math.floor(Math.random() * bairros.length)];
    
    properties.push({
      id: `sp-${String(i).padStart(3, '0')}`,
      slug: `imovel-${type.toLowerCase()}-${i}`,
      titulo: `${type} Comfort - ${bairro}`,
      preco: 120 + Math.floor(Math.random() * 300), // Daily rates between 120 and 420
      tipo: type,
      status: "aluguel",
      area_m2: 25 + Math.floor(Math.random() * 100),
      quartos: 1 + Math.floor(Math.random() * 3),
      banheiros: 1 + Math.floor(Math.random() * 2),
      vagas: Math.floor(Math.random() * 2),
      condominio: 0,
      endereco: {
        rua: `Rua Exemplo, ${i * 10}`,
        bairro: bairro,
        cidade: "São Paulo",
        uf: "SP",
        cep: "04000-000"
      },
      descricao: "Excelente oportunidade para sua estadia. Imóvel bem localizado, com fácil acesso a transporte público e comércios.",
      imagens: [getMockImage(i * 10), getMockImage(i * 10 + 1)],
      destaque: Math.random() > 0.9,
      caracteristicas: ["Segurança 24h", "Elevador", "Wi-Fi"]
    });
  }
  return properties;
};

const ALL_PROPERTIES = generateProperties();

export const fetchProperties = async (page = 1, limit = 12, filters?: any): Promise<{ data: Property[], total: number }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  let filtered = ALL_PROPERTIES;

  if (filters) {
    if (filters.search) {
      const s = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.titulo.toLowerCase().includes(s) || 
        p.endereco.bairro.toLowerCase().includes(s)
      );
    }
    if (filters.type && filters.type !== 'Todos') {
      filtered = filtered.filter(p => p.tipo === filters.type);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.preco >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.preco <= Number(filters.maxPrice));
    }
    if (filters.bedrooms && filters.bedrooms !== 'Qualquer') {
      if (filters.bedrooms === '4+') {
        filtered = filtered.filter(p => p.quartos >= 4);
      } else {
        filtered = filtered.filter(p => p.quartos === Number(filters.bedrooms));
      }
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
  await new Promise(resolve => setTimeout(resolve, 300));
  return ALL_PROPERTIES.find(p => p.id === id);
};

export const fetchFeaturedProperties = async (): Promise<Property[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return ALL_PROPERTIES.filter(p => p.destaque).slice(0, 4);
};