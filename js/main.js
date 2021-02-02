
function getRandomFloat(from, to, decimal = 2) {
  if (to > from && from >= 0) {
    const result = (Math.random() * to).toFixed(decimal);
    return result >= from ? result : getRandomFloat(from, to, decimal);
  }

  throw new Error('Input data error');
}
