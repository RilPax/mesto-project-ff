import { forEach } from 'core-js/stable/array';

import { initialCards } from './components/cards.js';
import { cardAdd, addNewCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

import avatar from './images/avatar.jpg';
import './index.css';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

const cardContainer = document.querySelector('.places__list');
cardAdd(initialCards, cardContainer);

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
const images = document.querySelectorAll('.card__image');

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

images.forEach((image) => {
  image.addEventListener('click', () => {
    openPopup(imagePopup);
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    const cardTitle = image.closest('.card').querySelector('.card__title').textContent;

    popupImage.src = image.src;
    popupImage.alt = cardTitle;
    popupCaption.textContent = cardTitle;
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

  addNewCard(cardData, cardContainer);
  addForm.reset(); 
  closePopup(addPopup);
});
