export interface MatrixConfig {
    rows: number,
    cols: number,
}

export type MatrixOptions = number[][] | MatrixConfig;

const augmentedMatrix = [
    [0, 1, 3, 4],
    [0, 2, -3, 0],
    [-2, 5, 3, 3],
]

export default class Matrix {
    private rows: number;
    private cols: number;
    private matrix: number[][];

    constructor (opts: MatrixOptions) {
        if ("rows" in opts && "cols" in opts) {
            if (opts.rows <= 0) {
                throw new Error(`Inside Matrix() rows must be greater than 0. Instead recieved: ${opts.rows}`);
            }

            if (opts.cols <= 0) {
                throw new Error(`Inside Matrix() cols must be greater than 0. Instead recieved: ${opts.cols}`);
            }

            this.rows = opts.rows;
            this.cols = opts.cols;

            this.matrix = Matrix.zero(this.rows, this.cols);
            return;
        }

        this.matrix = opts;
        this.rows = this.matrix.length;

        // Verify uniform column size
        let size = this.matrix[0].length;

        for (let i = 0; i < this.matrix.length; i++) {
            if (size !== this.matrix[i].length) {
                throw `Matrix columns dimensions are not all the same. ${JSON.stringify(opts)}`;
            }

            size = this.matrix[i].length;
        }

        this.cols = size;
    }

    static zero (rows: number, cols: number): number[][] {
        const matrix = new Array<number[]>(rows);

        for (let i = 0; i < rows; i++) {
            const c = new Array<number>(cols);
            matrix[i] = c;
        }

        return matrix;
    }
}