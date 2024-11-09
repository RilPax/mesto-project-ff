export function openPopup(popup) {
    popup.style.opacity = '0';
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
  
    setTimeout(() => {
      popup.style.transition = 'opacity 0.6s';
      popup.style.opacity = '1';
    }, 10);
  }
  
  export function closePopup(popup) {
    popup.style.transition = 'opacity 0.6s';
    popup.style.opacity = '0';
  
    popup.addEventListener('transitionend', () => {
      popup.classList.remove('popup_is-opened');
      popup.classList.add('popup_is-animated');
    }, { once: true });
  }
  