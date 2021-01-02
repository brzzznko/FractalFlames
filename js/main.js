const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

context.canvas.width  = window.innerWidth - 250;
context.canvas.height = window.innerHeight - 150;

var width = canvas.width;
var height = canvas.height;

const affineCount = 10;
const iterationsCount = 10000000;
const gamma = 4;

var histScale = 3;

var frequencyHist;
var colorHist;

function applyAffine(x, y, coef) {
    let newX = coef.a*x + coef.b*y + coef.c;
    let newY = coef.d*x + coef.e*y + coef.f;

    return [newX, newY];
}

function generate() {
    // Clear canvas
    context.clearRect(0, 0, width, height);

    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Clear frequency and Color Histograms
    frequencyHist = new Uint32Array(width * height * Math.pow(histScale, 2));
    for(let i = 0; i < frequencyHist.length; i++ ) {
        frequencyHist[i] = 0;
    }

    colorHist = new Uint8Array(width * height * Math.pow(histScale, 2) * 3);
    for(let i = 0; i < colorHist.length; i++ ) {
        colorHist[i] = 0;
    }

    // Generation affine functions
    var coefficients = [];
    for (let i = 0; i < affineCount; i++) {
        coefficients.push(getAffinСoefficients(width, height));
    }

    var final = coefficients[randomInt(0, affineCount - 1)];

    var variationsList = getVariationsList()

    // Starting point selection
    var x = randomFloat(-1, 1);
    var y = randomFloat(-1, 1);

    var color = {
        red: randomInt(0, 255),
        green: randomInt(0, 255),
        blue: randomInt(0, 255),
    };

    for (let i= 0; i < iterationsCount; i++) {
        // Chosing affine
        let coefficient = coefficients[randomInt(0, affineCount - 1)];

        // Aplying affine
        var point = applyAffine(x, y, coefficient);
        x = point[0];
        y = point[1];

        // Calculate new color
        color.red = (color.red + coefficient.red) / 2;
        color.green = (color.green + coefficient.green) / 2;
        color.red = (color.blue + coefficient.blue) / 2;

        // Aplying variations
        point = applyVariations(variationsList, x, y);
        x = point[0];
        y = point[1];

        // Aplying post transform
        /*coefficient = coefficients[randomInt(0, affineCount - 1)];
        point = applyAffine(x, y, coefficient);
        x = point[0];
        y = point[1];*/

        // Aplying final
        /*point = applyAffine(x, y, final);
        x = point[0];
        y = point[1];

        color.red = (color.red + final.red) / 2;
        color.green = (color.green + final.green) / 2;
        color.red = (color.blue + final.blue) / 2;*/

        var histX = Math.round((x + 2  * (width/height)) * (height * histScale / 4));
        var histY = Math.round((y + 2) * (height * histScale / 4));

        if(i > 20) {
            // Updating frequency histogram
            frequencyHist[(Math.floor(histY) * width * histScale) + Math.floor(histX)] += 10;

            // Updating color histogram
            let index = (Math.floor(histY) * width * histScale + Math.floor(histX)) * 3;

            colorHist[index] = Math.floor((colorHist[index] + color.red) / 2);
            colorHist[index + 1] = Math.floor((colorHist[index + 1] + color.green) / 2);
            colorHist[index + 2] = Math.floor((colorHist[index + 2] + color.blue) / 2);
        }
    }

    // Image rendering
    var maxFreq = getMaxFrequency();

    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            avgFreq = getAveregeCellFrequency(x, y);
            avgCol = getAverageCellColor(x, y);
            
            alpha = Math.log10(avgFreq) / Math.log10(maxFreq);

            let index = (y * width + x) * 4;
            data[index + 0] = avgCol[0] * Math.pow(alpha, 1/gamma);
            data[index + 1] = avgCol[1] * Math.pow(alpha, 1/gamma);
            data[index + 2] = avgCol[2] * Math.pow(alpha, 1/gamma);
            data[index + 3] = alpha * 255;
        }       
    }

    context.putImageData(imageData, 0, 0);
    console.log("image generated");
}

function getMaxFrequency() {
    var maxFreq = 0;
    for( var x = 0; x < width; x++ ) {
        for( var y = 0; y < height; y++ ) {
            maxFreq = Math.max(maxFreq, getAveregeCellFrequency(x, y));
        }
    }
    return maxFreq;
}

function getAveregeCellFrequency( x, y ) {
    var sum = 0;
    for( var hx = x * histScale; hx < x * histScale + histScale; hx++ ) {
        for( var hy = y * histScale; hy < y * histScale + histScale; hy++ ) {
            sum += frequencyHist[(hy * width * histScale) + (hx)] || 0;
        }
    }
    return sum / Math.pow(histScale, 2);
}

function getAverageCellColor(x, y) {
    var sum = [0, 0, 0]; // r g b
    for( var hx = x * (histScale * 3); hx < x * (histScale * 3) + (histScale * 3); hx += 3 ) {
        for( var hy = y * histScale; hy < y * histScale + histScale; hy++ ) {
            sum[0] += colorHist[ (hy * width * histScale * 3) + (hx) + 0] || 0;
            sum[1] += colorHist[ (hy * width * histScale * 3) + (hx) + 1] || 0;
            sum[2] += colorHist[ (hy * width * histScale * 3) + (hx) + 2] || 0;
        }
    }
    return [sum[0] / Math.pow(histScale, 2), sum[1] / Math.pow(histScale, 2), sum[2] / Math.pow(histScale, 2)];
}


function getAffinСoefficients(x, y) {
    return {
        a: randomFloat(-1, 1),
        b: randomFloat(-1, 1),
        c: randomFloat(0, 1),
        d: randomFloat(-1, 1),
        e: randomFloat(-1, 1),
        f: randomFloat(0, 1),
        red: randomInt(0, 255),
        green: randomInt(0, 255),
        blue: randomInt(0, 255),
    };
}

function getVariationsList() {
    var list = [];

    // Get all checked checkboxes
    var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');  
    for (var checkbox of markedCheckbox) {  
        // Add variation function in list
        list.push(variations[checkbox.value]);  
    } 

    return list;
}

function applyVariations(variationsList, x, y) {
    let newX = 0;
    let newY = 0;
    
    for (var func of variationsList) {
        var point = func(x, y);

        newX += point[0];
        newY += point[1];
    }

    return [newX, newY];
}

function main() {
    // Adding listener to generate button
    const generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", () => {
        generate();
    });
}

main()