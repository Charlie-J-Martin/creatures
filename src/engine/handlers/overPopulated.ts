import { GameEngineEvents } from '../gameEngine';

export type OverPopulatedHandler = (
    maxAnimals: GameEngineEvents['overPopulated']
) => void;

export const overPopulatedHandler: OverPopulatedHandler = (maxAnimals) => {
    console.log(`Population exceeds ${maxAnimals} `);
};
