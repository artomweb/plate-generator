class generatePlate {
    constructor(x, y, plateHeight, realSF) {
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

    show(ctx) {
        ctx.noStroke();

        ctx.rectMode(CENTER);

        ctx.fill("#333745");
        ctx.rect(this.pos.x + 5, this.pos.y + 5, this.plateWidth, this.plateHeight);

        ctx.fill("#edf6f9");
        ctx.rect(this.pos.x, this.pos.y, this.plateWidth, this.plateHeight);

        ctx.textFont(myFont);
        ctx.fill("black");
        ctx.textSize(80);

        ctx.push();

        ctx.translate(this.pos.x - 175, this.pos.y - 10);

        for (let i = 0; i < this.chars.length; i++) {
            ctx.textAlign(CENTER, CENTER);

            ctx.text(this.chars[i], 0, 0);

            if (i == 3) {
                ctx.translate(90, 0);
            } else {
                ctx.translate(50, 0);
            }
        }
        ctx.pop();
    }
}