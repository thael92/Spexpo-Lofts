export interface Address {
  rua: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  lat?: number;
  lng?: number;
}

export interface Property {
  id: string;
  slug: string;
  titulo: string;
  preco: number;
  tipo: 'Loft' | 'Apartamento' | 'Studio' | 'Casa';
  status: 'aluguel' | 'venda';
  area_m2: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  condominio?: number;
  iptu?: number;
  endereco: Address;
  descricao: string;
  imagens: string[];
  destaque: boolean;
  caracteristicas: string[];
}

export interface FilterState {
  search: string;
  minPrice: number;
  maxPrice: number;
  type: string;
  bedrooms: number | string;
}