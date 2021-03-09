const ALERT_SHOW_TIME = 5000;

const getRandomFloat = function (from, to, decimal = 5) {
  if (to > from && from >= 0) {
    return ((Math.random() * (to - from + 0.00001)) + from).toFixed(decimal);
  }
  throw new Error('Input data error');
}


const getRandomInt = function (from, to) {
  if (to > from && from >= 0) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from)) + from;
  }
  throw new Error('Input data error');
}

const getRandomArrayElement = function (elements) {
  return elements[getRandomInt(0, elements.length - 1)];
}

const getRandomArrayLength = function (elements) {
  const newArray = [];
  let elementsLen = elements.length;
  for (let i=getRandomInt(0, elementsLen); i < elementsLen; i+=getRandomInt(1, elementsLen)) {
    newArray.push(elements[i]);
  }
  return newArray;
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandomFloat, getRandomInt, getRandomArrayElement, getRandomArrayLength, showAlert};
