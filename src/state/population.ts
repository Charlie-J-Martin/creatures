import { terrain } from '../dependencies';
import { shuffleArray } from '../lib';
import { Animal, Pairing, Position, PossiblePosition } from '../types';
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
    getPossiblePositions(animal: Animal, terrain: Terrain): PossiblePosition[];
    getMatches(
        animal: Animal,
        possiblePositions: PossiblePosition[]
    ): PossiblePosition[];
    getNewPosition(animal: Animal, finalPositions: PossiblePosition[]): Tile;
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
        getPossiblePositions(animal, terrain) {
            return (
                terrain
                    // Get a potential 8 other positions
                    .getNeighbouringTiles(animal.position!)
                    // for every position map through each one and return a new object of tile and the animals within those positions
                    .map((tile) => ({
                        animals: this.getAnimalsByPosition(tile),
                        tile,
                    }))
                    .filter((position) => position.animals.length < 2)
            );
        },
        getMatches(animal, possiblePositions) {
            return possiblePositions
                .map((tile) => {
                    return {
                        tile: tile.tile,
                        animals: tile.animals.filter((neighbour) =>
                            animal.attractedTo.includes(neighbour.kind)
                        ),
                    };
                })
                .filter((tile) => tile.animals.length > 0);
        },
        getNewPosition(animal, finalPositions) {
            return (
                shuffleArray(finalPositions).sort((a, b) =>
                    animal.isHunter
                        ? b.animals.length - a.animals.length
                        : a.animals.length - b.animals.length
                )[0].tile ?? animal.position
            );
        },

        moveAnimals() {
            const terrain = this._terrain;
            if (terrainIsSet(terrain)) {
                this._animals.map((animal) => (animal.isUnderAttack = false));

                this._animals.map((animal) => {
                    if (animal.position && !animal.isUnderAttack) {
                        const possiblePositions = this.getPossiblePositions(
                            animal,
                            terrain
                        );
                        if (possiblePositions.length === 0) {
                            animal.position = animal.position;
                        } else {
                            const matches = this.getMatches(
                                animal,
                                possiblePositions
                            );

                            const finalPositions = matches.length
                                ? matches
                                : possiblePositions;

                            animal.position = this.getNewPosition(
                                animal,
                                finalPositions
                            );
                        }
                        this.getAnimalsByPosition(animal.position!).map(
                            (animal) => (animal.isUnderAttack = true)
                        );
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
            return this._animals.filter(({ position }) =>
                position
                    ? position[0] === tile[0] && position[1] === tile[1]
                    : false
            );
        },
        _animals: [],
        _terrain: null,
    };
};
