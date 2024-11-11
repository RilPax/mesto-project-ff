import { initialCards } from './components/cards.js';
import { createCard, addNewCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

import avatar from './images/avatar.jpg';
import './index.css';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

const cardContainer = document.querySelector('.places__list');

function deleteCard(card) {
    card.remove();
}

function handleLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function handleImageClick(imageSrc, title) {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    
    popupImage.src = imageSrc;
    popupImage.alt = title;
    popupCaption.textContent = title;
    openPopup(imagePopup);
}

function addInitialCards(cards, container) {
    cards.forEach((item) => {
        const cardElement = createCard(item, { deleteCard, handleLike, handleImageClick });
        container.append(cardElement);
    });
}

addInitialCards(initialCards, cardContainer);

const editProfileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];
const editName = editForm.elements.name;
const editDescription = editForm.elements.description;
const closeBtns = document.querySelectorAll('.popup__close');

editProfileBtn.addEventListener('click', () => {
  openPopup(editPopup);
  editName.value = document.querySelector('.profile__title').textContent;
  editDescription.value = document.querySelector('.profile__description').textContent;
});

addCardBtn.addEventListener('click', () => {
  openPopup(addPopup);
});

editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = editName.value;
  document.querySelector('.profile__description').textContent = editDescription.value;
  closePopup(editPopup);
});

closeBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameValue = addForm.elements['place-name'].value; 
  const linkValue = addForm.elements['link'].value; 
  const cardData = {
    name: nameValue,
    link: linkValue
  };

  const cardElement = createCard(cardData, { deleteCard, handleLike, handleImageClick });
  cardContainer.prepend(cardElement);
  addForm.reset(); 
  closePopup(addPopup);
});
