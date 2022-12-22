import { EventEmitter } from 'events';
import { Animal } from '../types';
import { OverPopulatedHandler, WinnerHandler } from './handlers';

interface StringKeyedObject {
    [key: string]: any;
}

export type GameEngineEvents = {
    tick: number;
    winner: Animal;
    overPopulated: number;
    stop: void;
    startEncounter: Animal[];
    exit: void;
};

export type GameEngineHandlers = {
    overPopulated: OverPopulatedHandler;
    winner: WinnerHandler;
};

// https://nodejs.dev/learn/the-nodejs-event-emitter
// 'emit' is used to trigger an event.
// 'on' is used to add a callback function that's going to be executed when the event is triggered.
// K is the Event and v is the argument.
export interface GameEngine<C extends StringKeyedObject> extends EventEmitter {
    emit<K extends Extract<keyof C, string>>(k: K, v?: C[K]): boolean;
    on<K extends Extract<keyof C, string>>(k: K, f: (v?: C[K]) => void): this;
}

export const createGameEngine = (
    milliseconds: number = 0,
    handlers: GameEngineHandlers
): GameEngine<GameEngineEvents> => {
    let tickCount = 0;
    const gameEngine = new EventEmitter();
    const interval = setInterval(() => {
        tickCount++;
        gameEngine.emit('tick', tickCount);
    }, milliseconds);

    gameEngine.on('stop', () => clearInterval(interval));
    gameEngine.on('exit', () => process.exit(0));
    gameEngine.on('winner', handlers.winner);
    gameEngine.on('overPopulated', handlers.overPopulated);
    return gameEngine;
};
