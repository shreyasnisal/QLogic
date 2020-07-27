import Gates from 'common/Gates'


// Calculate tensor product of two matrices
// Tensor product is obtained by multiplying each element of the first matrix by the entire second matrix
// Example:
// tensorProduct([[1, 2], [3, 4]], [[1, 3], [2, 4]]) = [[1, 3, 2, 6], [2, 4, 4, 8], [3, 9, 4, 12], [6, 12, 8, 16]]
// tensor products are useful when determining gate matrices for multiple qubits
export const directProduct = (matrix1, matrix2) => {

    if (matrix1 === 1) return matrix2
    if (matrix2 === 1) return matrix1

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
            if (result[i][0] > 0) result[i][0] = 1
            if (result[i][0] < 0) result[i][0] = -1
        }
    }

    return result
}


// function to extrapolate a single qubit gate to a multi-qubit system
// returns the final gate matrix to be applied to be applied to the entire system
export const getMultiQubitGate = (gate, gateIndex, numQubits) => {

    if (gateIndex > numQubits)
        return null

    const gateMatrix = Gates[gate]
    const identity = getIdentity(2)

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

export const getIdentity = (dimension) => {
    const result = []

    for (let i = 0; i < dimension; i++) {
        result[i] = []
    }

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            result[i][j] = (i === j) ? 1 : 0
        }
    }

    return result
}


export const getControlGate = (gate, totalQubits, control, target) => {
    
    const gateMatrix = Gates[gate]
    let matrix1 = []
    let matrix3 = []
    let matrix2 = []
    const matrix2_dimension = (target > control) ? 2 ** (target - control + 1) : 2 ** (control - target + 1)

    for (let i = 0; i < matrix2_dimension; i++) {
        matrix2[i] = []
    }

    for (let i = 0; i < matrix2_dimension; i++) {
        for (let j = 0; j < matrix2_dimension; j++) {
            matrix2[i][j] = 0
        }
    }
    
    if (target > control) {
        matrix1 = getIdentity(2 ** (control))
        matrix3 = getIdentity(2 ** (totalQubits - target - 1))

        const gatePrime = directProduct(getIdentity(2 ** (target - control - 1)), gateMatrix)

        const matrix2_leftTop = getIdentity(2 ** (target - control))
        const matrix2_rightBottom = gatePrime

        for (let i = 0; i < matrix2_leftTop.length; i++) {
            for (let j = 0; j < matrix2_leftTop[i].length; j++) {
                matrix2[i][j] = matrix2_leftTop[i][j]
            }
        }

        for (let i = 0; i < matrix2_rightBottom.length; i++) {
            for (let j = 0; j < matrix2_rightBottom[i].length; j++) {
                matrix2[matrix2.length / 2 + i][matrix2[i].length / 2 + j] = matrix2_rightBottom[i][j]
            }
        }
    }
    else if (target < control) {
        matrix1 = getIdentity(2 ** (target))
        matrix3 = getIdentity(2 ** (totalQubits - control - 1))

        const proj0 = [[1, 0], [0, 0]]
        const proj1 = [[0, 0], [0, 1]]

        const matrix2A = directProduct(getIdentity(2 ** (control - target)), proj0)
        const matrix2B = directProduct(directProduct(gateMatrix, getIdentity(2 ** (control - target - 1))), proj1)

        matrix2 = matrixSum(matrix2A, matrix2B)
    }


    return directProduct(directProduct(matrix1, matrix2), matrix3)
}


export const matrixSum = (matrix1, matrix2) => {
    
    if (matrix1.length !== matrix2.length) return null

    for (let i = 0; i < matrix1.length; i++) {
        if (matrix1[i].length !== matrix2[i].length)
            return null
    }

    const result = []

    for (let i = 0; i < matrix1.length; i++) {
        result[i] = []
    }

    for (let i = 0; i< matrix1.length; i++) {
        for (let j = 0; j < matrix1[i].length; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j]
        }
    }

    return result
}