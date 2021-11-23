let car;
let tables = [];
let pointsCsv = [];

let realSF = 520 / 111;
let plateHeight = 100;
let myFont;

function preload() {
    myFont = loadFont("CharlesWright-Bold.ttf");
    let csvFiles = ["points/point-3.csv", "points/point-2.csv", "points/point-1.csv", "points/point-0.csv"];

    for (let file of csvFiles) {
        tables.push(loadTable(file, "csv"));
    }
}

let plateGraphic;
let plate;

function setup() {
    car = createVideo("media/pexels-cottonbro-7508263.mp4");
    let canvas = createCanvas(1000, 527, WEBGL);
    canvas.parent("sketch");
    plateGraphic = createGraphics(800, 500);
    // plateGraphic.parent("sketch");
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

    plate = new generatePlate(plateGraphic.width / 2, plateGraphic.height / 2, plateHeight, realSF);

    plateGraphic.scale(3);
    // let srcCorners = [450, 213.5, 550, 313.5, 550, 313.5, 450, 313.5];
}

function draw() {
    background(100);
    push();
    translate(-width / 2, -height / 2, 0);
    image(car, 0, 0, width, height);
    fill("white");
    noStroke();
    quad(38, 31, 86, 20, 69, 63, 30, 76);
    pop();
    let currFrame = floor(car.time() * 25);
    // if (currFrame > 300) return car.pause();
    // image(car, 0, 0, width, height);
    // console.log(currFrame);

    plateGraphic.push();
    plateGraphic.translate(-100, -150, 0);

    plateGraphic.background(255);
    // plateGraphic.scale(2);

    plateGraphic.noStroke();

    plateGraphic.rectMode(CENTER);

    // plateGraphic.fill("#333745");
    // plateGraphic.rect(plate.pos.x + 5, plate.pos.y + 5, plate.plateWidth, plate.plateHeight);

    plateGraphic.fill("#edf6f9");
    plateGraphic.rect(plate.pos.x, plate.pos.y, plate.plateWidth, plate.plateHeight);

    plateGraphic.textFont(myFont);
    plateGraphic.fill("black");
    plateGraphic.textSize(80);

    plateGraphic.push();

    plateGraphic.translate(plate.pos.x - 175, plate.pos.y - 10);

    for (let i = 0; i < plate.chars.length; i++) {
        plateGraphic.textAlign(CENTER, CENTER);

        plateGraphic.text(plate.chars[i], 0, 0);

        if (i == 3) {
            plateGraphic.translate(90, 0);
        } else {
            plateGraphic.translate(50, 0);
        }
    }
    plateGraphic.pop();
    plateGraphic.pop();

    // fill("white");

    // plateGraphic.textSize(50);
    // plateGraphic.fill("red");
    // plateGraphic.rect(0, 0, 100, 50);
    // fill("white");
    // push();
    // // translate(0, 200);
    // // rotateX(0.5);
    noStroke();
    // // plane(200);
    // rect(0, 0, 100, 50);
    // pop();
    texture(plateGraphic);
    // beginShape();
    translate(-width / 2, -height / 2, 0);

    quad(
        pointsCsv[0][currFrame].x,
        pointsCsv[0][currFrame].y,
        pointsCsv[1][currFrame].x,
        pointsCsv[1][currFrame].y,
        pointsCsv[2][currFrame].x,
        pointsCsv[2][currFrame].y,
        pointsCsv[3][currFrame].x,
        pointsCsv[3][currFrame].y
    );

    // for (let i = 0; i < pointsCsv.length; i++) {
    //     let thisP = pointsCsv[i][currFrame];
    //     // console.log(thisP);
    //     // if (i == 0) {
    //     //     fill("red");
    //     // } else {
    //     // fill("blue");
    //     // }
    //     circle(thisP.x, thisP.y, 10);
    //     vertex(thisP.x, thisP.y);
    // }

    // endShape(CLOSE);

    // plateGraphic.fill("orange");

    //

    // let srcCorners = [0, 0, width, 0, width, height, 0, height];
    // let dstCorners = [
    //     pointsCsv[0][currFrame].x,
    //     pointsCsv[0][currFrame].y,
    //     pointsCsv[1][currFrame].x,
    //     pointsCsv[1][currFrame].y,
    //     pointsCsv[2][currFrame].x,
    //     pointsCsv[2][currFrame].y,
    //     pointsCsv[3][currFrame].x,
    //     pointsCsv[3][currFrame].y,
    // ];
    // console.log(dstCorners);
    // var perspT = PerspT(srcCorners, dstCorners);
    // var mat = perspT.coeffsInv;
    // console.log("matrix(" + mat.slice(0, 6).join(", ") + ")");

    // plate.style("transform", "matrix(" + mat.join(", ") + ")");
    // let z = map(mouseY, 0, windowHeight, -1000, 250);
    // div.style("transform", "translateZ(" + z + "px)");

    // console.log(mat);

    // plate.push();
    // plate.applyMatrix(1, mat[1], mat[3], 1, 0, 0);
    // plate.fill("blue");
    // plate.rectMode(CENTER);
    // plate.rect(0, 0, 200, 75);
    // image(plate, 0, 0);
    // plate.pop();
}

function mousePressed() {
    car.play();
}