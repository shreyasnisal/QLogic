

// Calculate tensor product of two matrices
// Tensor product is obtained by multiplying each element of the first matrix by the entire second matrix
// Example:
// tensorProduct([[1, 2], [3, 4]], [[1, 3], [2, 4]]) = [[1, 3, 2, 6], [2, 4, 4, 8], [3, 9, 4, 12], [6, 12, 8, 16]]
// tensor products are useful when determining gate matrices for multiple qubits
export default directProduct = (matrix1, matrix2) => {

    const matrix1_rows = matrix1.length
    const matrix2_rows = matrix2.length
    const matrix1_cols = matrix1[0].length
    const matrix2_cols = matrix2[0].length
    const result_rows = matrix1.length * matrix2.length
    let result = []
    let res_row = 0
    let res_col = 0

    console.log(matrix1_rows, matrix1_cols)
    console.log(matrix2_rows, matrix2_cols)

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


