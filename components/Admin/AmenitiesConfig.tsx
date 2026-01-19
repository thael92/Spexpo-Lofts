import React from 'react';
import { Wifi, Tv, Wind, Coffee, Car, Dumbbell, PawPrint, Waves, Utensils, Flame, FireExtinguisher, WashingMachine } from 'lucide-react';

export interface AmenityOption {
    id: string;
    label: string;
    description?: string;
    icon: React.ElementType;
}

export const AMENITIES_OPTIONS: AmenityOption[] = [
    {
        id: 'kitchen',
        label: 'Cozinha',
        description: 'Um espaço para cozinhar refeições que inclui pelo menos uma geladeira, forno e fogão',
        icon: Utensils
    },
    {
        id: 'smoke_detector',
        label: 'Detector de fumaça',
        description: 'Um dispositivo que emite um alerta ao detectar fumaça',
        icon: Flame
    },
    {
        id: 'parking',
        label: 'Estacionamento incluído',
        description: 'Estacionamento gratuito na propriedade',
        icon: Car
    },
    {
        id: 'fire_extinguisher',
        label: 'Extintor de incêndio',
        icon: FireExtinguisher
    },
    {
        id: 'washer',
        label: 'Máquina de Lavar',
        description: 'Uma máquina que lava roupa suja',
        icon: WashingMachine
    },
    {
        id: 'tv',
        label: 'TV',
        description: 'Um dispositivo para assistir à televisão',
        icon: Tv
    },
    {
        id: 'wifi',
        label: 'Wi-Fi',
        description: 'Tecnologia sem fio que permite que os dispositivos se conectem à internet',
        icon: Wifi
    },
    { id: 'ac', label: 'Ar Condicionado', icon: Wind },
    { id: 'gym', label: 'Academia', icon: Dumbbell },
    { id: 'pool', label: 'Piscina', icon: Waves },
    { id: 'pet', label: 'Pet Friendly', icon: PawPrint },
    { id: 'workspace', label: 'Espaço de Trabalho', icon: Coffee },
];

export const getAmenityIcon = (label: string) => {
    // Tenta encontrar por ID ou Label (case insensitive)
    const option = AMENITIES_OPTIONS.find(opt =>
        opt.label.toLowerCase() === label.toLowerCase() ||
        opt.id === label.toLowerCase() ||
        // Fallback for partial matches if needed, but risky
        (opt.label.includes('Wi-Fi') && label.toLowerCase().includes('wifi'))
    );
    return option ? option.icon : null;
};
