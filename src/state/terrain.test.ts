import { createTerrain, positionCache, Terrain, Tile } from './terrain';

test('Should find all positions and cache them', () => {
    const terrain: Terrain = createTerrain();
    terrain.generate(3, 3);
    const currentTile: Tile = [1, 1];
    positionCache.set(
        [1, 1],
        terrain
            .flat()
            .filter((tile) => tile.toString() !== currentTile.toString())
    );
    const expectedPositions = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
    ];
    expect(terrain.getNeighbours(currentTile)).toEqual(expectedPositions);
});
