import { Pairing, Animal } from './types';
import { fight } from './fight';
import { breed } from './breed';

export const encounter = (animals: Pairing): Animal[] => {
    if (animals.animal1.kind === animals.animal2.kind) {
        if (Math.random() < animals.animal1.breedability) {
            return breed(animals);
        } else {
            return fight(animals);
        }
    } else {
        return fight(animals);
    }
};
