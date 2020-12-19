const affineCount = 10;
var coefficients = [];
for (let i = 0; i < affineCount; i++) {
    coefficients.push(getAffinСoefficients(canvas.width, canvas.height));
}

const iterationsCount = 1000000;

function F(x, y, coefA, coefB, coefC) {
    return coefA*x + coefB*y + coefC;
}

function generate() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;

    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    var x = randomFloat(-1, 1);
    var y = randomFloat(-1, 1);

    for (let i= 0; i < iterationsCount; i++) {
        let coefficient = coefficients[randomInt(0, affineCount - 1)];

        x = F(x, y, coefficient.a, coefficient.b, coefficient.c);
        y = F(x, y, coefficient.d, coefficient.e, coefficient.f);

        //TO-DO: variation
        if(i > 20) {
            var index = (Math.floor(x) + Math.floor(y) * width) * 4;
            data[index] = coefficient.red;
            data[index + 1] = coefficient.green;
            data[index + 2] = coefficient.blue;
            data[index + 3] = 255;
        }
    }

    context.putImageData(imageData, 0, 0);
    console.log("image generated");
}

function getAffinСoefficients(x, y) {
    return {
      a: randomFloat(-1, 1),
      b: randomFloat(-1, 1),
      c: randomFloat(0, x),
      d: randomFloat(-1, 1),
      e: randomFloat(-1, 1),
      f: randomFloat(0, y),
      red: randomInt(0, 255),
      green: randomInt(0, 255),
      blue: randomInt(0, 255),
    };
  }

function main() {
    // Adding listener to generate button
    const generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", () => {
        generate();
    });
}

main()