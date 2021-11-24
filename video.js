let car;
let tables = [];
let pointsCsv = [];
let myFont;

function preload() {
    let csvFiles = ["points/point-3.csv", "points/point-2.csv", "points/point-1.csv", "points/point-0.csv"];
    myFont = loadFont("CharlesWright-Bold.ttf");
    for (let file of csvFiles) {
        tables.push(loadTable(file, "csv"));
    }
}

let plate;
let plateGraphic;

let realSF = 520 / 111;
let plateHeight = 100;

function setup() {
    car = createVideo("media/pexels-cottonbro-7508263.mp4");
    canvas = createCanvas(1000, 527);
    canvas.parent("sketch");
    // console.log(car);
    // car.loop();
    car.hide();
    car.speed(2);
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

    plate = new generatePlate(0, 0, plateHeight, realSF);
    plateGraphic = createGraphics(width, height);
    // plateGraphic = createGraphics(width, height);

    // let srcCorners = [450, 213.5, 550, 313.5, 550, 313.5, 450, 313.5];
}

function draw() {
    background("white");
    let currFrame = floor(car.time() * 25);
    image(car, 0, 0, width, height);
    if (currFrame > 300) {
        // car.pause();
        // car = createVideo("media/pexels-cottonbro-7508263.mp4");
    }
    // console.log(currFrame);

    // beginShape();

    // for (let i = 0; i < pointsCsv.length; i++) {
    //     let thisP = pointsCsv[i][currFrame];
    //     // console.log(thisP);
    //     // if (i == 3) {
    //     // fill("red");
    //     // } else {
    //     fill("blue");
    //     // }
    //     vertex(thisP.x, thisP.y);
    //     // circle(thisP.x, thisP.y, 20);
    // }

    // endShape(CLOSE);

    let srcCorners = [plate.plateWidth, 0, plate.plateWidth, plate.plateHeight, 0, plate.plateHeight];
    let dstCorners = [pointsCsv[1][currFrame].x, pointsCsv[1][currFrame].y, pointsCsv[2][currFrame].x, pointsCsv[2][currFrame].y, pointsCsv[3][currFrame].x, pointsCsv[3][currFrame].y];
    // console.log(dstCorners);
    // var perspT = PerspT(srcCorners, dstCorners);
    // var mat = perspT.coeffsInv;

    const myHomography = new homography.Homography("affine");
    myHomography.setReferencePoints(srcCorners, dstCorners);

    // console.log(myHomography._transformMatrix);

    let mat = myHomography._transformMatrix;

    // console.log(mat);

    // plateGraphic.background("yellow");

    plateGraphic.clear();

    plateGraphic.push();
    plateGraphic.applyMatrix(mat);
    plate.show(plateGraphic, myFont);
    image(plateGraphic, 0, 0);
    plateGraphic.pop();
}

function mousePressed() {
    car.loop();
}