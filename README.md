# Creatures - An evolution / battle simulator

Creatures is a fighting/evolution simulator. Using a simple tick engine created with the node event emitter, animals traverse a grid-based environment where they roam, breed and fight. 

Each animal is generated using a factory method which will randomly assign combat and health points between two bounds depending on the type of animal that is being created.

The simulation runs until either two conditions are reached:

1. There is only one animal left.
2. The population of an animal reaches over double the size of the environment.

Currently, the simulation is rendered within the command line.

# Key Concepts

- Game Engine
    - Created using the node event emitter, based on this idea of tick rates for how many times a second the simulation produces and processes data.
    - Handles game events and handlers for some of the events, so that when certain simulation-ending events occur the game engine knows how to handle and stop running.

- JavaScript Factories
    - Factory function for creating animal objects. Responsible for spawning multiple animals at once and also the different properties which make up animals.

- Dependency and State
    - The concept of state is used within this repo in regard to two aspects: the overall population and the environment terrain.
    - Both of these aspects have their own methods in relation to what they are required to do.
        - The population is responsible for controlling the population and includes methods to set initial starting positions for animals, moving the animals and getting the animals who are in the same grid space within the terrain.
        - Terrain is responsible for generating the terrain.

# Core Functions

- Breeding
    - Takes two of the same animals and will breed them depending on breed-ability percentage.
- Fighting
    - Takes two animals and will fight them against each other until a winner is reached.
- Rendering
    - Displays the grid environment within the command line.
    - Displays numerical data for the frequency of animals alive based on their types.
- Simulate
    - Simulates what happens per tick of the game engine.
- Encounter
    - Receives two animals within the same grid space and will decide whether an encounter will result in breeding as long as the two animals are the same type and the animals achieve the required breed rating. If breeding cannot be achieved a fight will break out between the two animals in question.
- Animals and their methods
    - Each animal type is created using a factory function. This factory function is responsible for giving the bounds to which combat points and health points are assigned. As well as, breed rating, attack method and type of animal.

Currently, there are 8 types of animals:
- dog
- cat
- bear
- tiger
- snake
- rabbit
- mouse
- rabbit

# How to run
1. Clone the repo
2. Run `npm install` - To install dependencies
3. Make any adjustments in the `main.ts` for the type and number of each animal that you would like to generate.
3. Run `npm run build` - To transpile the TypeScript to JavaScript
4. Run `npm run start` - To start the simulation
5. Watch who wins

