import { gameEngine, population, terrain } from './dependencies';
import { Animal, AnimalPopulation, AnimalType } from './types';
import { Row } from './state/terrain';
import { Population } from './state/population';
import Table from 'tty-table';

export const calculatePopulation = (animals: Animal[]) => {
    const animalsKind: AnimalType[] = [];

    for (let animal of animals) {
        animalsKind.push(animal.kind);
    }
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
    const countUnique = (animalsKind: AnimalType[]) => {
        animalsKind.sort();
        let counts: AnimalPopulation = {};
        for (let i = 0; i < animalsKind.length; i++) {
            counts[animalsKind[i]] = 1 + (counts[animalsKind[i]] || 0);
        }
        process.stdout.write(JSON.stringify(counts) + '');
        return counts;
    };
    return countUnique(animalsKind);
};

const animalEmojis: Record<AnimalType, string> = {
    dog: '🐶',
    cat: '😺',
    bear: '🐻',
    tiger: '🦁',
    snake: '🐍',
    rabbit: '🐰',
    mouse: '🐭',
    panda: '🐼',
};

export const printTerrain = (terrain: Row[], population: Population) => {
    const mappedAnimals = terrain.map((row) => {
        return row.map((tile) => {
            const entries = population
                .getAnimalsByPosition(tile)
                .map((animal) => animalEmojis[animal.kind]);
            for (let i = 0; i <= 2 - entries.length; i++) {
                entries.push('        ');
            }
            return entries;
        });
    });

    const display = Table(mappedAnimals);
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0, 0);
    process.stdout.write(display.render());
    process.stdout.write(`\n`);
};

export const render = () => {
    gameEngine.on('tick', () => {
        printTerrain(terrain.tiles, population);
        // TODO: - Not sure whether to refactor the below code into the table
        // calculatePopulation(population.getAnimals());
    });
};
