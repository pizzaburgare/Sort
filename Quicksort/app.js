const fs = require('fs');
const min = 0;
const max = 100000;
const nrOfPoints = 100000;
let depth = 6;

// generera tal
const randomInt = (low, high) => {
  return Math.floor(Math.random() * (high - low) + low);
};
// Skapa array
const getSplitArr = () => {
  let splitArr = [];
  for (let i = 0; i < Math.pow(2, depth); i++) {
    splitArr.push([]);
  }
  return splitArr;
};
// const getSplitArr = ()=>{
//     let tempArr = [];
//     let tempSmallArr = [];
//     for(let i = 0; i<depth; i++){
//         tempArr=[];

//         tempArr.push(tempSmallArr);
//         tempArr.push(tempSmallArr);

//         tempSmallArr = tempArr;
//     }
// return tempArr;
// }

for (let n = 0; n < 10; n++) {
  depth = Math.floor(n / 1) + 3;
  // Init
  let operations = 0;
  // Get Pivot
  const currentData = JSON.parse(fs.readFileSync('data.json')).currentData;
  const oldData = JSON.parse(fs.readFileSync('data.json')).oldData;

  const lastOp = currentData.operations;

  let lastPivot = currentData.pivotPoint;
  if (lastPivot < 0) {
    lastPivot = -lastPivot;
  }
  const newPivot = lastPivot + randomInt(-1000, 1000);

  // Init Arr
  const currentArr = [];
  for (let i = 0; i < nrOfPoints; i++) {
    currentArr.push(randomInt(min, max));
  }
  // Dela upp i mindre arrays
  let splitArr = getSplitArr();
  currentArr.forEach((value) => {
    let flag = value;
    let nr = 0;
    for (let i = 0; i < depth; i++) {
      let flagVal = Math.pow(2, i);
      operations++; //Operation
      if (flag > newPivot / flagVal) {
        nr += Math.pow(2, depth - i - 1);
        flag -= newPivot / flagVal;
        operations++; //Operation
      }
    }
    splitArr[nr].push(value);
  });

  // Sortera varje arr med bubble sort
  const bubbleSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < i; j++) {
        if (arr[i] < arr[j]) {
          let flag = arr[i];
          arr[i] = arr[j];
          arr[j] = flag;
          operations++; //Operation
        }
      }
    }
  };
  //Sortera
  splitArr.forEach((arr) => {
    bubbleSort(arr);
  });
  var outArr = splitArr.flat();
  console.log(operations < lastOp);
  if (operations < lastOp) {
    oldData.push(currentData);
    currentData.pivotPoint = newPivot;
    currentData.operations = operations;
    currentData.depth = depth;
    fs.writeFileSync('data.json', JSON.stringify({ currentData, oldData }));
    fs.writeFileSync('arr.json', JSON.stringify(splitArr));
  }

  console.log(currentData);
}
