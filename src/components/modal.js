export function openPopup(popup) {
  popup.style.opacity = '0';
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');

  popup.addEventListener('mousemove', (evt) => {
    if (!evt.target.closest('.popup__content')) {
      popup.style.cursor = 'pointer';
    } else {
      popup.style.cursor = 'default';
    }
  });

  setTimeout(() => {
    popup.style.transition = 'opacity 0.6s';
    popup.style.opacity = '1';
  }, 10);

  document.addEventListener('keydown', handleEscClose);
  popup.addEventListener('mousedown', handleOverlayClose);
}

export function closePopup(popup) {
  popup.style.transition = 'opacity 0.6s';
  popup.style.opacity = '0';

  popup.addEventListener('transitionend', () => {
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
  }, { once: true });

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
