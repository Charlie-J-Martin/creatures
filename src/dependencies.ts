import { createGameEngine } from './engine/gameEngine';
import { overPopulatedHandler, winnerHandler } from './engine/handlers';
import { createPopulation } from './state/population';
import { createTerrain } from './state/terrain';

export const terrain = createTerrain();
export const population = createPopulation();
export const gameEngine = createGameEngine(250, {
    overPopulated: overPopulatedHandler,
    winner: winnerHandler,
});
