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
                        if (
                            this.getAnimalsByPosition(animal.position)
                                .length === 2
                        ) {
                        } else {
                            const possiblePositions = terrain
                                .getNeighbours(animal.position!)
                                .map((position) => ({
                                    position,
                                    animals:
                                        this.getAnimalsByPosition(position),
                                }))
                                .filter(
                                    (position) => position.animals.length <= 2
                                );
                            const emptyTiles = possiblePositions
                                .filter(
                                    (position) => position.animals.length === 0
                                )
                                .map((empty) =>
                                    terrain
                                        .getNeighbours(empty.position)
                                        .filter(
                                            (neighbour) =>
                                                this.getAnimalsByPosition(
                                                    neighbour
                                                ).length === 1
                                        )
                                );
                            if (emptyTiles.length > 0) {
                                const compaitableAnimal =
                                    this.getAnimalsByPosition(
                                        emptyTiles.flat()[0]
                                    );
                                animal.position = emptyTiles.flat()[0];
                                compaitableAnimal[0].position =
                                    emptyTiles.flat()[0];
                            } else {
                                animal.position = possiblePositions.length
                                    ? shuffleArray(possiblePositions).sort(
                                          (a, b) =>
                                              a.animals.length -
                                              b.animals.length
                                      )[0].position
                                    : animal.position;
                            }
                            // Create EmptyTiles
                            // Check the neighbours of the emptyTiles
                            // Once we find an empty neighbour with one animal move both animals to that empty tile
                            //
                        }
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
