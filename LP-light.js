function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);

    let num = 50;

    let arr = new Array(num);
    for(let i = 0; i < arr.length; i++) {
        arr[i] = new Array(num).fill(0);
    }

    for(let n = 0; n < 5; n++) {
        let i = int(num * Math.random());
        let j = int(num * Math.random());
        arr[i][j] = int(num * Math.random());
        let distance = int(10 * Math.random());
        for(let k = 0; k < distance; k++) {
            if(i + k < num) arr[i+k][j] = int(num*Math.random());
        }
    }

    for(let n = 0; n < 5; n++) {
        let i = int(num * Math.random());
        let j = int(num * Math.random());
        arr[i][j] = int(num * Math.random());
        let distance = int(10 * Math.random());
        for(let k = 0; k < distance; k++) {
            if(j + k < num) arr[i][j + k] = int(num * Math.random());
        }
    }

    for(let k = 0; k < 0.5 * num * num * Math.sqrt(num); k++) {
        let i = int(num * Math.random());
        let j = int(num * Math.random());
        if(i > 0 &&  i < num - 1 && j > 0 && j < num - 1) {
            let flag = false;
            if(arr[i][j-1] > 0) flag = true;
            if(arr[i][j+1] > 0) flag = true;
            if(arr[i-1][j] > 0) flag = true;
            if(arr[i+1][j] > 0) flag = true;
            if(flag)  {
                arr[i][j] = int(num * Math.random());
            }
        }
    }

    for(let k = 0; k < 2; k++) {
        for(let i = 0; i < num; i++) {
            for(let j = 0; j < num; j++) {
                if(i > 0 &&  i < num - 1 && j > 0 && j < num - 1) {
                    arr[i][j] = ~~((arr[i-1][j] + arr[i+1][j] + arr[i][j-1] + arr[i][j+1]) / 4);
                }
            }
        }
    }

    console.log(arr);

    let heatmap = new HeatMap(arr, "rainbow", 0, 10);
    heatmap.display(0, 0, 500);

    let strarr = "";
    for(let i = arr.length - 1; i >= 0; i--) {
        strarr += "Row " + i + ": ";
        for(let j = 0; j < arr[0].length; j++) {
            strarr += arr[i][j];
            if(j < arr[0].length - 1) strarr += ", ";
            else strarr += "\n";
        }
    }
    textSize(8);
    text(strarr, 508, 16);
}