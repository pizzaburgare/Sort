const fs = require('fs');
const min = 0;
const max = 10000;

// generera tal
const randomInt = ()=>{
    return Math.floor(Math.random()*(max-min)+min);
}
// Skapa array
const getSplitArr = ()=>{
    let tempArr = [];
    let tempSmallArr = [];
    for(let i = 0; i<5; i++){
        tempArr=[];
    
        tempArr.push(tempSmallArr);
        tempArr.push(tempSmallArr);
    
        tempSmallArr = tempArr;
    }
return tempArr;
}
 
// Init
let splitArr = getSplitArr();

fs.writeFileSync("data.json",JSON.stringify(splitArr));
console.log(splitArr);