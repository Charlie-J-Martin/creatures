import { spawnAnimal } from './animalFactory';
import { Pairing, Animal } from './types';

export const breed = ({ animal1, animal2 }: Pairing): Animal[] => [
    animal1,
    animal2,
    spawnAnimal(animal1.kind),
];
