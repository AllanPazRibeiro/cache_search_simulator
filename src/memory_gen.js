const fs = require('fs');
const calcs = require('./calcStuff');
const {pow, abs, max, floor} = require('mathjs');
let writeFile = data => {
    let datetime = new Date();
    fs.appendFile(
        "assets/memory.mem"
        , data,(err) => {
        if(err)
            console.log(err);
    });
}
    
String.prototype.padLeft = function (numZeros){
    var n = abs(parseInt(this));
    var zeros = max(0, numZeros - floor(n).toString().length );
    var zeroString = pow(10,zeros).toString().substr(1);
    if( this < 0 ) {
        zeroString = '-' + zeroString;
    }

    return zeroString + n;
}


// let writeMemory = () => {
//     let cr = 0;
//     let vectorSize = calcs.getWordSize() + 1;
//     let maxLimitSize = [vectorSize];
//     for (const index in calcs.getWordSize()) {
//         if (index != calcs.getWordSize())
//             maxLimitSize[index] = maxLimitSize[index] + ", ";
//         if(cr < 3) {
//             writeFile(maxLimitSize[index]);
//             cr++;
//         } else if(cr == 3) {
//             writeFile(maxLimitSize[index]);
//             cr = 0;
//         }
//     }
// }

let getMemoryProps = () => {
    const data = fs.readFileSync("assets/memoryProps.txt", "utf8");
    const regex = /(?:Memoria\s\-\s(\d+)\w+\n)(?:Cache\s\-\s(\d+)\w+\n)(?:Blocos\s\-\s(\d+)\w+\n)/g;
    const matches = regex.exec(data);
    let params = {
        memSize : matches ? matches[1] : '',
        cacheSize : matches ? matches[2] : '',
        blockSize : matches ? matches[3] : '',
    }     
    return params; 
}

let writeMemory = () => {
    //Take some mandatories params
    let memoryProps = getMemoryProps();
    calcs.memSize = memoryProps.memSize;
    calcs.cacheSize = memoryProps.cacheSize;
    calcs.blockSize = memoryProps.blockSize;

    let memory = [calcs.getWordSize() + 1];
    let cacheMemory = [calcs.getCacheLinesQt() + 1];

    let blockLine = 0;
    let cachePosition = 0;
    let miss = 0;
    let hit = 0;
    let breakLine = 0;

  const cacheFile = fs.readFileSync("assets/cache.txt", "utf8");
    for (let i = 0; calcs.getMemoryLinesQt() >= i; i++)
    {
        memory[i] = toString(i, 2).PadLeft(calcs.getBitsqt());
        if (i == calcs.getMemoryLinesQt())
            console.log("Memory\n\n");
    }

    for (let line of cacheFile) {
        let cont = 0;

        let lineData = line.substring(0, line.Length - calcs.getOffSet()) + calcs.getHowMuchToAddOffset();

        for (let l = 0; l < calcs.getCacheLinesQt() / calcs.blocoSize; l = l + calcs.blocoSize)
        {
            if (lineData == cacheMemory[l])
            {
                cont = calcs.getMemoryLinesQt() + 5;
                hit++;
            }
        }

        for (let j = cont; calcs.getMemoryLinesQt() >= j; j = cont++)
        {
            if (lineData == memory[j])
            {
                for (let k = j; blockLine < calcs.blocoSize; k++)
                {
                    cacheMemory[cachePosition] = k.toString(2).PadLeft(calcs.getBitsqt(), '0');
                    blockLine++;
                    cont = k;
                    cachePosition++;
                }

                for (let h = cachePosition; calcs.getCacheLinesQt() >= h; h++)
                {
                    cacheMemory[h] = toString(0).calcs.padLeft(calcs.getBitsqt(), '0');
                }

                miss++;
                blockLine = 0;
            }
        }
    }

    writeFile("Hits = " + hit + "\n");
    writeFile("Miss = " + miss + "\n");
    writeFile("");
    for (let h = 0; calcs.getCacheLinesQt() >= h; h++)
    {
        if (breakLine < calcs.blocoSize)
        {
            writeFile(cacheMemory[h] + ", ");
            breakLine++;
        }

        else if (breakLine == calcs.blocoSize)
        {
            writeFile("");
            breakLine = 0;
            h--;
        }
    }
}

writeMemory();



