
function getRandomFloat(from, to, decimal = 2) {
  if (to > from && from >= 0) {
    const result = (Math.random() * to).toFixed(decimal);
    if (result >= from) {
      return result;
    }
  }
  throw new Error('Input data error');
}

getRandomFloat();

function getRandomInt(from, to) {
  if (to > from && from >= 0) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from)) + from;
  }
  throw new Error('Input data error');
}

getRandomInt();
