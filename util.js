function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function swapElementsInArray(arr) {
  let index1 = getRandomInt(arr.length);
  let index2 = getRandomInt(arr.length);
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
  return arr;
}

function formatTextAreaPlaceholders() {
  let textAreas = document.getElementsByTagName('textarea');
  Array.prototype.forEach.call(textAreas, (e) => {
    e.placeholder = e.placeholder.replace(/\\n/g, '\n');
  });
}

function generateColor() {
  let hexSet = '0123456789ABCDEF';
  let finalHexString = '#';
  for (let i = 0; i < 6; i++) {
    finalHexString += hexSet[Math.ceil(Math.random() * 15)];
  }
  let rgbLeadDigits = finalHexString[1] + finalHexString[3] + finalHexString[5];

  // fix low value colors
  if (/^([0-8][0-8][0-8])/.test(rgbLeadDigits)) {
    finalHexString = replaceCharAt(
      finalHexString,
      Math.ceil(Math.random() * 3) * 2 - 1,
      'F'
    );
  }
  return finalHexString;
}

function replaceCharAt(str, index, chr) {
  return str.substring(0, index) + chr + str.substring(index + 1);
}
