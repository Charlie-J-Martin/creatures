export type Tile = [number, number];
export type Row = Tile[];
type PositionCache = {
    set: (position: Tile, availablePositions: Tile[]) => void;
    get: (position: Tile) => Tile[] | null;
    _cache: Record<string, Tile[]>;
};
export type Terrain = {
    tiles: Row[];
    generate: (width: number, height: number) => void;
    flat: () => Tile[];
    getNeighbours: (tile: Tile) => Tile[];
};

export const boundaries = {
    height: 10,
    width: 10,
};

export const positionCache: PositionCache = {
    _cache: {},
    set(position: Tile, availablePositions: Tile[]) {
        this._cache[position.toString()] = availablePositions;
    },
    get(position: Tile) {
        return this._cache[position.toString()] ?? null;
    },
};

export const createTerrain = (): Terrain => {
    return {
        tiles: [],
        generate(width, height) {
            const rows: Row[] = [];
            let cells: Tile[] = [];
            for (let i = 0; i < height; i++) {
                cells = [];
                for (let j = 0; j < width; j++) {
                    cells.push([i, j]);
                }
                rows.push(cells);
            }
            this.tiles = rows;
        },
        flat() {
            return this.tiles.flat();
        },
        getNeighbours(tile: Tile) {
            const cached = positionCache.get(tile);
            if (cached) {
                return cached;
            }
            const positions: Tile[] = [];
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    positions.push([tile[0] + i, tile[1] + j]);
                }
            }
            const allTiles = this.flat();
            const possibleNeighbours = positions
                .filter((entry) => entry.toString() !== tile.toString())
                .filter((position) => {
                    for (const tile of allTiles) {
                        return tile.toString() === position.toString();
                    }
                });

            positionCache.set(tile, possibleNeighbours);
            return possibleNeighbours;
        },
    };
};
