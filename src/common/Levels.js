//Actual game Levels
export default [
    {
        // level-1: 0 > 1
        numQubits: 1,
        initialState: [[1], [0]], // 0
        targetState: [[0], [1]], // 1
        gates: ['X'], // gates available for this level
        minMoves: 1, // the number of moves for the ideal solution
        maxMoves_2star: 3, // the maximum number of moves for which the player should be given 2 stars
        tipHeading: 'The X Gate', // heading for the tip popup (optional)
        tipText: 'The X gate (also called Bit Flip Gate) takes a qubit from state 0 to 1 and vice versa.', // info text for the tip popup (optional)
    },
    {
        // level-2: 1 > 0
        numQubits: 1,
        initialState: [[0], [1]], // 1
        targetState: [[1], [0]], // 0
        gates: ['X'],
        minMoves: 1,
        maxMoves_2star: 3,
    },
    {
        // level-3: 1 > -1
        numQubits: 1,
        initialState: [[0], [1]],
        targetState: [[0], [-1]],
        gates: ['Z'],
        minMoves: 1,
        maxMoves_2star: 3,
        tipHeading: 'The Z Gate',
        tipText: 'Qubits also have a sign associated with a state, so state 1 is different from state -1. The Z gate takes a qubit from 1 to -1 and vice versa, but has no action on a 0 state.'
    },
    {
        // level-4: 0 > -1
        numQubits: 1,
        initialState: [[1], [0]],
        targetState: [[0], [-1]],
        gates: ['X', 'Z'],
        minMoves: 2,
        maxMoves_2star: 3,
    },
    {
        // level-5: 0 > -0
        numQubits: 1,
        initialState: [[1], [0]],
        targetState: [[-1], [0]],
        gates: ['X', 'Z'],
        minMoves: 3,
        maxMoves_2star: 4,
        tipHeading: 'Minus Zero!',
        tipText: 'Since qubits have a sign associated with states, -0 is different from 0!',
    },
    {
        // level-6: 0 > 0 + 1
        numQubits: 1,
        initialState: [[1], [0]],
        targetState: [[1], [1]],
        gates: ['H'],
        minMoves: 1,
        maxMoves_2star: 3,
        tipHeading: 'The H Gate',
        tipText: 'A superposition is when a qubit is both 0 and 1 at the same time! A superposition is represented by a + or - sign. The H gate takes a qubit from state 0 to state (0 + 1) and vice versa.',
    },
    {
        // level-7: 1 > 0 - 1
        numQubits: 1,
        initialState: [[0], [1]],
        targetState: [[1], [-1]],
        gates: ['H'],
        minMoves: 2,
        maxMoves_2star: 3,
        tipHeading: 'The H Gate',
        tipText: 'The H gate also takes a state 1 to a state (0 - 1) and vice versa.',
    },
    {
        // level-8: 0 > 0 - 1
        numQubits: 1,
        initialState: [[1], [0]],
        targetState: [[1], [-1]],
        gates: ['X', 'Z', 'H'],
        minMoves: 2,
        maxMoves_2star: 3,
    },
    {
        // level-9: 0 - 1 > -0 + 1
        numQubits: 1,
        initialState: [[1], [-1]],
        targetState: [[-1], [1]],
        gates: ['X', 'Z', 'H'],
        minMoves: 1,
        maxMoves_2star: 3,
        tipHeading: 'Operation on Superposition',
        tipText: 'An operation acts separately on each term separated by a + or - sign.',
    },
    {
        // level-10: 1 > 0 + 1
        numQubits: 1,
        initialState: [[0], [1]],
        targetState: [[1], [1]],
        gates: ['Z', 'H'],
        minMoves: 2,
        maxMoves_2star: 3,
        tipHeading: 'No X Gate',
        tipText: 'Not all gates are available in each level. Try this one without an X gate.'
    },
    {
        // level-11: 01 > 10
        numQubits: 2,
        initialState: [[0], [1], [0], [0]],
        targetState: [[0], [0], [1], [0]],
        gates: ['X', 'Z', 'H'],
        minMoves: 2,
        maxMoves_2star: 3,
        tipHeading: '2-Qubits',
        tipText: 'When working with multiple qubits, remember that the topmost qubit is written as the leftmost digit in the state.'
    },
    {
        // level-12: 00 > 00 + 01
        numQubits: 2,
        initialState: [[1], [0], [0], [0]],
        targetState: [[1], [1], [0], [0]],
        gates: ['X', 'Z', 'H'],
        minMoves: 1,
        maxMoves_2star: 3,
    },
    {
        // level-13: 01 + 10 > 00 + 11
        numQubits: 2,
        initialState: [[0], [1], [1], [0]],
        targetState: [[1], [0], [0], [1]],
        gates: ['X', 'Z', 'H'],
        minMoves: 1,
        maxMoves_2star: 3,
        tipHeading: 'Reminder',
        tipText: 'A gate operates separately on each term separated by a + or - sign.',
    },
    {
        // level-14: 00 > 00 - 10
        numQubits: 2,
        initialState: [[1], [0], [0], [0]],
        targetState: [[1], [0], [-1], [0]],
        gates: ['X', 'Z', 'H'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-15: -01 > 11
        numQubits: 2,
        initialState: [[0], [-1], [0], [0]],
        targetState: [[0], [0], [0], [1]],
        gates: ['Z', 'H'],
        minMoves: 4,
        maxMoves_2star: 6,
    },
    {
        // level-16: 01 + 10 - 11 > 01 - 10 + 11
        numQubits: 2,
        initialState: [[0], [1], [1], [-1]],
        targetState: [[0], [1], [-1], [1]],
        gates: ['X', 'Z', 'H'],
        minMoves: 1,
        maxMoves_2star: 3,
    },
    {
        // level-17: 00 > 00 + 01 + 10 + 11
        numQubits: 2,
        initialState: [[1], [0], [0], [0]],
        targetState: [[1], [1], [1], [1]],
        gates: ['X', 'Z', 'H'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-18: 10 > 11
        numQubits: 2,
        initialState: [[0], [0], [1], [0]],
        targetState: [[0], [0], [0], [1]],
        gates: ['CX'],
        minMoves: 1,
        maxMoves_2star: 3,
        tipHeading: 'Controlled X',
        tipText: 'The CX gate (Controlled X) does an X operation on a target qubit only if the control qubit is in state 1.',
    },
    {
        // level-19: 00 > 00 + 11
        numQubits: 2,
        initialState: [[1], [0], [0], [0]],
        targetState: [[1], [0], [0], [1]],
        gates: ['X', 'Z', 'H', 'CX'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-20: 10 + 11 > 10 - 11
        numQubits: 2,
        initialState: [[0], [0], [1], [1]],
        targetState: [[0], [0], [1], [-1]],
        gates: ['CZ'],
        minMoves: 1,
        maxMoves_2star: 3,
        tipHeading: 'Controlled Z',
        tipText: 'Similar to the CX gate, the CZ gate does a Z operation on the target only if the control qubit is in state 1.',
    },
    {
        // level-21: 10 > 10 + 11
        numQubits: 2,
        initialState: [[0], [0], [1], [0]],
        targetState: [[0], [0], [1], [1]],
        gates: ['CH'],
        minMoves: 1,
        maxMoves_2star: 3,
        tipHeading: 'Controlled H',
        tipText: 'The controlled H gate does an H operation on the target if the control is in state 1.',
    },
    {
        // level-22: 01 > 01 - 11
        numQubits: 2,
        initialState: [[0], [1], [0], [0]],
        targetState: [[0], [1], [0], [-1]],
        gates: ['CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-23: 01 + 11 > 01 + 10 - 11
        numQubits: 2,
        initialState: [[0], [1], [0], [1]],
        targetState: [[0], [1], [1], [-1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 1,
        maxMoves_2star: 3,
    },
    {
        // level-24: 11 > -11
        numQubits: 2,
        initialState: [[0], [0], [0], [1]],
        targetState: [[0], [0], [0], [-1]],
        gates: ['CX', 'CH'],
        minMoves: 3,
        maxMoves_2star: 6,
    },
    {
        // level-25: 00 > 00 + 01 + 11
        numQubits: 2,
        initialState: [[1], [0], [0], [0]],
        targetState: [[1], [1], [0], [1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-26: 00 > 01 + 10
        numQubits: 2,
        initialState: [[1], [0], [0], [0]],
        targetState: [[0], [1], [1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 3,
        maxMoves_2star: 5,
    },
    {
        // level-27: 00 > 10 + 11
        numQubits: 2,
        initialState: [[1], [0], [0], [0]],
        targetState: [[0], [0], [1], [1]],
        gates: ['X', 'Z', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-28: 00 - 01 > 00 - 10
        numQubits: 2,
        initialState: [[1], [-1], [0], [0]],
        targetState: [[1], [0], [-1], [0]],
        gates: ['CX'],
        minMoves: 2,
        maxMoves_2star: 3,
    },
    {
        // level-29: 00 + 01 > 01 + 10 + 11
        numQubits: 2,
        initialState: [[1], [1], [0], [0]],
        targetState: [[0], [1], [1], [1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 5,
    },
    {
        // level-30: 00 + 10 + 11 > 00 - 01 + 10 - 11
        numQubits: 2,
        initialState: [[1], [0], [1], [1]],
        targetState: [[1], [-1], [1], [-1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 4,
        maxMoves_2star: 6,
    },
    {
        // level-31: 01 + 10 > 01 - 11
        numQubits: 2,
        initialState: [[0], [1], [1], [0]],
        targetState: [[0], [1], [0], [-1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 25,
        maxTime_2star: 40,
        tipHeading: 'Timed Level',
        tipText: 'Get to the target state before the time runs out! The number of stars you get also depends on the time taken and not the moves.',
    },
    {
        // level-32: 01 + 11 > 00 - 10
        numQubits: 2,
        initialState: [[0], [1], [0], [1]],
        targetState: [[1], [0], [-1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 15,
        maxTime_2star: 30,
    },
    {
        // level-33: 00 + 11 > 01 - 11
        numQubits: 2,
        initialState: [[1], [0], [0], [1]],
        targetState: [[0], [1], [0], [-1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 25,
        maxTime_2star: 45,
    },
    {
        // level-34: 01 + 11 > 10     
        numQubits: 2,
        initialState: [[0], [1], [0], [1]],
        targetState: [[0], [0], [1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 30,
        maxTime_2star: 45,
        // minMoves: 3,
        // maxMoves_2star: 2,
    },
    {
        // level-35: 00 + 11 > 01
        numQubits: 2,
        initialState: [[1], [0], [0], [1]],
        targetState: [[0], [1], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 25,
        maxTime_2star: 40,
        // minMoves: 3,
        // maxMoves_2star: 2,
    },
    {
        // level-36: 01  > 01 + 10 + 11
        numQubits: 2,
        initialState: [[0], [1], [0], [0]],
        targetState: [[0], [1], [1], [1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 20,
        maxTime_2star: 35,
    },
    {
        // level-37: 01 + 10 > 00 + 01 - 10 - 11
        numQubits: 2,
        initialState: [[0], [1], [1], [0]],
        targetState: [[1], [1], [-1], [-1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 25,
        maxTime_2star: 40,
    },
    {
        // level-38: 00 + 01 + 10 + 11 > 00 + 01 + 11
        numQubits: 2,
        initialState: [[1], [1], [1], [1]],
        targetState: [[0], [1], [1], [1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 30,
        maxTime_2star: 40,
    },
    {
        // level-39: 00 + 01 + 11 > 10
        numQubits: 2,
        initialState: [[0], [1], [0], [0]],
        targetState: [[0], [1], [1], [1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 25,
        maxTime_2star: 40,
    },
    {
        // level-40: 00 - 01 - 10 + 11 > 01 - 10
        numQubits: 2,
        initialState: [[1], [-1], [-1], [1]],
        targetState: [[0], [1], [-1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 20,
        maxTime_2star: 35,
    },
    {
        // level-41: 00 + 01 + 10 + 11 > 01 + 10      
        numQubits: 2,
        initialState: [[1], [1], [1], [1]],
        targetState: [[0], [1], [1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 30,
        maxTime_2star: 45,
    },
    {
        // level-42: 01 + 10 > - 11
        numQubits: 2,
        initialState: [[0], [1], [1], [0]],
        targetState: [[0], [0], [0], [-1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 30,
        maxTime_2star: 45,
    },
    {
        // level-43: 00 - 01 + 10 - 11 > 00 + 11
        numQubits: 2,
        initialState: [[1], [-1], [1], [-1]],
        targetState: [[1], [0], [0], [1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 20,
        maxTime_2star: 35,
    },
    {
        // level-44: 00 + 01 + 10 + 11 > 00 + 10 - 11
        numQubits: 2,
        initialState: [[1], [1], [1], [1]],
        targetState: [[1], [0], [1], [-1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 60,
        minTime: 35,
        maxTime_2star: 45,
    },
    {
        // level-45: 10 > 00 - 01 - 10
        numQubits: 2,
        initialState: [[0], [0], [1], [0]],
        targetState: [[1], [-1], [-1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        time: 90,
        minTime: 30,
        maxTime_2star: 45,
    },
    {
        // level-46: 001 > -011
        numQubits: 3,
        initialState: [[0], [1], [0], [0], [0], [0], [0], [0]],
        targetState: [[0], [0], [0], [-1], [0], [0], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-47: 000 > 010 + 110
        numQubits: 3,
        initialState: [[1], [0], [0], [0], [0], [0], [0], [0]],
        targetState: [[0], [0], [1], [0], [0], [0], [1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-48: 111 > -101 - 111
        numQubits: 3,
        initialState: [[0], [0], [0], [0], [0], [0], [0], [1]],
        targetState: [[0], [0], [0], [0], [0], [-1], [0], [-1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-49: 101 + 001 > 001
        numQubits: 3,
        initialState: [[0], [1], [0], [0], [0], [1], [0], [0]],
        targetState: [[0], [1], [0], [0], [0], [0], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 1,
        maxMoves_2star: 3,
    },
    {
        // level-50: 010 + 111 > 010
        numQubits: 3,
        initialState: [[0], [0], [1], [0], [0], [0], [0], [1]],
        targetState: [[0], [0], [1], [0], [0], [0], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-51: 101 > 011 - 111
        numQubits: 3,
        initialState: [[0], [0], [0], [0], [0], [1], [0], [0]],
        targetState: [[0], [0], [0], [1], [0], [0], [0], [-1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-52: 111 + 010 > -010
        numQubits: 3,
        initialState: [[0], [0], [1], [0], [0], [0], [0], [1]],
        targetState: [[0], [0], [-1], [0], [0], [0], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 3,
        maxMoves_2star: 5,
    },
    {
        // level-53: -111 + 101 > 011
        numQubits: 3,
        initialState: [[0], [0], [0], [0], [0], [1], [0], [-1]],
        targetState: [[0], [0], [0], [1], [0], [0], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-54: 000 + 111 > 000
        numQubits: 3,
        initialState: [[1], [0], [0], [0], [0], [0], [0], [1]],
        targetState: [[1], [0], [0], [0], [0], [0], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 3,
        maxMoves_2star: 5,
    },
    {
        // level-55: 010 + 101 > 110 + 011
        numQubits: 3,
        initialState: [[0], [0], [1], [0], [0], [1], [0], [0]],
        targetState: [[0], [0], [0], [1], [0], [0], [1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-56: 100 > 010 - 110
        numQubits: 3,
        initialState: [[0], [0], [0], [0], [1], [0], [0], [0]],
        targetState: [[0], [0], [1], [0], [0], [0], [-1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 3,
        maxMoves_2star: 5,
    },
    {
        // level-57: 010 - 111 > 011
        numQubits: 3,
        initialState: [[0], [0], [1], [0], [0], [0], [0], [-1]],
        targetState: [[0], [0], [0], [1], [0], [0], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-58: 101 + 011 > -101
        numQubits: 3,
        initialState: [[0], [0], [0], [1], [0], [1], [0], [0]],
        targetState: [[0], [0], [0], [0], [0], [-1], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 3,
        maxMoves_2star: 5,
    },
    {
        // level-59: 001 + 100 > 000 - 101
        numQubits: 3,
        initialState: [[0], [1], [0], [0], [1], [0], [0], [0]],
        targetState: [[1], [0], [0], [0], [0], [-1], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-60: 001 + 110 > 010 + 101
        numQubits: 3,
        initialState: [[0], [1], [0], [0], [0], [0], [1], [0]],
        targetState: [[0], [0], [1], [0], [0], [1], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 1,
        maxMoves_2star: 3,
    },
    {
        // level-61: 010 > 001 + 100
        numQubits: 3,
        initialState: [[0], [0], [1], [0], [0], [0], [0], [0]],
        targetState: [[0], [1], [0], [0], [1], [0], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 4,
        maxMoves_2star: 6,
    },
    {
        // level-62: 011 > 000 + 101
        numQubits: 3,
        initialState: [[0], [0], [0], [1], [0], [0], [0], [0]],
        targetState: [[1], [0], [0], [0], [0], [1], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 4,
        maxMoves_2star: 6,
    },
    {
        // level-63: 100 + 111 > 100 - 101 + 110
        numQubits: 3,
        initialState: [[0], [0], [0], [0], [1], [0], [0], [1]],
        targetState: [[0], [0], [0], [0], [1], [-1], [1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-64: 111 > 010 + 101
        numQubits: 3,
        initialState: [[0], [0], [0], [0], [0], [0], [0], [1]],
        targetState: [[0], [0], [1], [0], [0], [1], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 4,
        maxMoves_2star: 6,
    },
    {
        // level-65: 001 + 010 + 100 > 001 + 010 + 100 + 110
        numQubits: 3,
        initialState: [[0], [1], [1], [0], [1], [0], [0], [0]],
        targetState: [[0], [1], [1], [0], [1], [0], [1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 1,
        maxMoves_2star: 3,
    },
    {
        // level-66: 001 + 110 > 010 + 100
        numQubits: 3,
        initialState: [[0], [1], [0], [0], [0], [0], [1], [0]],
        targetState: [[0], [0], [1], [0], [1], [0], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 3,
        maxMoves_2star: 5,
    },
    {
        // level-67: 001 + 110 > 001 - 011 + 110
        numQubits: 3,
        initialState: [[0], [1], [0], [0], [0], [0], [1], [0]],
        targetState: [[0], [1], [0], [-1], [0], [0], [1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-68: 001 + 101 > 100 + 110
        numQubits: 3,
        initialState: [[0], [1], [0], [0], [0], [1], [0], [0]],
        targetState: [[0], [0], [0], [0], [1], [0], [1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 4,
        maxMoves_2star: 6,
    },
    {
        // level-69: 100 > 000 - 111               
        numQubits: 3,
        initialState: [[0], [0], [0], [0], [1], [0], [0], [0]],
        targetState: [[1], [0], [0], [0], [0], [0], [0], [1]],
        gates: ['H', 'CX'],
        minMoves: 3,
        maxMoves_2star: 5,
    },
    {
        // level-70: 011 + 101 > 001 + 100
        numQubits: 3,
        initialState: [[0], [0], [0], [1], [0], [1], [0], [0]],
        targetState: [[0], [1], [0], [0], [1], [0], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-71: 001 + 010 + 100 > 011 + 101 + 110
        numQubits: 3,
        initialState: [[0], [1], [1], [0], [1], [0], [0], [0]],
        targetState: [[0], [0], [0], [1], [0], [1], [1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 3,
        maxMoves_2star: 5,
    },
    {
        // level-72: 011 + 100 > 001 + 010
        numQubits: 3,
        initialState: [[0], [0], [0], [1], [1], [0], [0], [0]],
        targetState: [[0], [1], [1], [0], [0], [0], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
    {
        // level-73: 001 + 100 > 001 + 010 -100 
        numQubits: 3,
        initialState: [[0], [1], [0], [0], [1], [0], [0], [0]],
        targetState: [[0], [1], [1], [0], [-1], [0], [0], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 3,
        maxMoves_2star: 5,
    },
    {
        // level-74: 010 > 000 + 111               
        numQubits: 3,
        initialState: [[0], [0], [1], [0], [0], [0], [0], [0]],
        targetState: [[1], [0], [0], [0], [0], [0], [0], [1]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 4,
        maxMoves_2star: 6,
    },
    {
        // level-75: 011 + 110 > -010 + 011 - 110         
        numQubits: 3,
        initialState: [[0], [0], [0], [1], [0], [0], [1], [0]],
        targetState: [[0], [0], [-1], [1], [0], [0], [-1], [0]],
        gates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
        minMoves: 2,
        maxMoves_2star: 4,
    },
]