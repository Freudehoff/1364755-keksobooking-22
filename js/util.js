
function getRandomFloat(from, to, decimal = 2) {
  if (to > from && from >= 0) {
    return (Math.random() * to).toFixed(decimal);
  }
  throw new Error('Input data error');
}

function getRandomInt(from, to) {
  if (to > from && from >= 0) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from)) + from;
  }
  throw new Error('Input data error');
}

function getRandomArrayElement(elements) {
  return elements[getRandomInt(0, elements.length - 1)];
}

function getRandomArrayLength(elements) {
  const newArray = [];
  let elementsLen = elements.length;
  for (let i=getRandomInt(0, elementsLen); i < elementsLen; i+=getRandomInt(1, elementsLen)) {
    newArray.push(elements[i]);
  }
  return newArray;
}

export {getRandomFloat, getRandomInt, getRandomArrayElement, getRandomArrayLength};
