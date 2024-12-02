import { fetchCards } from './components/cards.js';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { deleteApi, setLike, profileInfoRequest, editProfileData, editProfileAvatar, requestPostCard, loginToProfile } from './components/api.js'

import './index.css';

const cardContainer = document.querySelector('.places__list');

function deleteCard(card, cardId) {

  openPopup(deleteCardPopup);

  const deleteForm = deleteCardPopup.querySelector('.popup__form');

  deleteForm.addEventListener('submit', (evt) => {
    evt.preventDefault(); 

    deleteApi(cardId)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        card.remove();
        closePopup(deleteCardPopup);
      })
      .catch((err) => {
        console.error("Ошибка при удалении карточки:", err);
      });
  }) 
}


function handleLike(evt, item) {
  const likeButton = evt.target; 
  const cardLikes = likeButton.closest('.card').querySelector('.likes-quantity'); 

  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  const method = isLiked ? 'DELETE' : 'PUT';

  setLike(item ,method)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json(); 
    })
    .then((updatedCard) => {

      likeButton.classList.toggle('card__like-button_is-active', !isLiked);

      if (cardLikes) {
        cardLikes.textContent = updatedCard.likes.length; 
      }
    })
    .catch((err) => {
      console.error("Ошибка при обновлении лайка:", err);
    });
}


function handleImageClick(imageSrc, title) {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    
    popupImage.src = imageSrc;
    popupImage.alt = title;
    popupCaption.textContent = title;
    openPopup(imagePopup);
}

async function fetchUserData() {
  return profileInfoRequest()
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const loadedCardIds = new Set();

function addInitialCards(cards, userId, container) {
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
        handleImageClick
      },
      userId 
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

  editProfileData(editName.value, editDescription.value)
    .then((res) => {
      return res.json()
    })
    .then((profile) => {
      profileTitle.textContent = profile.name
      profileDescription.textContent = profile.about
    })
    .finally(() => {
      toggleLoadingPage(editForm, true)
      closePopup(editPopup);
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

  
  requestPostCard(placeName, placeLink)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((card) => {
      const userId = card.owner._id;
      addSingleCard(card, userId, cardContainer);
    })
    .then(() => {
      toggleLoadingPage(addForm, true);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addForm.reset();
      closePopup(addPopup);
    });
}

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  postCard();
});


editAvatarPopup.addEventListener('submit', (evt) => {
  evt.preventDefault()

  toggleLoadingPage(editAvatarPopup, false)

  editProfileAvatar(newAvatar)
    .then((res) => {
      return res.json()
    })
    .then((profile) => {
      profileAvatar.style.backgroundImage = `url(${profile.avatar})`
    })
    .finally(() => {
      toggleLoadingPage(editAvatarPopup, true)
      closePopup(addNewAvatarPopup)
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

import { clearValidation,enableValidation } from './components/validation.js';

clearValidation(validationConfig, editPopup, addPopup, editProfileBtn, addCardBtn)

enableValidation(validationConfig, pattern)



function uploadProfileFromServer() {
  loginToProfile()
    .then((res) => {
      return res.json()
    })
    .then((object) => {
      profileTitle.textContent = object.name
      profileDescription.textContent = object.about
      profileAvatar.style.backgroundImage = `url('${object.avatar}')`
    })
}

uploadProfileFromServer()