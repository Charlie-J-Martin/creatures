import { spawnAnimal } from './animalFactory';
import { breed } from './breed';

test('Breeding between two of the same animal with a guarenteed breed rating should result in an offspring being born', () => {
    const mouse1 = spawnAnimal('mouse');
    const mouse2 = spawnAnimal('mouse');
    const pairing = {
        animal1: mouse1,
        animal2: mouse2,
    };
    expect(breed(pairing)).toHaveLength(3);
});
