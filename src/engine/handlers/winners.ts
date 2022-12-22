import { GameEngineEvents } from '../gameEngine';

export type WinnerHandler = (winner: GameEngineEvents['winner']) => void;

export const winnerHandler: WinnerHandler = (winner) => {
    console.log(`${winner.kind} is the winner`);
};
