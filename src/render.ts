import { gameEngine, population, terrain } from './dependencies';
import { Animal, AnimalPopulation, AnimalType } from './types';
import { Row } from './state/terrain';

// TODO: Change to render - We'll want to print to a whole grid
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
        // console.table(terrain.tiles);

        return counts;
    };
    return countUnique(animalsKind);
};

export const printTerrain = (terrain: Row[]) => {
    // console.table(terrain);
};

export const render = () => {
    gameEngine.on('tick', () => {
        printTerrain(terrain.tiles);
        calculatePopulation(population.getAnimals());
    });
};
