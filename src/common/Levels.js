
// This first set of levels is purely for testing purposes
// Modify freely and remove before launch
export default [
    {
        numQubits: 3,
        initialState: [[1], [0], [0], [0], [0], [0], [0], [0]], // |0>
        targetState: [[0], [1], [0], [0], [1], [0], [0], [0]], // |1>
        gates: ['X', 'CX'],
        minMoves: 1,
        maxMoves_2star: 3,
        tipHeading: 'The X Gate',
        tipText: 'The X gate (also called Bit Flip Gate) takes a qubit from state 0 to 1 and vice versa',
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },
    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },

    {
        numQubits: 1,
        initialState: [[1], [0]], // |0>
        targetState: [[0], [1]], // |1>
        gates: ['X'], // bit flip
    },

]


//Actual game Levels
// export default [
//     {
//         // level-1: 0 > 1
//         numQubits: 1,
//         initialState: [[1], [0]], // 0
//         targetState: [[0], [1]], // 1
//         gates: ['X'], // gates available for this level
//         minMoves: 1, // the number of moves for the ideal solution
//         maxMoves_2star: 3, // the maximum number of moves for which the player should be given 2 stars
//         tipHeading: 'The X Gate', // heading for the tip popup (optional)
//         tipText: 'The X gate (also called Bit Flip Gate) takes a qubit from state 0 to 1 and vice versa', // info text for the tip popup (optional)
//     },
//     {
//         // level-2: 1 > 0
//         numQubits: 1,
//         initialState: [[0], [1]], // 1
//         targetState: [[1], [0]], // 0
//         gates: ['X'],
//         minMoves: 1,
//         maxMoves_2star: 3,
//     },
//     {
//         // level-3: 1 > -1
//         numQubits: 1,
//         initialState: [[0], [1]],
//         targetState: [[0], [-1]],
//         gates: ['Z'],
//         minMoves: 1,
//         maxMoves_2star: 3,
//         tipHeading: 'The Z Gate',
//         tipText: 'Qubits also have a sign associated with a state, so state 1 is different from state -1. The Z gate takes a qubit from 1 to -1 and vice versa, but has no action on a 0 state'
//     },
//     {
//         // level-4: 0 > -1
//         numQubits: 1,
//         initialState: [[1], [0]],
//         targetState: [[0], [-1]],
//         gates: ['X', 'Z'],
//         minMoves: 2,
//         maxMoves_2star: 3,
//     },
//     {
//         // level-5: 0 > 0 + 1
//         numQubits: 1,
//         initialState: [[1], [0]],
//         targetState: [[1], [1]],
//         gates: ['H'],
//         minMoves: 1,
//         maxMoves_2star: 3,
//         tipHeading: 'The H Gate',
//         tipText: 'A superposition is when a qubit is both 0 and 1 at the same time! A superposition is represented by a + or - sign. The H gate takes a qubit from state 0 to state (0 + 1) and vice versa',
//     },
//     {
//         // level-6: 1 > 0 - 1
//         numQubits: 1,
//         initialState: [[0], [1]],
//         targetState: [[1], [-1]],
//         gates: ['H'],
//         minMoves: 2,
//         maxMoves_2star: 3,
//         tipHeading: 'The H Gate',
//         tipText: 'The H gate also takes a state 1 to a state (0 - 1) and vice versa',
//     },
//     {
//         // level-7: 0 > 0 - 1
//         numQubits: 1,
//         initialState: [[1], [0]],
//         targetState: [[1], [-1]],
//         gates: ['X', 'Z', 'H'],
//         minMoves: 2,
//         maxMoves_2star: 3,
//     },
//     {
//         // level-8: 1 > 0 + 1
//         numQubits: 1,
//         initialState: [[0], [1]],
//         targetState: [[1], [1]],
//         gates: ['Z', 'H'],
//         minMoves: 2,
//         maxMoves_2star: 3,
//         tipHeading: 'No X Gate',
//         tipText: 'Not all gates are available in each level. Try this one without an X gate'
//     },
//     {
//         // level-9: 01 > 10
//         numQubits: 2,
//         initialState: [[0], [1], [0], [0]],
//         targetState: [[0], [0], [1], [0]],
//         gates: ['X', 'Z', 'H'],
//         minMoves: 2,
//         maxMoves_2star: 3,
//         tipHeading: '2-Qubits',
//         tipText: 'When working with multiple qubits, remember that the topmost qubit is written as the leftmost digit in the state'
//     },
// ]