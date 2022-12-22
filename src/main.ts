import { simulate } from './simulate';
import { spawnAnimals } from './animalFactory';
import { population, terrain } from './dependencies';
import { render } from './render';

function start() {
    terrain.generate(25, 25);
    population.setTerrain(terrain);
    population.setAnimals([
        ...spawnAnimals('dog', 200),
        ...spawnAnimals('cat', 20),
        ...spawnAnimals('bear', 10),
        ...spawnAnimals('tiger', 10),
        ...spawnAnimals('snake', 10),
        ...spawnAnimals('rabbit', 10),
        ...spawnAnimals('mouse', 10),
        ...spawnAnimals('panda', 10),
    ]);
    simulate();
    render();
}

start();
