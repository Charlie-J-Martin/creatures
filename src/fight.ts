import { Pairing, Animal } from './types';

export const fight = (animals: Pairing): Animal[] => {
    animals.animal2.hp = animals.animal2.hp - animals.animal1.cp;

    if (animals.animal2.hp <= 0) {
        return [animals.animal1];
    } else {
        return fight({
            animal1: animals.animal2,
            animal2: animals.animal1,
        });
    }
};
