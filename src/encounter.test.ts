import { spawnAnimal } from './animalFactory';
import { encounter } from './encounter';
import { fight } from './fight';

describe('Breeding when two animals of the same type are selected', () => {
    test('When two mice are selected and the breeding likelihood is guarenteed, the breed function is called', () => {
        const animal1 = spawnAnimal('mouse');
        const animal2 = spawnAnimal('mouse');
        const animals = { animal1, animal2 };
        encounter(animals);
        expect(fight(animals)).toBeCalled;
    });

    test('When two mice are selected and the breeding likelihood is guarenteed, an offspring is born', () => {
        const animal1 = spawnAnimal('panda');
        const animal2 = spawnAnimal('panda');
        const animals = { animal1, animal2 };
        expect(fight(animals)).toBeCalled;
    });
});
