import { terrain } from '../dependencies';
import { shuffleArray } from '../lib';
import { Animal, Pairing, Position } from '../types';
import { Terrain, Tile } from './terrain';

export type Population = {
    setAnimals(animals: Animal[]): void;
    addAnimals(animals: Animal[]): void;
    getAnimals(): Animal[];
    moveAnimals(): void;
    getPopulationCount(): number;
    hasWinner(): boolean;
    getWinner(): Animal;
    getFighters(): Pairing;
    setTerrain(terrain: Terrain): void;
    getAnimalsByPosition(tile: Tile): Animal[];
    _terrain: Terrain | null;
    _animals: Animal[];
};

const terrainIsSet = (
    terrain: Terrain | null | undefined
): terrain is NonNullable<Terrain> => terrain !== null;

export const getTilePos = (numberOfTiles: number): number => {
    return Math.floor(Math.random() * numberOfTiles);
};

export const createPopulation = (): Population => {
    return {
        setAnimals(animals) {
            this._animals = animals;
            if (this._terrain) {
                let flatCells = this._terrain.flat();
                this._animals.map((animal) => {
                    animal.position = flatCells[getTilePos(flatCells.length)];
                });
            }
        },
        addAnimals(animals) {
            this._animals.push(...animals);
        },
        getAnimals() {
            return this._animals;
        },
        moveAnimals() {
            const terrain = this._terrain;
            if (terrainIsSet(terrain)) {
                this._animals.map((animal) => {
                    if (animal.position) {
                        const possiblePositions = terrain
                            .getNeighbours(animal.position!)
                            .filter(
                                (position) =>
                                    this.getAnimalsByPosition(position).length <
                                    2
                            );
                        animal.position = possiblePositions.length
                            ? shuffleArray(possiblePositions)[0]
                            : animal.position;
                    }
                });
            }
        },

        getPopulationCount() {
            return this._animals.length;
        },
        hasWinner() {
            return this.getPopulationCount() === 1;
        },
        getWinner() {
            if (!this.hasWinner()) {
                throw new Error(
                    `Competition is not over, ${this.getPopulationCount()} animals left`
                );
            }
            return this._animals[0];
        },
        getFighters() {
            this._animals = shuffleArray(this._animals);
            if (this.hasWinner()) {
                throw new Error(`Competition is already over`);
            }
            return {
                animal1: this._animals.pop()!,
                animal2: this._animals.pop()!,
            };
        },
        setTerrain(terrain) {
            this._terrain = terrain;
        },
        getAnimalsByPosition(tile) {
            return this._animals.filter(
                ({ position }) =>
                    JSON.stringify(position) === JSON.stringify(tile)
            );
        },
        _animals: [],
        _terrain: null,
    };
};
