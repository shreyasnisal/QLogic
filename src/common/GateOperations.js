import Gates from 'common/Gates'


// Calculate tensor product of two matrices
// Tensor product is obtained by multiplying each element of the first matrix by the entire second matrix
// Example:
// tensorProduct([[1, 2], [3, 4]], [[1, 3], [2, 4]]) = [[1, 3, 2, 6], [2, 4, 4, 8], [3, 9, 4, 12], [6, 12, 8, 16]]
// tensor products are useful when determining gate matrices for multiple qubits
export const directProduct = (matrix1, matrix2) => {

    const matrix1_rows = matrix1.length
    const matrix2_rows = matrix2.length
    const matrix1_cols = matrix1[0].length
    const matrix2_cols = matrix2[0].length
    const result_rows = matrix1.length * matrix2.length
    let result = []
    let res_row = 0
    let res_col = 0

    for (let i = 0; i < result_rows; i++) {
        result[i] = []
    }

    for (let i = 0; i < matrix1_rows; i++) {
        for (let k = 0; k < matrix2_rows; k++) {
            for (let j = 0; j < matrix1_cols; j++) {
                for (let l = 0; l < matrix2_cols; l++) {
                    result[res_row][res_col] = matrix1[i][j] * matrix2[k][l]
                    res_col++
                }
            }
            res_col = 0
            res_row++
        }
    }

    return result
}


export const operateGate = (gate, state) => {
    const gate_rows = gate.length
    const gate_cols = gate[0].length
    const state_rows = state.length

    if (gate_cols !== state_rows)
        return null

    const result = []
    for (let i = 0; i < state_rows; i++) {
        result[i] = []
    }

    // standard matrix multiplication code
    for (let i = 0; i < gate_rows; i++) {
        result[i][0] = 0
        for (let j = 0; j < gate_cols; j++) {
            result[i][0] += gate[i][j] * state[j][0]
        }
    }

    return result
}


// function to extrapolate a single qubit gate to a multi-qubit system
// returns the final gate matrix to be applied to be applied to the entire system
export const getMultiQubitGate = (gate, gateIndex, numQubits) => {

    if (gateIndex > numQubits)
        return

    const gateMatrix = Gates[gate]
    const identity = Gates['I']

    if (numQubits === 1)
        return gateMatrix

    let result = gateIndex === 0 ? gateMatrix : identity

    for (let i = 1; i < numQubits; i++) {
        if (i === gateIndex) {
            result = directProduct(result, gateMatrix)
        }
        else {
            result = directProduct(result, identity)
        }
    }

    return result
}