import { population, gameEngine } from './dependencies';
import { encounter } from './encounter';

const maxAnimals: number = 100 * 100 * 2;

const stopSimulation = () => {
    gameEngine.emit('stop');
    gameEngine.emit('exit');
};

export const simulate = () => {
    gameEngine.on('tick', () => {
        if (population.hasWinner()) {
            gameEngine.emit('winner', population.getWinner());
            stopSimulation();
        }

        if (population.getPopulationCount() > maxAnimals) {
            gameEngine.emit('overPopulated', maxAnimals);
            stopSimulation();
        }
        population._animals.map(() => population.moveAnimals());
        population._terrain?.flat().map((tile) => {
            if (population.getAnimalsByPosition(tile).length > 1) {
                population.addAnimals(encounter(population.getFighters()));
            }
        });
    });
};
