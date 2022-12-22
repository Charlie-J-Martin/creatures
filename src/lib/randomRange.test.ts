import { randomRange } from './randomRange';

test('Should pick a random number between 5 and 10', () => {
    const result = randomRange(5, 10);
    expect(result).toBeGreaterThanOrEqual(5);
    expect(result).toBeLessThanOrEqual(10);
});
