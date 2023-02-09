import { AnimalType } from './types';
import { AttackMethods } from './types';
import { Animal } from './types';
import { randomRange } from './lib';

export const spawnAnimals = (type: AnimalType, quantity: number): Animal[] => {
    return [...new Array(quantity)].map((_identity) => spawnAnimal(type));
};

export const spawnAnimal = (type: AnimalType): Animal => {
    const isUnderAttack = false;
    switch (type) {
        case 'cat':
            return {
                kind: type,
                cp: randomRange(5, 10),
                hp: randomRange(180, 220),
                attackMethod: AttackMethods.CLAW,
                isAlive: true,
                breedability: 0.3,
                isUnderAttack,
                isHunter: true,
            };
        case 'dog':
            return {
                kind: type,
                cp: randomRange(15, 30),
                hp: randomRange(70, 120),
                attackMethod: AttackMethods.BITE,
                isAlive: true,
                breedability: 0.2,
                isUnderAttack,
                isHunter: true,
            };
        case 'bear':
            return {
                kind: type,
                cp: randomRange(20, 35),
                hp: randomRange(90, 150),
                attackMethod: AttackMethods.HUG,
                isAlive: true,
                breedability: 0.05,
                isUnderAttack,
                isHunter: true,
            };
        case 'tiger':
            return {
                kind: type,
                cp: randomRange(30, 50),
                hp: randomRange(80, 120),
                attackMethod: AttackMethods.LUNGE,
                isAlive: true,
                breedability: 0.05,
                isUnderAttack,
                isHunter: true,
            };
        case 'snake':
            return {
                kind: type,
                cp: randomRange(45, 60),
                hp: randomRange(50, 80),
                attackMethod: AttackMethods.VENOMOUS_BITE,
                isAlive: true,
                breedability: 0.1,
                isUnderAttack,
                isHunter: true,
            };
        case 'rabbit':
            return {
                kind: type,
                cp: randomRange(3, 8),
                hp: randomRange(10, 20),
                attackMethod: AttackMethods.NIBBLE,
                isAlive: true,
                breedability: 0.5,
                isUnderAttack,
                isHunter: false,
            };
        case 'mouse':
            return {
                kind: type,
                cp: randomRange(1, 5),
                hp: randomRange(5, 10),
                attackMethod: AttackMethods.NIP,
                isAlive: true,
                breedability: 1,
                isUnderAttack,
                isHunter: false,
            };
        case 'panda':
            return {
                kind: type,
                cp: randomRange(40, 50),
                hp: randomRange(200, 450),
                attackMethod: AttackMethods.BITE,
                isAlive: true,
                breedability: 0,
                isUnderAttack,
                isHunter: false,
            };
        default:
            ((type: never) => {
                throw new Error(`Invalid animal: ${type}`);
            })(type);
    }
};
