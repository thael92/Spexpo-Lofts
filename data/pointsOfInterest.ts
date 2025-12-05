import { Car, Utensils, ShoppingBag, Map, Coffee, Plane, Train } from 'lucide-react';

export type Category = 'Transporte' | 'Alimentação' | 'Comércio' | 'Turismo';

export interface POI {
  name: string;
  address: string;
  distance?: string;
  phone?: string;
  description?: string;
}

export const POI_ICONS = {
  'Transporte': Car,
  'Alimentação': Utensils,
  'Comércio': ShoppingBag,
  'Turismo': Map
};

export const POINTS_OF_INTEREST: Record<Category, POI[]> = {
  'Transporte': [
    {
      name: 'São Paulo Expo',
      address: 'Rodovia dos Imigrantes, km 1.5, São Paulo - SP',
      distance: '500m',
      description: 'Principal centro de eventos da América Latina.'
    },
    {
      name: 'Estação Jabaquara (Metrô)',
      address: 'Estação Jabaquara, São Paulo - SP',
      distance: '1km',
      description: 'Linha 1-Azul. Acesso fácil a toda a cidade.'
    },
    {
      name: 'Aeroporto de Congonhas',
      address: 'Aeroporto de Congonhas, São Paulo - SP',
      distance: '6km',
      description: 'Vôos domésticos.'
    },
    {
      name: 'Estacionamento Particular (Indicação)',
      address: 'Rua Pampa, 431, São Paulo - SP',
      distance: 'Próximo',
      description: 'Contato: Marcelo (12) 97403-4044'
    }
  ],
  'Alimentação': [
    {
      name: 'Padaria Daniela',
      address: 'Av. Lino de Almeida Pires, 227 - Vila Guarani',
      distance: '6h - 22h',
      description: 'Padaria tradicional próxima.'
    },
    {
      name: 'Padaria Cidade Vargas',
      address: 'Rua Charruas, 278 - Vila Guarani',
      distance: '6h - 22h'
    },
    {
      name: 'Madero Burger',
      address: 'Av. Eng. Armando de Arruda Pereira, 700',
      distance: '11h30 - 22h30'
    },
    {
      name: 'Habib\'s',
      address: 'Av. Eng. Armando de Arruda Pereira, 2285',
      distance: '24 Horas'
    },
    {
      name: 'Boteco Vila Jabaquara',
      address: 'Rua dos Jornalistas, 259',
      distance: '5h - 00h'
    },
    {
      name: 'Fiorino Grill e Pizzaria',
      address: 'Av. Eng. Armando de Arruda Pereira, 1071',
      distance: '10h - 22h'
    }
  ],
  'Comércio': [
    {
      name: 'Mercado Oxxo',
      address: 'Av. Leonardo da Vinci, 2429 - Vila Guarani',
      distance: '24 Horas',
      description: 'Conveniência rápida.'
    },
    {
      name: 'Supermercado Bonanza',
      address: 'Av. Lino de Almeida Pires, 57 - Vila Guarani',
      distance: '7h - 20h'
    },
    {
      name: 'Drogaria Guarani',
      address: 'R. Bicudo de Brito, 575 - Vila Guarani',
      distance: '8h - 20h'
    },
    {
      name: 'Shopping Plaza Sul',
      address: 'Praça Leonor Kaupa, 100 - Jardim da Saúde',
      distance: '10h - 22h'
    }
  ],
  'Turismo': [
    {
      name: 'Jardim Botânico',
      address: 'Av. Miguel Estéfano, 3031 - Água Funda',
      description: 'Natureza e tranquilidade.'
    },
    {
      name: 'Zoológico de São Paulo',
      address: 'Av. Miguel Estéfano, 4241 - Água Funda',
      description: 'Maior zoológico do Brasil.'
    },
    {
      name: 'Aquário de São Paulo',
      address: 'R. Huet Bacelar, 407 - Ipiranga',
      description: 'Diversão para a família.'
    },
    {
      name: 'Simba Safari',
      address: 'Av. do Cursino, 6338 - Vila Moraes',
      description: 'Safari urbano.'
    }
  ]
};