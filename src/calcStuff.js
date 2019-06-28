const {log, pow, abs, max, floor} = require('mathjs');
let memSize = 0;
let blockSize = 0;
let cacheSize = 0;

String.prototype.padLeft = function (numZeros){
    var n = abs(parseInt(this));
    var zeros = max(0, numZeros - floor(n).toString().length );
    var zeroString = pow(10,zeros).toString().substr(1);
    if( this < 0 ) {
        zeroString = '-' + zeroString;
    }

    return zeroString + n;
}

let getWordSize = () => {
    let qtBits = log(memSize * 1024, 2) / log(2,2);
    qtBits = pow(2, qtBits);
    return parseInt(qtBits - 1);
};

let getMemoryLinesQt = () => {
    let qtdBits = log(memSize * 1024, 2) / log(2,2);
    qtdBits = (pow(2, qtdBits));
    return parseInt(qtdBits-1);
};

let getBitsqt = () => {
    let qtBits = log(memSize * 1024, 2) / log(2,2);
    return parseInt(qtBits);
};

let getCacheLinesQt = () =>{
    let qtdBits = log(cacheSize * 1024, 2) / log(2,2);
    qtdBits = (pow(2, qtdBits));
    return parseInt(qtdBits - 1);
};

let getOffSet = () => {
    let qtdBlocos = log(blockSize, 2) / log(2,2);
    return parseInt(qtdBlocos);
};

let getHowMuchToAddOffset = () => {
    let zero = 0;
    let qtBits = toString(zero).padLeft(getOffSet());
    return qtBits;
};

module.exports = {
    memSize,
    blockSize,
    cacheSize,
    getWordSize,
    getMemoryLinesQt,
    getBitsqt,
    getCacheLinesQt,
    getOffSet,
    getHowMuchToAddOffset 
} 