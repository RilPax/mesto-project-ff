import { fetchCards } from './components/cards.js';
import { createCard, handleLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { deleteApi, profileInfoRequest, editProfileData, editProfileAvatar, requestPostCard, setLike } from './components/api.js'

import './index.css';

const cardContainer = document.querySelector('.places__list');
const baseUrl = {
  link: 'https://nomoreparties.co/v1/wff-cohort-27',
  token: '2f9bc796-ad38-4ea7-a369-376b91155c43',
  tipeOfContent: 'application/json'
}

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}


function deleteCard(card, itemId) {
  openPopup(deleteCardPopup);
  formDelete.onsubmit = (evt) => submitDeleteCard(evt, card, itemId);
}

function submitDeleteCard(evt, card, itemId) {
  evt.preventDefault();
  deleteApi(itemId, baseUrl, { getResponseData })
      .then(() => {
          closePopup(deleteCardPopup);
          card.remove(); 
      })
      .catch((err) =>{
        console.error(err)
      }); 
}


function handleImageClick(imageSrc, title) {
    ImageInfo.src = imageSrc;
    ImageInfo.alt = title;
    imageName.textContent = title;
    openPopup(imagePopup);
}

async function fetchUserData() {
  return profileInfoRequest(baseUrl, { getResponseData })
}

const loadedCardIds = new Set();

function addInitialCards(cards, userId, container,  ) {
  cards.forEach(item => {
    if (loadedCardIds.has(item._id)) {
      return;
    }

    const itemId = item.owner._id;
    const likes = item.likes.length;

    const cardElement = createCard(
      item, 
      { 
        deleteCard, 
        handleLike, 
        handleImageClick,
        getResponseData,
        setLike
      },
      userId,
      baseUrl
    );

    container.append(cardElement);

    const cardLikes = cardElement.querySelector('.likes-quantity');
    if (cardLikes) {
      cardLikes.textContent = likes;
    }

    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (itemId !== userId && deleteButton) {
      deleteButton.remove();
    }

    loadedCardIds.add(item._id);
  });
}

function addSingleCard(card, userId, container) {
  if (loadedCardIds.has(card._id)) {
    return; 
  }

  const cardElement = createCard(card, { deleteCard, handleLike, handleImageClick }, userId);

  container.prepend(cardElement);

  const cardLikes = cardElement.querySelector('.likes-quantity');
  if (cardLikes) {
    cardLikes.textContent = card.likes.length;
  }

  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (card.owner._id !== userId && deleteButton) {
    deleteButton.remove();
  }

  loadedCardIds.add(card._id);
}


Promise.all([fetchUserData(), fetchCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;

    addInitialCards(cards, userId, cardContainer);
  })
  .catch(err => {
    console.error(err);
  });

const editProfileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const deleteCardPopup = document.querySelector('.popup_type_delete-card')
const formDelete = document.forms['delete-card']
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];
const editAvatarPopup = document.forms['new-avatar']
const editName = editForm.elements.name;
const editDescription = editForm.elements.description;
const closeBtns = document.querySelectorAll('.popup__close');
const profileAvatar = document.querySelector('.profile__image')
const addNewAvatarPopup = document.querySelector('.popup_type_new-avatar')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const newAvatar = editAvatarPopup.querySelector('.popup__input_type_url')
const ImageInfo = imagePopup.querySelector('.popup__image');
const imageName = imagePopup.querySelector('.popup__caption');

editProfileBtn.addEventListener('click', () => {
  openPopup(editPopup);
  editName.value = profileTitle.textContent;
  editDescription.value = profileDescription.textContent;
});

addCardBtn.addEventListener('click', () => {
  openPopup(addPopup);
});

profileAvatar.addEventListener('click', () => {
  openPopup(addNewAvatarPopup)
})

function toggleLoadingPage(form, bull) {
  if(!bull) {
    form.querySelector('.popup__button').textContent = 'Сохранение...'
  }
  else{
    form.querySelector('.popup__button').textContent = 'Сохранить'
  }
}

editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  toggleLoadingPage(editForm, false)

  editProfileData(editName.value, editDescription.value, baseUrl, { getResponseData })
    .then((profile) => {
      profileTitle.textContent = profile.name
      profileDescription.textContent = profile.about
    })
    .then(() => {
      closePopup(editPopup)
    })
    .catch((err) =>{
      console.error(err)
    })
    .finally(() => {
      toggleLoadingPage(editForm, true)
    })
    
});

closeBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

function postCard() {
  toggleLoadingPage(addForm, false);

  const placeName = addForm.elements['place-name'].value.trim();
  const placeLink = addForm.elements['link'].value.trim();

  
  requestPostCard(placeName, placeLink, baseUrl, { getResponseData })
    .then((card) => {
      const userId = card.owner._id;
      addSingleCard(card, userId, cardContainer);
    })
    .then(() => {
      closePopup(addPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addForm.reset();
      toggleLoadingPage(addForm, true);
    });
}

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  postCard();
});


editAvatarPopup.addEventListener('submit', (evt) => {
  evt.preventDefault()

  toggleLoadingPage(editAvatarPopup, false)

  editProfileAvatar(newAvatar, baseUrl, { getResponseData })
    .then((profile) => {
      profileAvatar.style.backgroundImage = `url(${profile.avatar})`
    })
    .then(() => {
      closePopup(addNewAvatarPopup)
    })
    .catch((err) =>{
      console.error(err)
    })
    .finally(() => {
      toggleLoadingPage(editAvatarPopup, true)
    })
})


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const pattern = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;

import { clearPopupValidation, enableValidation, updateButtonState } from './components/validation.js';

editProfileBtn.addEventListener('click', () => {
  clearPopupValidation(editPopup, validationConfig);
  updateButtonState(editForm.querySelector(validationConfig.submitButtonSelector), false, validationConfig);
});

addCardBtn.addEventListener('click', () => {
  clearPopupValidation(addPopup, validationConfig);
  updateButtonState(addForm.querySelector(validationConfig.submitButtonSelector), false, validationConfig);
});

enableValidation(validationConfig, pattern)