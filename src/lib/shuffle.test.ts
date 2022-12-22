import { shuffleArray } from './shuffle';

test('Should shuffle an array into a different order', () => {
    expect(shuffleArray(['Bear', 'Cat', 'Dog', 'Snake', 'Tiger'])).not.toBe([
        'Bear',
        'Cat',
        'Dog',
        'Snake',
        'Tiger',
    ]);
});
