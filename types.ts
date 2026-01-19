export type Language = 'pt' | 'en' | 'es';

export interface Address {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  lat?: number;
  lng?: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  price: number;
  type: 'Loft' | 'Apartamento' | 'Studio' | 'Casa';
  status: 'aluguel' | 'venda';
  area_m2: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests?: number; // Nova propriedade
  parking: number;
  condo_fee?: number;
  iptu?: number;
  address: Address;
  description: string;
  photos: string[];
  featured: boolean;
  features: string[];
  airbnb_url?: string;
  ical_url?: string;
  map_iframe_url?: string;
  translations?: {
    en?: {
      title?: string;
      description?: string;
    };
    es?: {
      title?: string;
      description?: string;
    };
  };
}

export interface FilterState {
  search: string;
  minPrice: number;
  maxPrice: number;
  type: string;
  bedrooms: number | string;
  startDate?: string;
  endDate?: string;
}