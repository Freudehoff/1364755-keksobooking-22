const main = document.querySelector('main');
const messageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const ALERT_SHOW_TIME = 5000;

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
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const createPopupMessage = (typePopup) => {

  main.append(typePopup);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopup(typePopup);
    }
  };

  const closePopup  = () => {
    typePopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  document.addEventListener('keydown', onPopupEscKeydown);

  typePopup.addEventListener('click', () => {
    closePopup(typePopup);
  });
};

const showSuccessMessage = () => {
  messageTemplate.style.zIndex = '500';
  const successMessage = messageTemplate.cloneNode(true);
  createPopupMessage(successMessage);
};

const showErrorMessage = () => {
  errorTemplate.style.zIndex = '500';
  const errorMessage = errorTemplate.cloneNode(true);
  createPopupMessage(errorMessage);
};

export {showAlert, showSuccessMessage, showErrorMessage};
