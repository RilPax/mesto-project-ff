// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import { initialCards } from './components/cards.js';
import avatar from './images/avatar.jpg';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;


const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
function createCard(item, { deleteCard }) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = item.name;
  const cardImage = card.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCard(card);
  });
  return card;
}

const cardAdd = (initialCards) => {
  initialCards.forEach((item) => {
    const cardElement = createCard(item, {
      deleteCard: (card) => {
        card.remove();
      }
    });
    cardContainer.append(cardElement);
  });
};

cardAdd(initialCards);

import './index.css';

// Изменение профиля

const editProfileBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editForm = document.forms.edit;
const editName = editForm.elements.name;
const editDescription = editForm.elements.description;
const closeBtn = document.querySelector('.popup__close');

editProfileBtn.addEventListener('click', () => {
  editPopup.style.display = 'flex';
  editName.value = document.querySelector('.profile__title').textContent;
  editDescription.value = document.querySelector('.profile__description').textContent
})

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  document.querySelector('.profile__title').textContent = editName.value;
  document.querySelector('.profile__description').textContent = editDescription.value;

  editPopup.style.display = 'none'
})

closeBtn.addEventListener('click', function() {
  editPopup.style.display = 'none';
})