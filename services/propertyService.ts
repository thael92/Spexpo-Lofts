import { Property, Language } from '../types';

// Funções de tradução (mantidas como estão)
const translateType = (type: string, lang: Language) => {
  if (lang === 'pt') return type;
  if (lang === 'en') {
    if (type === 'Casa') return 'House';
    return type;
  }
  if (lang === 'es') {
    if (type === 'Apartamento') return 'Departamento';
    if (type === 'Casa') return 'Casa';
    return type;
  }
  return type;
};

const translateDescription = (bairro: string, lang: Language) => {
  if (lang === 'en') return `Located in the ${bairro} region, this Spexpo accommodation offers total practicality. Equipped with full linen, high-speed Wi-Fi and custom furniture, it is the ideal choice for those seeking comfort and proximity to event centers and the subway.`;
  if (lang === 'es') return `Ubicado en la región de ${bairro}, este alojamiento de Spexpo ofrece total practicidad. Equipado con ropa de cama completa, Wi-Fi de alta velocidad y muebles a medida, es la opción ideal para quienes buscan comodidad y cercanía a centros de eventos y al metro.`;
  return `Localizada na região de ${bairro}, esta hospedagem da Spexpo oferece total praticidade. Equipada com enxoval completo, Wi-Fi de alta velocidade e móveis planejados, é a escolha ideal para quem busca conforto e proximidade com centros de eventos e metrô.`;
};

const translateTitle = (type: string, bairro: string, i: number, lang: Language) => {
  const typeTrans = translateType(type, lang);
  if (lang === 'en') return `Modern ${typeTrans} ${bairro} - Unit ${String(i).padStart(2, '0')}`;
  if (lang === 'es') return `${typeTrans} Moderno ${bairro} - Unidad ${String(i).padStart(2, '0')}`;
  return `${typeTrans} Moderno ${bairro} - Unidade ${String(i).padStart(2, '0')}`;
};

const generateProperties = (lang: Language = 'pt'): Property[] => {
  const properties: Property[] = [];
  const types = ["Loft", "Studio", "Apartamento"] as const;
  const bairros = ["Imigrantes", "Fachini", "Conceição", "Jabaquara", "Butantã", "Santo Amaro"];
  
  for (let i = 1; i <= 80; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const bairro = bairros[Math.floor(Math.random() * bairros.length)];
    const quartos = 1; 
    
    properties.push({
      id: `sp-${String(i).padStart(3, '0')}`,
      slug: `hospedagem-${bairro.toLowerCase()}-${i}`,
      title: translateTitle(type, bairro, i, lang),
      price: 190 + Math.floor(Math.random() * 300), 
      type: type as any,
      status: "aluguel",
      area_m2: 25 + Math.floor(Math.random() * 25),
      bedrooms: quartos,
      bathrooms: 1,
      parking: i % 4 === 0 ? 1 : 0,
      condo_fee: 0,
      address: {
        street: `Rua Localizada em ${bairro}, ${100 + i}`,
        neighborhood: bairro,
        city: "São Paulo",
        state: "SP",
        zip: "04311-000"
      },
      description: translateDescription(bairro, lang),
      photos: [
          `https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop&sig=${i}`,
          `https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop&sig=${i+100}`,
          `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop&sig=${i+200}`
      ],
      featured: i <= 8,
      features: ["wi-fi 500mb", "smart tv", "self check-in", "cama queen", "ar-condicionado"],
      airbnb_url: `https://www.airbnb.com.br/rooms/1553101057890730646`,
      ical_url: `https://www.airbnb.com.br/calendar/ical/1553101057890730646.ics?s=a6f2dbb1e63508441d685f149313b24b`
    });
  }
  return properties;
};

const seedProperties = () => {
    const properties = generateProperties('pt');
    localStorage.setItem('properties', JSON.stringify(properties));
    return properties;
}

export const getProperties = async (): Promise<Property[]> => {
    const properties = localStorage.getItem('properties');
    if (!properties) {
        return seedProperties();
    }
    return JSON.parse(properties);
}

export const getPropertyById = async (id: string): Promise<Property | undefined> => {
    const properties = await getProperties();
    return properties.find(p => p.id === id);
}

export const addProperty = async (property: Partial<Property>): Promise<Property> => {
    const properties = await getProperties();
    const newProperty: Property = {
        id: `sp-${String(properties.length + 1).padStart(3, '0')}`,
        slug: `hospedagem-${property.title?.toLowerCase().replace(/ /g, '-')}`,
        ...property
    } as Property;
    const newProperties = [...properties, newProperty];
    localStorage.setItem('properties', JSON.stringify(newProperties));
    return newProperty;
}

export const updateProperty = async (id: string, updates: Partial<Property>): Promise<Property | undefined> => {
    const properties = await getProperties();
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) {
        return undefined;
    }
    const updatedProperty = { ...properties[index], ...updates };
    const newProperties = [...properties];
    newProperties[index] = updatedProperty;
    localStorage.setItem('properties', JSON.stringify(newProperties));
    return updatedProperty;
}

export const deleteProperty = async (id: string): Promise<void> => {
    let properties = await getProperties();
    properties = properties.filter(p => p.id !== id);
    localStorage.setItem('properties', JSON.stringify(properties));
}

export const fetchProperties = async (page = 1, limit = 12, filters?: any): Promise<{ data: Property[], total: number }> => {
  const currentLang = (localStorage.getItem('spexpo_lang') || 'pt') as Language;
  const allProps = await getProperties();
  
  await new Promise(resolve => setTimeout(resolve, 400));

  let filtered = allProps;

  if (filters) {
    if (filters.search) {
      const s = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(s) || 
        p.address.neighborhood.toLowerCase().includes(s) ||
        p.address.street.toLowerCase().includes(s)
      );
    }
    if (filters.type && filters.type !== 'Todos') {
      filtered = filtered.filter(p => p.type === filters.type);
    }
    if (filters.neighborhood && filters.neighborhood !== 'Todas as Regiões') {
      filtered = filtered.filter(p => p.address.neighborhood === filters.neighborhood);
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
  const currentLang = (localStorage.getItem('spexpo_lang') || 'pt') as Language;
  const allProps = await getProperties();
  await new Promise(resolve => setTimeout(resolve, 200));
  return allProps.find(p => p.id === id);
};

export const fetchFeaturedProperties = async (): Promise<Property[]> => {
  const currentLang = (localStorage.getItem('spexpo_lang') || 'pt') as Language;
  const allProps = await getProperties();
  await new Promise(resolve => setTimeout(resolve, 200));
  return allProps.filter(p => p.featured);
};