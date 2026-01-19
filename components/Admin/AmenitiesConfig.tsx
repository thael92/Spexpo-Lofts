import React from 'react';
import { Wifi, Tv, Wind, Coffee, Car, Dumbbell, PawPrint, Waves, Utensils, Flame, FireExtinguisher, WashingMachine } from 'lucide-react';

export interface AmenityOption {
    id: string;
    label: string;
    label_en?: string;
    label_es?: string;
    description?: string;
    icon: React.ElementType;
}

export const AMENITIES_OPTIONS: AmenityOption[] = [
    {
        id: 'kitchen',
        label: 'Cozinha',
        label_en: 'Kitchen',
        label_es: 'Cocina',
        description: 'Um espaço para cozinhar refeições que inclui pelo menos uma geladeira, forno e fogão',
        icon: Utensils
    },
    {
        id: 'smoke_detector',
        label: 'Detector de fumaça',
        label_en: 'Smoke detector',
        label_es: 'Detector de humo',
        description: 'Um dispositivo que emite um alerta ao detectar fumaça',
        icon: Flame
    },
    {
        id: 'parking',
        label: 'Estacionamento incluído',
        label_en: 'Free parking',
        label_es: 'Estacionamiento gratuito',
        description: 'Estacionamento gratuito na propriedade',
        icon: Car
    },
    {
        id: 'fire_extinguisher',
        label: 'Extintor de incêndio',
        label_en: 'Fire extinguisher',
        label_es: 'Extintor de incendios',
        icon: FireExtinguisher
    },
    {
        id: 'washer',
        label: 'Máquina de Lavar',
        label_en: 'Washer',
        label_es: 'Lavadora',
        description: 'Uma máquina que lava roupa suja',
        icon: WashingMachine
    },
    {
        id: 'tv',
        label: 'TV',
        label_en: 'TV',
        label_es: 'TV',
        description: 'Um dispositivo para assistir à televisão',
        icon: Tv
    },
    {
        id: 'wifi',
        label: 'Wi-Fi',
        label_en: 'Wi-Fi',
        label_es: 'Wi-Fi',
        description: 'Tecnologia sem fio que permite que os dispositivos se conectem à internet',
        icon: Wifi
    },
    { id: 'ac', label: 'Ar Condicionado', label_en: 'Air conditioning', label_es: 'Aire acondicionado', icon: Wind },
    { id: 'gym', label: 'Academia', label_en: 'Gym', label_es: 'Gimnasio', icon: Dumbbell },
    { id: 'pool', label: 'Piscina', label_en: 'Pool', label_es: 'Piscina', icon: Waves },
    { id: 'pet', label: 'Pet Friendly', label_en: 'Pet friendly', label_es: 'Mascotas permitidas', icon: PawPrint },
    { id: 'workspace', label: 'Espaço de Trabalho', label_en: 'Workspace', label_es: 'Área de trabajo', icon: Coffee },
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
