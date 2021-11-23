let plateWidth, plateHeight, startPos;

let realSF = 520 / 111; // width / height of real numberplate to get scale factor
let middleMarginSf = 16.5 / 520;
let characterWidthSF = 175 / 520;
let characterSpacingSF = 33 / 520;

let plates = [];

function preload() {
    myFont = loadFont("CharlesWright-Bold.ttf");
}

function setup() {
    canvas = createCanvas(800, 500);
    canvas.parent("sketch");
    noLoop();

    plateHeight = 100;
    plateWidth = plateHeight * realSF;
    startPos = width / 2 - 175;
}

function draw() {
    // background("#457b9d");
    background(1, 0);

    // for (let i = 1; i < 4; i++) {
    //     let x = width / 2;
    //     let y = (height / 4) * i;
    //     tempPlate = new generatePlate(x, y);
    //     plates.push(tempPlate);
    // }

    tempPlate = new generatePlate(width / 2, height / 2);
    plates.push(tempPlate);

    for (let i = 0; i < 3; i++) {
        plates[i].show();
    }

    console.log(plates);

    // save("plates.png");
}

class generatePlate {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.chars = this.generateCharacters();
        this.plateHeight = plateHeight;
        this.plateWidth = plateHeight * realSF;
    }

    generateCharacters() {
        const alphabet = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
        const firstNumbers = "012567";
        const secondNumbers = "0123456789";

        let characters = [];

        for (let i = 0; i < 7; i++) {
            let thisCharacter;
            if (i == 2) {
                thisCharacter = firstNumbers[Math.floor(Math.random() * firstNumbers.length)];
            } else if (i == 3) {
                thisCharacter = secondNumbers[Math.floor(Math.random() * secondNumbers.length)];
            } else {
                thisCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
            characters.push(thisCharacter);
        }

        return characters;
    }

    show() {
        noStroke();

        rectMode(CENTER);

        fill("#333745");
        rect(this.pos.x + 5, this.pos.y + 5, this.plateWidth, this.plateHeight);

        fill("#edf6f9");
        rect(this.pos.x, this.pos.y, this.plateWidth, this.plateHeight);

        textFont(myFont);
        fill("black");
        textSize(80);

        push();

        translate(this.pos.x - 175, this.pos.y - 10);

        for (let i = 0; i < this.chars.length; i++) {
            textAlign(CENTER, CENTER);

            text(this.chars[i], 0, 0);

            if (i == 3) {
                translate(90, 0);
            } else {
                translate(50, 0);
            }
        }
        pop();
    }
}