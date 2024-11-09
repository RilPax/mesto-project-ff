export function createCard(item, { deleteCard, handleLike }) {
    const card = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
    card.querySelector('.card__title').textContent = item.name;
    const cardImage = card.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
  
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
      deleteCard(card);
    });
  
    const likeBtn = card.querySelector('.card__like-button');
    likeBtn.addEventListener('click', (evt) => {
      handleLike(evt);
    });
  
    return card;
  }
  
  export function cardAdd(initialCards, cardContainer) {
    initialCards.forEach((item) => {
      const cardElement = createCard(item, {
        deleteCard: (card) => {
          card.remove();
        },
        handleLike: (evt) => {
          evt.target.classList.toggle('card__like-button_is-active');
        }
      });
      cardContainer.append(cardElement);
    });
  }
  
  export function addNewCard(item, cardContainer) {
    const cardElement = createCard(item, {
      deleteCard: (card) => {
        card.remove();
      },
      handleLike: (evt) => {
        evt.target.classList.toggle('card__like-button_is-active');
      }
    });
    cardContainer.prepend(cardElement);
  }
  