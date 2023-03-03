import { createPopulation, getTilePos } from './population';
import { spawnAnimal, spawnAnimals } from '../animalFactory';
import { createTerrain } from './terrain';
import { PossiblePosition } from '../types';

test('Should get a random index position', () => {
    expect(getTilePos(25)).toBeGreaterThanOrEqual(0);
    expect(getTilePos(25)).toBeLessThanOrEqual(25);
});

describe('Create population', () => {
    test('set animals', () => {
        const population = createPopulation();
        const animals = spawnAnimals('cat', 1);
        const terrain = createTerrain();
        terrain.generate(5, 5);
        population.setTerrain(terrain);
        population.setAnimals(animals);
        expect(animals[0].position).toBeDefined();
    });

    test('add animals', () => {
        const population = createPopulation();
        population._animals = [...spawnAnimals('cat', 2)];
        const additionalAnimals = spawnAnimals('dog', 2);
        population.addAnimals(additionalAnimals);
        expect(population._animals).toHaveLength(4);
    });

    test('get animals', () => {
        const population = createPopulation();
        population._animals = [...spawnAnimals('cat', 5)];
        expect(population.getAnimals()).toHaveLength(5);
    });

    test('move animals', () => {
        const population = createPopulation();
        population._animals = spawnAnimals('cat', 1);
        const terrain = createTerrain();
        terrain.generate(2, 2);
        population.setTerrain(terrain);
        population._animals[0].position = [1, 1];
        population.moveAnimals();
        expect(population._animals[0].position).not.toEqual([1, 1]);
    });

    test('get population count', () => {
        const population = createPopulation();
        population._animals = [...spawnAnimals('cat', 5)];
        expect(population.getPopulationCount()).toBe(5);
    });

    test('has winner', () => {
        const population = createPopulation();
        population._animals = [...spawnAnimals('cat', 1)];
        expect(population.hasWinner()).toBeTruthy;
    });

    test('get winner', () => {
        const population = createPopulation();
        population._animals = [...spawnAnimals('cat', 1)];
        population.hasWinner();
        expect(population.getWinner()).toBe(population._animals[0]);
    });

    test('get fighters', () => {
        const population = createPopulation();
        population._animals = [...spawnAnimals('cat', 2)];
        const fighters = population.getFighters();
        expect(Object.keys(fighters)).toHaveLength(2);
        expect(population._animals).toHaveLength(0);
    });

    test('set terrain', () => {
        const terrain = createTerrain();
        terrain.generate(1, 1);
        const population = createPopulation();
        population.setTerrain(terrain);
        expect(population._terrain).toEqual(terrain);
    });

    test('get animals by position', () => {
        const population = createPopulation();
        const cat1 = spawnAnimal('cat');
        const cat2 = spawnAnimal('cat');
        cat1.position = [1, 1];
        cat2.position = [1, 1];
        population._animals = [cat1, cat2];
        expect(population.getAnimalsByPosition([1, 1])).toEqual([cat1, cat2]);
    });
    test('getPossiblePositions', () => {
        const terrain = createTerrain();
        const population = createPopulation();
        terrain.generate(3, 3);
        population.setTerrain(terrain);
        const cat1 = spawnAnimal('cat');
        cat1.position = [1, 1];
        population._animals = [cat1];
        expect(
            population.getPossiblePositions(cat1, population._terrain!)
        ).toEqual([
            { animals: [], tile: [0, 0] },
            { animals: [], tile: [0, 1] },
            { animals: [], tile: [1, 0] },
        ]);
    });

    test('getMatches', () => {
        const population = createPopulation();
        const cat1 = spawnAnimal('cat');
        cat1.position = [1, 1];
        const cat2 = spawnAnimal('cat');
        cat2.position = [2, 2];
        const possiblePositions: PossiblePosition[] = [
            { animals: [], tile: [0, 0] },
            { animals: [], tile: [0, 1] },
            { animals: [], tile: [0, 2] },
            { animals: [], tile: [1, 0] },
            { animals: [], tile: [1, 2] },
            { animals: [], tile: [2, 0] },
            { animals: [], tile: [2, 1] },
            { animals: [cat2], tile: [2, 2] },
        ];
        expect(population.getMatches(cat1, possiblePositions)).toEqual([
            { animals: [cat2], tile: [2, 2] },
        ]);
    });

    test('getNewPosition', () => {
        const population = createPopulation();
        const cat1 = spawnAnimal('cat');
        cat1.position = [1, 1];
        const cat2 = spawnAnimal('cat');
        cat2.position = [2, 2];
        const finalPositions: PossiblePosition[] = [
            { animals: [cat2], tile: [2, 2] },
        ];
        expect(population.getMatches(cat1, finalPositions)).toEqual([
            {
                animals: [cat2],
                tile: [2, 2],
            },
        ]);
    });
});
