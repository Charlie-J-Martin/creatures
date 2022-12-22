import { spawnAnimal } from './animalFactory';
import { encounter } from './encounter';
import { fight } from './fight';

test('A fight between a Snake and a Mouse should result in the Snake winning', () => {
    const snake = spawnAnimal('snake');
    const mouse = spawnAnimal('mouse');
    const pairing = {
        animal1: snake,
        animal2: mouse,
    };
    expect(fight(pairing)).toHaveLength(1);
});

test('A fight between a Dog and a Cat should result in the encounter function being called again', () => {
    const dog = spawnAnimal('dog');
    const cat = spawnAnimal('cat');
    const pairing = {
        animal1: dog,
        animal2: cat,
    };
    const newpairing = {
        animal1: cat,
        animal2: dog,
    };
    expect(fight(pairing)).toBeCalled;
    expect(encounter(newpairing)).toBeCalled;
});
