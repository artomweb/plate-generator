let car;
let tables = [];
let pointsCsv = [];

function preload() {
    let csvFiles = ["points/point-3.csv", "points/point-2.csv", "points/point-1.csv", "points/point-0.csv"];

    for (let file of csvFiles) {
        tables.push(loadTable(file, "csv"));
    }
}

let plate;

function setup() {
    car = createVideo("media/pexels-cottonbro-7508263.mp4");
    canvas = createCanvas(1000, 527);
    canvas.parent("sketch");
    plate = createGraphics(100, 100);
    // console.log(car);
    // car.loop();
    car.hide();
    // console.log(pointsCsv);

    for (let table of tables) {
        let thesePoints = [];
        console.log(table);
        for (let row of table.rows) {
            thesePoints.push({ x: row.arr[0] * width, y: height - row.arr[1] * height });
        }
        pointsCsv.push(thesePoints);
    }
    console.log(pointsCsv);

    // let srcCorners = [450, 213.5, 550, 313.5, 550, 313.5, 450, 313.5];
}

function draw() {
    background("white");

    let currFrame = floor(car.time() * 25);
    if (currFrame > 300) return car.pause();
    image(car, 0, 0, width, height);
    // console.log(currFrame);

    for (let i = 0; i < pointsCsv.length; i++) {
        let thisP = pointsCsv[i][currFrame];
        // console.log(thisP);
        if (i == 3) {
            fill("red");
        } else {
            fill("blue");
        }
        circle(thisP.x, thisP.y, 10);
    }

    let srcCorners = [450, 213.5, 550, 313.5, 550, 313.5, 450, 313.5];
    let dstCorners = [pointsCsv[0][0].x, pointsCsv[0][0].y, pointsCsv[1][0].x, pointsCsv[1][0].y, pointsCsv[2][0].x, pointsCsv[2][0].y, pointsCsv[3][0].x, pointsCsv[3][0].y];
    // console.log(dstCorners);
    var perspT = PerspT(srcCorners, dstCorners);
    var mat = perspT.coeffsInv;
    // console.log(mat);

    plate.push();
    plate.applyMatrix(mat[0], mat[1], mat[2], mat[3], mat[4], mat[6]);
    plate.fill("blue");
    plate.rectMode(CENTER);
    plate.rect(0, 0, plate.width, plate.height);
    image(plate, width / 2, height / 2);
    plate.pop();
}

function mousePressed() {
    car.play();
}