import { spawnAnimal, spawnAnimals } from './animalFactory';

describe('Animal type cat', () => {
    const animal = spawnAnimal('cat');

    test('Should spawn animal type cat', () => {
        expect(animal.kind).toBe('cat');
        expect(animal.attackMethod).toBe('claw');
        expect(animal.isAlive).toBe(true);
    });

    test('Should spawn an animal of type cat with a random amount of cp between 5 and 10', () => {
        expect(animal.cp).toBeGreaterThanOrEqual(5);
        expect(animal.cp).toBeLessThanOrEqual(10);
    });

    test('Should spawn an animal of type cat with a random amount of hp between 180 and 220', () => {
        expect(animal.hp).toBeGreaterThanOrEqual(180);
        expect(animal.hp).toBeLessThanOrEqual(220);
    });
});

describe('Animal type dog', () => {
    const animal = spawnAnimal('dog');

    test('Should spawn animal dog', () => {
        expect(animal.kind).toBe('dog');
        expect(animal.attackMethod).toBe('bite');
        expect(animal.isAlive).toBe(true);
    });

    test('Should spawn an animal of type dog with a random amount of cp between 15 and 30', () => {
        expect(animal.cp).toBeGreaterThanOrEqual(15);
        expect(animal.cp).toBeLessThanOrEqual(30);
    });

    test('Should spawn an animal of type dog with a random amount of hp between 70 and 120', () => {
        expect(animal.hp).toBeGreaterThanOrEqual(70);
        expect(animal.hp).toBeLessThanOrEqual(120);
    });
});

describe('Animal type bear', () => {
    const animal = spawnAnimal('bear');

    test('Should spawn animal bear', () => {
        expect(animal.kind).toBe('bear');
        expect(animal.attackMethod).toBe('hug');
        expect(animal.isAlive).toBe(true);
    });

    test('Should spawn an animal of type bear with a random amount of cp between 20 and 35', () => {
        expect(animal.cp).toBeGreaterThanOrEqual(20);
        expect(animal.cp).toBeLessThanOrEqual(35);
    });

    test('Should spawn an animal of type bear with a random amount of hp between 90 and 150', () => {
        expect(animal.hp).toBeGreaterThanOrEqual(90);
        expect(animal.hp).toBeLessThanOrEqual(150);
    });
});

describe('Animal type tiger', () => {
    const animal = spawnAnimal('tiger');

    test('Should spawn animal tiger', () => {
        expect(animal.kind).toBe('tiger');
        expect(animal.attackMethod).toBe('lunge');
        expect(animal.isAlive).toBe(true);
    });

    test('Should spawn an animal of type tiger with a random amount of cp between 30 and 50', () => {
        expect(animal.cp).toBeGreaterThanOrEqual(30);
        expect(animal.cp).toBeLessThanOrEqual(50);
    });

    test('Should spawn an animal of type tiger with a random amount of hp between 80 and 120', () => {
        expect(animal.hp).toBeGreaterThanOrEqual(80);
        expect(animal.hp).toBeLessThanOrEqual(120);
    });
});

describe('Animal type snake', () => {
    const animal = spawnAnimal('snake');

    test('Should spawn animal snake', () => {
        expect(animal.kind).toBe('snake');
        expect(animal.attackMethod).toBe('venomous bite');
        expect(animal.isAlive).toBe(true);
    });

    test('Should spawn an animal of type snake with a random amount of cp between 45 and 60', () => {
        expect(animal.cp).toBeGreaterThanOrEqual(45);
        expect(animal.cp).toBeLessThanOrEqual(60);
    });

    test('Should spawn an animal of type snake with a random amount of hp between 50 and 80', () => {
        expect(animal.hp).toBeGreaterThanOrEqual(50);
        expect(animal.hp).toBeLessThanOrEqual(80);
    });
});

describe('Animal type rabbit', () => {
    const animal = spawnAnimal('rabbit');

    test('Should spawn animal rabbit', () => {
        expect(animal.kind).toBe('rabbit');
        expect(animal.attackMethod).toBe('nibble');
        expect(animal.isAlive).toBe(true);
    });

    test('Should spawn an animal of type rabbit with a random amount of cp between 3 and 8', () => {
        expect(animal.cp).toBeGreaterThanOrEqual(3);
        expect(animal.cp).toBeLessThanOrEqual(8);
    });

    test('Should spawn an animal of type rabbit with a random amount of hp between 10 and 20', () => {
        expect(animal.hp).toBeGreaterThanOrEqual(10);
        expect(animal.hp).toBeLessThanOrEqual(20);
    });
});

describe('Animal type mouse', () => {
    const animal = spawnAnimal('mouse');

    test('Should spawn animal mouse', () => {
        expect(animal.kind).toBe('mouse');
        expect(animal.attackMethod).toBe('nip');
        expect(animal.isAlive).toBe(true);
    });

    test('Should spawn an animal of type mouse with a random amount of cp between 1 and 5', () => {
        expect(animal.cp).toBeGreaterThanOrEqual(1);
        expect(animal.cp).toBeLessThanOrEqual(5);
    });

    test('Should spawn an animal of type mouse with a random amount of hp between 5 and 10', () => {
        expect(animal.hp).toBeGreaterThanOrEqual(5);
        expect(animal.hp).toBeLessThanOrEqual(10);
    });
});

describe('Animal type panda', () => {
    const animal = spawnAnimal('panda');

    test('Should spawn animal panda', () => {
        expect(animal.kind).toBe('panda');
        expect(animal.attackMethod).toBe('bite');
        expect(animal.isAlive).toBe(true);
    });

    test('Should spawn an animal of type panda with a random amount of cp between 40 and 50', () => {
        expect(animal.cp).toBeGreaterThanOrEqual(40);
        expect(animal.cp).toBeLessThanOrEqual(50);
    });

    test('Should spawn an animal of type panda with a random amount of hp between 200 and 450', () => {
        expect(animal.hp).toBeGreaterThanOrEqual(200);
        expect(animal.hp).toBeLessThanOrEqual(450);
    });
});

describe('Spawn multiple animals', () => {
    test('creates two mice', () => {
        const mice = spawnAnimals('mouse', 2);
        expect(mice.length).toBe(2);
        mice.forEach((mouse) => {
            expect(mouse.kind).toBe('mouse');
        });
    });
});
