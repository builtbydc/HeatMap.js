class HeatMap {
    constructor(array, colorScheme, epsilon, pixelSize) {
        this.array = array;
        this.rows = this.array.length;
        this.cols = this.array[0].length;

        this.arrayMax = this.array[0][0];
        this.arrayMin = this.arrayMax;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.arrayMax = Math.max(this.array[i][j], this.arrayMax);
                this.arrayMin = Math.min(this.array[i][j], this.arrayMin);
            }
        }

        this.copy = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.copy[i] = new Array(this.cols);
            for (let j = 0; j < this.cols; j++) {
                this.copy[i][j] = this.array[i][j] - this.arrayMin;
            }
        }

        this.colorScheme = colorScheme === undefined ? "rainbow" : colorScheme;
        this.epsilon = epsilon === undefined ? 2 : epsilon; // how many nearby values to consider, i.e., smoothness
        this.pixelSize = pixelSize === undefined ? 1 : pixelSize; // larger pixels, faster generation

        this.transparency = 255;
    }

    display(x0, y0, height, transparency) {
        this.transparency = transparency === undefined ? 255 : transparency;

        push();

        let d = height / this.rows;
        let width = d * this.cols;
        let halfD = d / 2;

        let k = 1 / Math.pow(d * Math.sqrt(2) / 2, 2);
        let maxZ = 0;

        if (this.colorScheme === "dark") {
            noStroke();
            fill(0);
            rect(x0, y0, width, height);
        }

        for (let y = 0; y < height; y += this.pixelSize) {
            for (let x = 0; x < width; x += this.pixelSize) {
                let z = 0;

                let i0 = ~~(y / d) - this.epsilon;
                let j0 = ~~(x / d) - this.epsilon;
                for (let i = i0; i <= i0 + 2 * this.epsilon; i++) {
                    for (let j = j0; j <= j0 + 2 * this.epsilon; j++) {
                        if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
                            if (this.copy[i][j] > 0) {
                                let n = this.copy[i][j];
                                let jx = j * d + halfD;
                                let iy = i * d + halfD;
                                let xPart = Math.pow(2, -k * Math.pow(x - jx, 2));
                                let yPart = Math.pow(2, -k * Math.pow(y - iy, 2));
                                z += n * xPart * yPart;
                            }
                        }
                    }
                }
                if (z > maxZ) maxZ = z;
            }
        }
        for (let y = 0; y < height; y += this.pixelSize) {
            for (let x = 0; x < width; x += this.pixelSize) {
                let z = 0;

                let i0 = ~~(y / d) - this.epsilon;
                let j0 = ~~(x / d) - this.epsilon;
                for (let i = i0; i <= i0 + 2 * this.epsilon; i++) {
                    for (let j = j0; j <= j0 + 2 * this.epsilon; j++) {
                        if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
                            if (this.copy[i][j] > 0) {
                                let n = this.copy[i][j];
                                let jx = j * d + halfD;
                                let iy = i * d + halfD;
                                let xPart = Math.pow(2, -k * Math.pow(x - jx, 2));
                                let yPart = Math.pow(2, -k * Math.pow(y - iy, 2));
                                z += n * xPart * yPart;
                            }
                        }
                    }
                }
                z = z / maxZ;

                if (z > 0.002) {
                    let f = this.toColor(z);
                    stroke(f);
                    fill(f);
                    rect(x0 + x, y0 + height - y - this.pixelSize, this.pixelSize, this.pixelSize);
                }
            }
        }

        pop();
    }

    singleGradient(ci, cj, val, len) {
        let p = val / len;
        return color(ci[0] + p * (cj[0] - ci[0]),
            ci[1] + p * (cj[1] - ci[1]),
            ci[2] + p * (cj[2] - ci[2]), this.transparency);
    }

    multiGradient(val, zero, ...colors) {
        let sum = 0;
        let i = 1;
        for (; i < colors.length - 2; i += 2) {
            if (val < colors[i]) break;
            sum = colors[i];
        }
        return this.singleGradient(colors[i - 1], colors[i + 1], val - sum, colors[i] - sum);
    }

    toColor(val) {
        if (this.colorScheme === "rainbow") {
            let white = [255, 255, 255];
            let purple = [127, 0, 200];
            let blue = [100, 80, 200];
            let green = [0, 200, 0];
            let yellow = [210, 230, 0];
            let orange = [255, 127, 0];
            let red = [255, 0, 0];
            let black = [0, 0, 0];

            return this.multiGradient(val, 0, white, 0.14, purple, 0.29, blue, 0.47, green, 0.57, yellow, 0.78, orange, 0.94, red, 1, black);

        } else if (this.colorScheme === "dark") {
            let black = [0, 0, 0];
            let purple = [60, 9, 108];
            let pink = [222, 77, 134];
            let white = [255, 255, 255];

            return this.multiGradient(val, 0, black, 0.22, purple, 0.88, pink, 1, white);

        }
    }
}

