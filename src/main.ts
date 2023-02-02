import { simulate } from './simulate';
import { spawnAnimals } from './animalFactory';
import { population, terrain } from './dependencies';
import { render } from './render';

function start() {
    terrain.generate(10, 10);
    population.setTerrain(terrain);
    population.setAnimals([
        ...spawnAnimals('dog', 10),
        ...spawnAnimals('cat', 10),
        ...spawnAnimals('bear', 20),
        ...spawnAnimals('tiger', 20),
        ...spawnAnimals('snake', 5),
        ...spawnAnimals('rabbit', 10),
        ...spawnAnimals('mouse', 10),
        ...spawnAnimals('panda', 10),
    ]);
    simulate();
    render();
}

start();
