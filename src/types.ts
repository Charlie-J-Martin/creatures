export type AnimalType =
    | 'dog'
    | 'cat'
    | 'bear'
    | 'tiger'
    | 'snake'
    | 'rabbit'
    | 'mouse'
    | 'panda';

export enum AttackMethods {
    BITE = 'bite',
    CLAW = 'claw',
    HUG = 'hug',
    LUNGE = 'lunge',
    VENOMOUS_BITE = 'venomous bite',
    NIBBLE = 'nibble',
    NIP = 'nip',
}

export type Animal = {
    kind: AnimalType;
    cp: number;
    hp: number;
    attackMethod: AttackMethods;
    isAlive: boolean;
    breedability: number;
    position?: Position;
    isUnderAttack: boolean;
    isHunter: boolean;
    attractedTo: AnimalType[];
};

export type Winner = Animal;

export type Pairing = {
    animal1: Animal;
    animal2: Animal;
};

export type Family = Pairing & { animal3: Animal };

export type AnimalPopulation = {
    [key in AnimalType]?: number;
};

export type Position = [number, number];
