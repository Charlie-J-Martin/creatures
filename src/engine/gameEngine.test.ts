import { createGameEngine } from './gameEngine';
import { WinnerHandler, OverPopulatedHandler } from './handlers';
import { spawnAnimal } from '../animalFactory';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe('tests', () => {
    let gameEngine: any;
    const winnerHandler: WinnerHandler = jest.fn();
    const overPopulatedHandler: OverPopulatedHandler = jest.fn();

    beforeEach(() => {
        gameEngine = createGameEngine(1, {
            overPopulated: overPopulatedHandler,
            winner: winnerHandler,
        });
    });

    afterEach(() => {
        gameEngine.emit('stop');
    });

    test('Game stop is called', async () => {
        gameEngine.emit('stop');
        let hasTicked = false;
        gameEngine.on('tick', () => {
            hasTicked = true;
        });
        await sleep(5);
        expect(hasTicked).toBe(false);
    });

    test('Game is stopped when winner is annouced', () => {
        const animal = spawnAnimal('cat');
        gameEngine.emit('winner', animal);
        expect(winnerHandler).toHaveBeenCalledWith(animal);
    });

    test('Game is stopped when population becomes overpopulated', () => {
        const maxAnimals = 20001;
        gameEngine.emit('overPopulated', maxAnimals);
        expect(overPopulatedHandler).toHaveBeenCalledWith(maxAnimals);
    });

    test('Game engine runs as expected', async () => {
        let hasTicked = false;
        gameEngine.on('tick', () => {
            hasTicked = true;
        });
        await sleep(5);
        expect(hasTicked).toBe(true);
    });
});
