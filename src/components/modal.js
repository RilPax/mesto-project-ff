function SetCoursorStyle(evt, popup) {
  if (!evt.target.closest('.popup__content')) {
    popup.style.cursor = 'pointer';
  } else {
    popup.style.cursor = 'default';
  }
}

function createMouseMoveHandler(popup) {
  return function (evt) {
    SetCoursorStyle(evt, popup);
  };
}

export function openPopup(popup) {
  popup.style.opacity = '0';
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');

  const mouseMoveHandler = createMouseMoveHandler(popup);
  popup.mouseMoveHandler = mouseMoveHandler;
  popup.addEventListener('mousemove', mouseMoveHandler);

  setTimeout(() => {
    popup.style.transition = 'opacity 0.6s';
    popup.style.opacity = '1';
  }, 10);

  document.addEventListener('keydown', handleEscClose);
  popup.addEventListener('mousedown', handleOverlayClose);

  return true;
}

export function closePopup(popup) {
  popup.style.transition = 'opacity 0.6s';
  popup.style.opacity = '0';

  popup.addEventListener(
    'transitionend',
    () => {
      popup.classList.remove('popup_is-opened');
      popup.classList.add('popup_is-animated');
    },
    { once: true }
  );

  const mouseMoveHandler = popup.mouseMoveHandler;
  if (mouseMoveHandler) {
    popup.removeEventListener('mousemove', mouseMoveHandler);
    delete popup.mouseMoveHandler;
  }

  popup.style.cursor = '';
  document.removeEventListener('keydown', handleEscClose);
  popup.removeEventListener('mousedown', handleOverlayClose);
}



function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) closePopup(openPopup);
  }
}

function handleOverlayClose(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.target);
  }
}
